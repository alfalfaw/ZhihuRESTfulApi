const Question = require("../models/Question");
const Topic = require("../models/Topic");
const User = require("../models/User");
class QuestionsCtl {
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const q = new RegExp(ctx.query.q);
    ctx.body = await Question.find({ $or: [{ title: q }, { description: q }] })
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

    const question = await Question.findById(ctx.params.id)
      .select(selectFields)
      .populate("questioner topics");

    ctx.body = question;
  }

  async create(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: true },
      description: { type: "string", required: false },
    });

    const question = await new Question({
      ...ctx.request.body,
      questioner: ctx.state.user._id,
    }).save();
    ctx.body = question;
  }

  async update(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: false },
      description: { type: "string", required: false },
    });
    // 默认返回旧数据，加上 new 参数后返回修改后数据
    const question = await ctx.state.question.updateOne(ctx.request.body, {
      new: true,
    });
    ctx.body = question;
  }

  async del(ctx) {
    await Question.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }

  // 获取问题关注列表
  async listFollowers(ctx) {
    const users = await User.find({ followingQuestions: ctx.params.id });
    ctx.body = users;
  }
  // 问题的话题列表
  async listTopics(ctx) {
    const question = await Question.findById(ctx.params.id)
      .select("+topics")
      .populate("topics");
    ctx.body = question.topics;
  }
}
module.exports = new QuestionsCtl();
