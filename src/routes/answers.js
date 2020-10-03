const Router = require("koa-router");
const router = new Router({ prefix: "/questions/:questionId/answers" });
// const jwt = require("jsonwebtoken");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const {
  find,
  findById,
  create,
  update,
  del,
} = require("../controllers/answers");
const { checkAnswerer, checkAnswerExist } = require("../middlewares/check");

const auth = jwt({ secret });
// 获取回答列表
router.get("/", find);
// 创建回答
router.post("/", auth, create);
// 获取回答详情
router.get("/:id", checkAnswerExist, findById);
// 修改回答
router.patch("/:id", auth, checkAnswerExist, checkAnswerer, update);
// 删除回答
router.delete("/:id", auth, checkAnswerExist, checkAnswerer, del);

module.exports = router;
