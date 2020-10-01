const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    commentator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 为了防止问题删除后这个字段为空，所以没有添加引用关系
    questionId: { type: String, required: true },
    // 赞同数
    answerId: { type: String, required: true },

    rootCommentId: { type: String },
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Comment", commentSchema);
