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
} = require("../controllers/questions");
const { checkQuestioner, checkQuestionExist } = require("../middlewares/check");

const auth = jwt({ secret });

router.get("/", find);
router.get("/:id", checkQuestionExist, findById);
router.post("/", auth, create);

router.patch("/:id", auth, checkQuestionExist, checkQuestioner, update);
router.delete("/:id", auth, checkQuestionExist, checkQuestioner, del);

module.exports = router;
