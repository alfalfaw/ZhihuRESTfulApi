const path = require("path");
class CommonCtl {
  // Content-Type 为 multipart/form-data 才会被解析

  upload(ctx) {
    const file = ctx.request.files.file;
    const basename = path.basename(file.path);

    ctx.body = {
      url: `${ctx.origin}/uploads/${basename}`,
    };
  }
}

module.exports = new CommonCtl();
