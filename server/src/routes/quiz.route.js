const router = require("express").Router();
const quizController = require("../controllers/quiz.controller.js");
router.get("/", quizController.createQuiz);
module.exports = router;
