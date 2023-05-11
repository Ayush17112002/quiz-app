const categoryModel = require("../models/category.model");

const createCategory = async (req, res) => {
  try {
    let { category } = req.body;
    category = category.trim().toUpperCase();
    const doc = await categoryModel.create({ name: category });
    if (!doc) {
      throw new Error("category could not be added");
    }
    return res.json({ success: true, doc: doc });
  } catch (err) {
    return res.status(400).json({ success: false, err: err.name });
  }
};

module.exports = { createCategory };
