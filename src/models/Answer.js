const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const answerSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    answerer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topics: {
      type: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
      select: false,
    },
    // 为了防止问题删除后这个字段为空，所以没有添加引用关系
    questionId: { type: String, required: true },
    // 赞同数
    voteCount: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Answer", answerSchema);
