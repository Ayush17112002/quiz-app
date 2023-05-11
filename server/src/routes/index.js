const router = require("express").Router();
router.use("/question", require("./question.route"));
router.use("/quiz", require("./quiz.route"));
router.use("/category", require("./category.route"));
module.exports = router;
