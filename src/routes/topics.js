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

router.get("/", find);
router.get("/:id", checkTopicExist, findById);
router.post("/", auth, create);
// patch 可以更新部分属性
router.patch("/:id", auth, checkTopicExist, update);
router.delete("/:id", auth, checkTopicExist, del);
router.get("/:id/followers", checkTopicExist, listFollowers);
router.get("/:id/questions", checkTopicExist, listQuestions);

module.exports = router;
