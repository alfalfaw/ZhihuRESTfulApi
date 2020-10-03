const Router = require("koa-router");
const router = new Router({ prefix: "/users" });
// const jwt = require("jsonwebtoken");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const {
  find,
  findById,
  create,
  update,
  del,
  login,
  listFollowing,
  follow,
  unfollow,
  listFollowers,
  followTopic,
  unfollowTopic,
  followQuestion,
  unfollowQuestion,
  listFollowingTopics,
  listFollowingQuestions,
  listQuestions,
  listLikingAnswers,
  likeAnswer,
  unlikeAnswer,
  listDislikingAnswers,
  dislikeAnswer,
  undislikeAnswer,

  listCollectingAnswers,
  collectAnswer,
  uncollectAnswer,
} = require("../controllers/users");
const {
  checkUserExist,
  checkTopicExist,
  checkAnswerExist,
  checkQuestionExist,
} = require("../middlewares/check");

const auth = jwt({ secret });
// 获取用户列表
router.get("/", find);
// 获取用户详情
router.get("/:id", findById);
// 创建用户
router.post("/", create);
// 更新用户 patch 可以更新部分
router.patch("/", auth, update);
// 删除用户
router.delete("/", auth, del);
// 登录
router.post("/login", login);
// 获取已关注用户列表
router.get("/:id/following", listFollowing);
// 获取用户粉丝列表
router.get("/:id/followers", listFollowers);

// 关注用户
router.put("/following/:id", auth, checkUserExist, follow);
// 取消关注用户
router.delete("/following/:id", auth, checkUserExist, unfollow);

// 关注话题列表
router.get("/:id/followingTopics", listFollowingTopics);
// 用户关注话题
router.put("/followingTopic/:id", auth, checkTopicExist, followTopic);
// 用户取消关注话题
router.delete("/followingTopic/:id", auth, checkTopicExist, unfollowTopic);

// 获取用户问题列表
router.get("/:id/questions", listQuestions);
// 获取用户关注问题列表
router.get("/:id/followingQuestions", listFollowingQuestions);
// 用户关注问题
router.put("/followingQuestion/:id", auth, checkQuestionExist, followQuestion);
// 用户取消关注问题
router.delete(
  "/followingQuestion/:id",
  auth,
  checkQuestionExist,
  unfollowQuestion
);

// 用户喜欢的答案列表
router.get("/:id/likingAnswers", listLikingAnswers);
// 用户喜欢答案
router.put(
  "/likingAnswers/:id",
  auth,
  checkAnswerExist,
  likeAnswer,
  undislikeAnswer
);
// 用户取消喜欢答案
router.delete("/likingAnswers/:id", auth, checkAnswerExist, unlikeAnswer);
// 用户不喜欢的答案列表
router.get("/:id/dislikingAnswers", listDislikingAnswers);
// 用户不喜欢答案
router.put(
  "/dislikingAnswers/:id",
  auth,
  checkAnswerExist,
  dislikeAnswer,
  unlikeAnswer
);
// 用户取消不喜欢回答
router.delete("/dislikingAnswers/:id", auth, checkAnswerExist, undislikeAnswer);
// 用户收藏答案列表
router.get("/:id/collectingAnswers", listCollectingAnswers);
// 用户收藏答案
router.put("/collectingAnswers/:id", auth, checkAnswerExist, collectAnswer);
// 用户取消收藏答案
router.delete(
  "/collectingAnswers/:id",
  auth,
  checkAnswerExist,
  uncollectAnswer
);
module.exports = router;
