const mongoose = require("mongoose");
const ContentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    story: {
      type: String,
      maxlength: 2000,
      required: true,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", ContentSchema);
module.exports = Content;
