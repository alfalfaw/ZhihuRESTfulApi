const User = require("../models/User");
const Topic = require("../models/Topic");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Comment = require("../models/Comment");
module.exports = {
  // 检查权限，只允许本人修改本人信息
  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, "没有权限");
    }
    await next();
  },
  // 检查用户是否存在
  async checkUserExist(ctx, next) {
    const user = await User.findById(ctx.params.id);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    await next();
  },
  // 检查话题是否存在
  async checkTopicExist(ctx, next) {
    const topic = await Topic.findById(ctx.params.id);
    if (!topic) {
      ctx.throw(404, "话题不存在");
    }
    await next();
  },
  // 检查问题是否存在
  async checkQuestionExist(ctx, next) {
    const question = await Question.findById(ctx.params.id).select(
      "+questioner"
    );
    if (!question) {
      ctx.throw(404, "问题不存在");
    }
    ctx.state.question = question;
    await next();
  },

  async checkQuestioner(ctx, next) {
    const { question } = ctx.state;
    if (question.questioner.toString() !== ctx.state.user._id) {
      ctx.throw(403, "没有权限");
    }
    await next();
  },
  // 检查答案是否存在
  async checkAnswerExist(ctx, next) {
    const answer = await Answer.findById(ctx.params.id).select("+answer");
    if (!answer) {
      ctx.throw(404, "答案不存在");
    }
    // 只有在删改查才检查此逻辑，赞和踩不检查
    if (ctx.params.questionId && answer.questionId !== ctx.params.questionId) {
      ctx.throw(404, "该问题下没有此答案");
    }
    ctx.state.answer = answer;
    await next();
  },
  // 检查评论否存在
  async checkCommentExist(ctx, next) {
    const comment = await Comment.findById(ctx.params.id).select(
      "+commentator"
    );
    if (!comment) {
      ctx.throw(404, "评论不存在");
    }
    // 只有在删改查才检查此逻辑，赞和踩不检查
    if (ctx.params.questionId && comment.questionId !== ctx.params.questionId) {
      ctx.throw(404, "该问题下没有此评论");
    }
    if (ctx.params.answerId && comment.answerId !== ctx.params.answerId) {
      ctx.throw(404, "该答案下没有此评论");
    }
    ctx.state.comment = comment;
  },
  // 检查评论人
  async checkCommentator(ctx, next) {
    const { comment } = ctx.state;
    if (comment.commentator.toString() !== ctx.state.user._id) {
      ctx.throw(403, "没有权限");
    }
    await next();
  },
  // 检查回答者
  async checkAnswerer(ctx, next) {
    const { answer } = ctx.state;
    if (answer.answerer.toString() !== ctx.state.user._id) {
      ctx.throw(403, "没有权限");
    }
    await next();
  },
};
