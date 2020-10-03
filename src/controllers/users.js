const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const { secret } = require("../config");
const bcrypt = require("bcrypt");
class UsersCtl {
  // 查询用户列表
  async find(ctx) {
    const { per_page = 10 } = ctx.query;

    const page = Math.max(ctx.query.page * 1, 1) - 1;

    const perPage = Math.max(per_page * 1, 1);
    ctx.body = await User.find()
      .limit(perPage)
      .skip(perPage * page);
  }
  // 查询用户详情
  async findById(ctx) {
    const { fields = "" } = ctx.query;
    // 字段过滤,需要展示的字段用 ; 分隔
    const selectFields = fields
      .split(";")
      .filter((field) => field)
      .map((field) => " +" + field)
      .join("");

    const user = await User.findById(ctx.params.id)
      .select(selectFields)
      .populate(
        "locations business employments.company employments.job educations.school educations.major following followingTopics likingAnswers dislikingAnswers collectingAnswers"
      );
    //  locations business employments.company employments.job educations.school educations.major
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }
  // 创建用户
  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const { name } = ctx.request.body;
    const repeatedUser = await User.findOne({ name });
    if (repeatedUser) {
      ctx.throw(409, "用户名已经占用");
    }
    const user = await new User(ctx.request.body).save();

    ctx.body = user;
  }
  // 修改用户资料
  async update(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: false },
      password: { type: "string", required: false },
      avatar_url: { type: "string", required: false },
      gender: { type: "string", required: false },
      headline: { type: "string", required: false },
      locations: { type: "array", itemType: "string", required: false },
      business: { type: "string", required: false },
      employments: { type: "array", itemType: "object", required: false },
      educations: { type: "array", itemType: "object", required: false },
      following: { type: "array", itemType: "object", required: false },
      followingTopics: { type: "array", itemType: "object", required: false },
      likingAnswers: { type: "array", itemType: "object", required: false },
      dislikingAnswers: { type: "array", itemType: "object", required: false },
      collectingAnswers: { type: "array", itemType: "object", required: false },
    });

    if (ctx.request.body.name) {
      const repeatedUser = await User.findOne({ name: ctx.request.body.name });
      if (
        repeatedUser &&
        repeatedUser._id.toString() !== ctx.state.user._id.toString()
      ) {
        ctx.throw(409, "用户名已经占用");
      }
    }
    // 默认返回旧数据，加上 new 参数后返回修改后数据
    const user = await User.findByIdAndUpdate(
      ctx.state.user._id,
      ctx.request.body,
      {
        new: true,
      }
    );

    ctx.body = user;
  }
  // 删除用户
  async del(ctx) {
    await User.findByIdAndRemove(ctx.state.user._id);
    ctx.status = 204;
  }

  // 登录
  async login(ctx) {
    const { name, password } = ctx.request.body;
    const user = await User.findOne({ name }).select("+password");
    if (!user) {
      ctx.throw(422, "用户不存在");
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      ctx.throw(422, "用户密码错误");
    }

    const token = jwt.sign({ _id: user._id, name }, secret, {
      expiresIn: "1d",
    });
    ctx.body = { token };
  }

  // 获取已关注用户列表
  async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id)
      .select("+following")
      .populate("following");
    if (!user) {
      ctx.throw(404);
    }
    ctx.body = user.following;
  }

  // 获取粉丝列表
  async listFollowers(ctx) {
    // 查找某个 id 的粉丝，就是查找 following 中包含该 id 的用户
    const users = await User.find({ following: ctx.params.id });
    ctx.body = users;
  }

  // 获取关注话题列表
  async listFollowingTopics(ctx) {
    const user = await User.findById(ctx.params.id)
      .select("+followingTopics")
      .populate("followingTopics");
    if (!user) {
      ctx.throw(404);
    }
    ctx.body = user.followingTopics;
  }

  // 关注用户
  async follow(ctx) {
    const me = await User.findById(ctx.state.user._id).select("+following");
    if (!me.following.map((id) => id.toString()).includes(ctx.params.id)) {
      // console.log(`${ctx.state.user._id}关注了${ctx.params.id}`);
      me.following.push(ctx.params.id);
      me.save();
    }

    ctx.status = 204;
  }
  // 取消关注用户
  async unfollow(ctx) {
    const me = await User.findById(ctx.state.user._id).select("+following");

    const index = me.following
      .map((id) => id.toString())
      .indexOf(ctx.params.id);

    if (index > -1) {
      me.following.splice(index, 1);
      me.save();
    }
    ctx.status = 204;
  }

  // 关注话题
  async followTopic(ctx) {
    const me = await User.findById(ctx.state.user._id).select(
      "+followingTopics"
    );

    if (
      !me.followingTopics.map((id) => id.toString()).includes(ctx.params.id)
    ) {
      // console.log(`${ctx.state.user._id}关注了${ctx.params.id}`);
      me.followingTopics.push(ctx.params.id);
      me.save();
    }

    ctx.status = 204;
  }
  // 取消关注话题
  async unfollowTopic(ctx) {
    const me = await User.findById(ctx.state.user._id).select(
      "+followingTopics"
    );

    const index = me.followingTopics
      .map((id) => id.toString())
      .indexOf(ctx.params.id);

    if (index > -1) {
      me.followingTopics.splice(index, 1);
      me.save();
    }
    ctx.status = 204;
  }
  // 关注问题
  async followQuestion(ctx) {
    const me = await User.findById(ctx.state.user._id).select(
      "+followingQuestions"
    );

    if (
      !me.followingQuestions.map((id) => id.toString()).includes(ctx.params.id)
    ) {
      // console.log(`${ctx.state.user._id}关注了${ctx.params.id}`);
      me.followingQuestions.push(ctx.params.id);
      me.save();
    }

    ctx.status = 204;
  }
  // 取消关注问题
  async unfollowQuestion(ctx) {
    const me = await User.findById(ctx.state.user._id).select(
      "+followingQuestions"
    );

    const index = me.followingQuestions
      .map((id) => id.toString())
      .indexOf(ctx.params.id);

    if (index > -1) {
      me.followingQuestions.splice(index, 1);
      me.save();
    }
    ctx.status = 204;
  }

  // 用户问题列表
  async listQuestions(ctx) {
    const questions = await Question.find({ questioner: ctx.params.id });
    ctx.body = questions;
  }
  // 用户关注问题列表
  async listFollowingQuestions(ctx) {
    const user = await User.findById(ctx.params.id)
      .select("+followingQuestions")
      .populate("followingQuestions");
    ctx.body = user.followingQuestions;
  }
  // 用户点赞的回答列表
  async listLikingAnswers(ctx) {
    const user = await User.findById(ctx.params.id)
      .select("+likingAnswers")
      .populate("likingAnswers");
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user.likingAnswers;
  }

  // 点赞回答
  async likeAnswer(ctx, next) {
    const me = await User.findById(ctx.state.user._id).select("+likingAnswers");

    if (!me.likingAnswers.map((id) => id.toString()).includes(ctx.params.id)) {
      // console.log(`${ctx.state.user._id}关注了${ctx.params.id}`);
      me.likingAnswers.push(ctx.params.id);

      me.save();
      await Answer.findByIdAndUpdate(ctx.params.id, { $inc: { voteCount: 1 } });
    }

    ctx.status = 204;
    await next();
  }
  // 取消点赞回答
  async unlikeAnswer(ctx) {
    const me = await User.findById(ctx.state.user._id).select("+likingAnswers");

    const index = me.likingAnswers
      .map((id) => id.toString())
      .indexOf(ctx.params.id);

    if (index > -1) {
      me.likingAnswers.splice(index, 1);
      me.save();
    }
    await Answer.findByIdAndUpdate(ctx.params.id, { $inc: { voteCount: -1 } });

    ctx.status = 204;
  }
  // 用户点踩的回答列表
  async listDislikingAnswers(ctx) {
    const user = await User.findById(ctx.params.id)
      .select("+dislikingAnswers")
      .populate("dislikingAnswers");
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user.dislikingAnswers;
  }

  // 点踩回答
  async dislikeAnswer(ctx, next) {
    const me = await User.findById(ctx.state.user._id).select(
      "+dislikingAnswers"
    );

    if (
      !me.dislikingAnswers.map((id) => id.toString()).includes(ctx.params.id)
    ) {
      me.dislikingAnswers.push(ctx.params.id);
      me.save();
    }

    ctx.status = 204;
    await next();
  }
  // 取消点踩回答
  async undislikeAnswer(ctx) {
    const me = await User.findById(ctx.state.user._id).select(
      "+dislikingAnswers"
    );

    const index = me.dislikingAnswers
      .map((id) => id.toString())
      .indexOf(ctx.params.id);

    if (index > -1) {
      me.dislikingAnswers.splice(index, 1);
      me.save();
    }

    ctx.status = 204;
  }
  // 收藏答案列表
  async listCollectingAnswers(ctx) {
    const user = await User.findById(ctx.params.id)
      .select("+collectingAnswers")
      .populate("collectingAnswers");
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user.collectingAnswers;
  }

  // 收藏答案
  async collectAnswer(ctx) {
    const me = await User.findById(ctx.state.user._id).select(
      "+collectingAnswers"
    );

    if (
      !me.collectingAnswers.map((id) => id.toString()).includes(ctx.params.id)
    ) {
      me.collectingAnswers.push(ctx.params.id);
      me.save();
    }

    ctx.status = 204;
  }
  // 取消收藏
  async uncollectAnswer(ctx) {
    const me = await User.findById(ctx.state.user._id).select(
      "+collectingAnswers"
    );

    const index = me.collectingAnswers
      .map((id) => id.toString())
      .indexOf(ctx.params.id);

    if (index > -1) {
      me.collectingAnswers.splice(index, 1);
      me.save();
    }

    ctx.status = 204;
  }
}
module.exports = new UsersCtl();
