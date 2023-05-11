const questionModel = require("../models/question.model");
const categoryModel = require("../models/category.model");

const createQuestion = async (req, res) => {
  try {
    let { name, choice, mcq, answer, solution, explanation, category, lod } =
      req.body;

    name = name.trim().toUpperCase();
    category = category.trim().toUpperCase();
    solution = solution.trim();
    explanation = explanation.trim();
    let Question = await questionModel.findOne({ name: name });
    let Category = await categoryModel.findOne({ name: category });
    // console.log(
    //   Question,
    //   Category,
    //   name,
    //   choice,
    //   mcq,
    //   answer,
    //   solution,
    //   explanation,
    //   Category._id,
    //   lod
    // );
    if (Question) {
      throw new Error("question duplicate");
    } else if (!Category) {
      throw new Error("category does not exist");
    } else if (mcq && (choice.length != 4 || (answer < 0 && answer > 3))) {
      throw new Error("choice count is not 4");
    } else if (lod < 1 || lod > 3) {
      throw new Error("LOD is not applicable");
    } else if (!mcq && solution.length == 0) {
      throw new Error("Solution not provided");
    }
    //console.log(Category.id, Category._id, typeof Category._id);
    Question = await questionModel.create({
      name,
      mcq,
      choice,
      answer,
      solution,
      explanation,
      category: [Category._id],
      lod,
    });

    if (!Question) {
      throw new Error("question could not be added");
    }

    return res.json({ success: true, doc: Question });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err: err.name });
  }
};

const getQuestion = async (req, res) => {
  try {
    const questions = await questionModel.find({});
    if (!questions) {
      throw new Error("questions not found");
    }
    return res.json({ success: true, doc: questions });
  } catch (err) {
    return res.json({ success: false, err: err.name });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.body;
    await questionModel.findByIdAndDelete(id);
    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, err: err.name });
  }
};

module.exports = { createQuestion, getQuestion, deleteQuestion };
