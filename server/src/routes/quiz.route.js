const router = require("express").Router();
const quizController = require("../controllers/quiz.controller.js");
router.get("/:category", quizController.createQuiz);
router.post("/", quizController.getResults);
module.exports = router;
