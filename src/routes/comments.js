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
router.get("/", find);
router.post("/", auth, create);
router.get("/:id", checkCommentExist, findById);
router.patch("/:id", auth, checkCommentExist, checkCommentator, update);
router.delete("/:id", auth, checkCommentExist, checkCommentator, del);

module.exports = router;
