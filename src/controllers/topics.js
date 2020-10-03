const Topic = require("../models/Topic");
const User = require("../models/User");
const Question = require("../models/Question");
class TopicsCtl {
  async find(ctx) {
    const { per_page = 10 } = ctx.query;

    const page = Math.max(ctx.query.page * 1, 1) - 1;

    const perPage = Math.max(per_page * 1, 1);
    ctx.body = await Topic.find({ name: new RegExp(ctx.query.q) })
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

    const topic = await Topic.findById(ctx.params.id).select(selectFields);
    if (!topic) {
      ctx.throw(404, "话题不存在");
    }
    ctx.body = topic;
  }

  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      avatar_url: { type: "string", required: false },
      introducation: { type: "string", required: false },
    });

    const topic = await new Topic(ctx.request.body).save();
    ctx.body = topic;
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: false },
      avatar_url: { type: "string", required: false },
      introducation: { type: "string", required: false },
    });
    // 默认返回旧数据，加上 new 参数后返回修改后数据
    const topic = await Topic.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
      {
        new: true,
      }
    );
    ctx.body = topic;
  }

  async del(ctx) {
    await Topic.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }

  // 获取话题关注列表
  async listFollowers(ctx) {
    console.log("okkkk");
    const users = await User.find({ followingTopics: ctx.params.id });
    ctx.body = users;
  }
  // 话题的问题列表
  async listQuestions(ctx) {
    const questions = await Question.find({
      topics: ctx.params.id,
    });
    ctx.body = questions;
  }
}
module.exports = new TopicsCtl();
