const Koa = require("koa");
// 解析 body 数据
const KoaBody = require("koa-body");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const mongoose = require("mongoose");
const app = new Koa();
const routing = require("./routes");
const { connectionStr } = require("./config");
const path = require("path");
const serve = require("koa-static");

// 静态资源目录
app.use(serve(path.join(__dirname, "public")));

// 在生产环境不返回错误堆栈信息
app.use(
  error({
    postFormat: (error, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
  })
);
// 解析 body
app.use(
  KoaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "public/uploads"),
      keepExtensions: true,
    },
  })
);
// 参数验证
app.use(parameter(app));

// 注册 routes 文件夹所有路由
routing(app);

mongoose.connect(
  connectionStr,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  () => console.log("connect")
);

mongoose.connection.on("error", console.error);
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
