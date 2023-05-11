const questionModel = require("../models/question.model");
const categoryModel = require("../models/category.model");

const createQuiz = async (req, res) => {
  try {
    let { category } = req.body;
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
        $sample: { size: 3 },
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
        $sample: { size: 2 },
      },
    ]);
    //console.log(category, hard, easy, medium);
    return res.json({
      success: true,
      quiz: { hard: hard, medium: medium, easy: easy },
    });
  } catch (err) {
    res.json({ success: false });
  }
};

module.exports = { createQuiz };
