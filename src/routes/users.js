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
  listFollowingTopics,
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
  checkOwner,
  checkUserExist,
  checkTopicExist,
  checkAnswerExist,
} = require("../middlewares/check");

const auth = jwt({ secret });

router.get("/", find);
router.get("/:id", findById);
router.post("/", create);
// patch 可以更新部分属性
router.patch("/:id", auth, checkOwner, update);
router.delete("/:id", auth, checkOwner, del);
router.post("/login", login);
router.get("/:id/following", listFollowing);
router.get("/:id/followers", listFollowers);
// 关注话题列表
router.get("/:id/followingTopics", listFollowingTopics);
router.put("/following/:id", auth, checkUserExist, follow);
router.delete("/following/:id", auth, checkUserExist, unfollow);
router.put("/followingTopic/:id", auth, checkTopicExist, followTopic);
router.delete("/followingTopic/:id", auth, checkTopicExist, unfollowTopic);
router.get("/:id/questions", listQuestions);

router.get("/:id/likingAnswers", listLikingAnswers);
router.put(
  "/likingAnswers/:id",
  auth,
  checkAnswerExist,
  likeAnswer,
  undislikeAnswer
);
router.delete("/likingAnswers/:id", auth, checkAnswerExist, unlikeAnswer);

router.get("/:id/dislikingAnswers", listDislikingAnswers);
router.put(
  "/dislikingAnswers/:id",
  auth,
  checkAnswerExist,
  dislikeAnswer,
  unlikeAnswer
);
router.delete("/dislikingAnswers/:id", auth, checkAnswerExist, undislikeAnswer);

router.get("/:id/collectingAnswers", listCollectingAnswers);
router.put("/collectingAnswers/:id", auth, checkAnswerExist, collectAnswer);
router.delete(
  "/collectingAnswers/:id",
  auth,
  checkAnswerExist,
  uncollectAnswer
);
module.exports = router;
