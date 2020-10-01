const Answer = require("../models/Answer");

class AnswersCtl {
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const q = new RegExp(ctx.query.q);
    ctx.body = await Answer.find({
      content: q,
      questionId: ctx.params.questionId,
    })
      .limit(perPage)
      .skip(perPage * page);
  }

  async findById(ctx) {
    const { fields = "" } = ctx.query;
    // 字段过滤,需要展示的字段用 ; 分隔
    const selectFields = fields
      .split(";")
      .filter((field) => field)
      .map((field) => " +" + field)
      .join("");

    const answer = await Answer.findById(ctx.params.id)
      .select(selectFields)
      .populate("answerer");

    ctx.body = answer;
  }

  async create(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: true },
    });
    const answerer = ctx.state.user._id;
    const { questionId } = ctx.params;
    const answer = await new Answer({
      ...ctx.request.body,
      answerer,
      questionId,
    }).save();
    ctx.body = answer;
  }

  async update(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: false },
    });
    // 默认返回旧数据，加上 new 参数后返回修改后数据
    const answer = await ctx.state.answer.update(ctx.request.body, {
      new: true,
    });
    ctx.body = answer;
  }

  async del(ctx) {
    await Answer.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }
}
module.exports = new AnswersCtl();
