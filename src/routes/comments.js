const Router = require("koa-router");
const router = new Router({
  prefix: "/questions/:questionId/answers/:answerId/comments",
});
// const jwt = require("jsonwebtoken");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const {
  find,
  findById,
  create,
  update,
  del,
} = require("../controllers/comments");
const { checkCommentExist, checkCommentator } = require("../middlewares/check");

const auth = jwt({ secret });
// 获取评论列表
router.get("/", find);
// 发表评论
router.post("/", auth, create);
// 获取评论详情
router.get("/:id", checkCommentExist, findById);
// 修改评论
router.patch("/:id", auth, checkCommentExist, checkCommentator, update);
// 删除评论
router.delete("/:id", auth, checkCommentExist, checkCommentator, del);

module.exports = router;
