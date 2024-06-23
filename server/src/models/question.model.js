const mongoose = require("mongoose");
const questionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  choice: [{ type: String }],
  //in case of mcq
  mcq: {
    type: Boolean,
    default: true,
  },
  answer: {
    type: Number,
    min: 0,
    max: 3,
  },
  //in case of fill in the blank type question
  solution: {
    type: String,
    default: "",
  },
  explanation: {
    type: String,
    default: "",
  },
  category: [
    {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
  ],
  //level of difficulty
  lod: {
    type: Number,
    min: 1,
    max: 3,
    required: true,
  },
});

const questionModel = mongoose.model("question", questionSchema);
module.exports = questionModel;
