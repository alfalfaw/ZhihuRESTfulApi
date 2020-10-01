const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const questionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questioner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    topics: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Topic",
        },
      ],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Question", questionSchema);
