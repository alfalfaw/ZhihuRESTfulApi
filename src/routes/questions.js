const Router = require("koa-router");
const router = new Router({ prefix: "/questions" });
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
  listTopics,
} = require("../controllers/questions");
const { checkQuestioner, checkQuestionExist } = require("../middlewares/check");

const auth = jwt({ secret });
// 获取问题列表
router.get("/", find);
// 获取问题详情
router.get("/:id", checkQuestionExist, findById);
// 创建问题
router.post("/", auth, create);
// 修改问题
router.patch("/:id", auth, checkQuestionExist, checkQuestioner, update);
// 删除问题
router.delete("/:id", auth, checkQuestionExist, checkQuestioner, del);
// 获取问题的关注列表
router.get("/:id/followers", checkQuestionExist, listFollowers);
// 获取问题的话题列表
router.get("/:id/topics", checkQuestionExist, listTopics);

module.exports = router;
