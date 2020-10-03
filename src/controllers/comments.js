const Comment = require("../models/Comment");

class CommentsCtl {
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const q = new RegExp(ctx.query.q);

    ctx.body = await Comment.find({
      content: q,
      questionId: ctx.params.questionId,
      answerId: ctx.params.answerId,
      parentId: null,
    })
      .limit(perPage)
      .skip(perPage * page)
      .populate({
        path: "replies commentator",
        populate: {
          path: "replies commentator replyTo",
          populate: {
            path: "replies commentator replyTo",
          },
        },
      });
  }

  async findById(ctx) {
    const { fields = "" } = ctx.query;
    // 字段过滤,需要展示的字段用 ; 分隔
    const selectFields = fields
      .split(";")
      .filter((field) => field)
      .map((field) => " +" + field)
      .join("");

    const comment = await Comment.findById(ctx.params.id)
      .select(selectFields)
      .populate("commentator");

    ctx.body = comment;
  }

  // 5f77ceaeaa32206ae22d2531
  // 5f71d3d498d4dc0de13200f5

  async create(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: true },
      parentId: { type: "string", required: false },
      replyTo: { type: "string", required: false },
    });
    const commentator = ctx.state.user._id;
    const { questionId, answerId } = ctx.params;
    const comment = await new Comment({
      ...ctx.request.body,
      commentator,
      answerId,
      questionId,
    }).save();
    ctx.body = comment;
  }

  async update(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: false },
    });
    const { content } = ctx.request.body;
    // 默认返回旧数据，加上 new 参数后返回修改后数据
    const comment = await ctx.state.comment.update(
      { content },
      {
        new: true,
      }
    );
    ctx.body = comment;
  }

  async del(ctx) {
    await Comment.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }
}
module.exports = new CommentsCtl();
