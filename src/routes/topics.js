const Router = require("koa-router");
const router = new Router({ prefix: "/topics" });
// const jwt = require("jsonwebtoken");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const {
  find,
  findById,
  create,
  update,
  del,
  listFollowers,
  listQuestions,
} = require("../controllers/topics");
const { checkTopicExist } = require("../middlewares/check");

const auth = jwt({ secret });
// 获取话题列表
router.get("/", find);
// 获取话题详情
router.get("/:id", checkTopicExist, findById);
// 创建话题
router.post("/", auth, create);
// 修改话题
router.patch("/:id", auth, checkTopicExist, update);
// 删除话题
router.delete("/:id", auth, checkTopicExist, del);
// 获取话题粉丝列表
router.get("/:id/followers", checkTopicExist, listFollowers);
// 获取话题的问题列表
router.get("/:id/questions", checkTopicExist, listQuestions);

module.exports = router;
