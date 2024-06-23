const questionModel = require("../models/question.model");
const categoryModel = require("../models/category.model");

const createQuiz = async (req, res) => {
  try {
    console.log(req.params);
    let { category } = req.params;
    console.log(category, typeof category);
    category = category.trim().toUpperCase();
    let hard, easy, medium;
    hard = await questionModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "ctg",
        },
      },
      {
        $match: { $and: [{ "ctg.name": category }, { lod: 3 }] },
      },
      {
        $sample: { size: 5 },
      },
      {
        $project: {
          category: 0,
          __v: 0,
          answer: 0,
          ctg: 0,
          solution: 0,
        },
      },
    ]);
    //console.log(hard);
    medium = await questionModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "ctg",
        },
      },
      {
        $match: { $and: [{ "ctg.name": category }, { lod: 2 }] },
      },
      {
        $sample: { size: 5 },
      },
      {
        $project: {
          category: 0,
          __v: 0,
          answer: 0,
          ctg: 0,
          solution: 0,
        },
      },
    ]);
    //console.log(medium);
    easy = await questionModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "ctg",
        },
      },
      {
        $match: { $and: [{ "ctg.name": category }, { lod: 1 }] },
      },
      {
        $sample: { size: 5 },
      },
      {
        $project: {
          category: 0,
          __v: 0,
          answer: 0,
          ctg: 0,
          solution: 0,
        },
      },
    ]);
    const tmp = [];
    for (const obj of easy) {
      tmp.push(obj);
    }
    for (const obj of medium) {
      tmp.push(obj);
    }
    for (const obj of hard) {
      tmp.push(obj);
    }
    if (tmp.length === 0) {
      throw new Error("questions not found");
    }
    return res.json({
      success: true,
      quiz: tmp,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

const getResults = async (req, res) => {
  try {
    const { answers, questions } = req.body;
    const result = new Array(questions.length);
    let correctCount = 0;
    for (let i = 0; i < questions.length; i++) {
      const obj = questions[i];
      const tmp = await questionModel.findById(obj._id);
      if (tmp.answer === answers[i]) {
        result[i] = true;
        correctCount++;
      } else {
        result[i] = false;
      }
    }
    return res.json({ success: true, docs: { result, correctCount } });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};
module.exports = { createQuiz, getResults };
