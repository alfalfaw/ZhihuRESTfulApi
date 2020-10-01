const Router = require("koa-router");
const router = new Router();

const { upload } = require("../controllers/common");

router.post("/upload", upload);

module.exports = router;
