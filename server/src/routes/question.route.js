const router = require("express").Router();
const questionController = require("../controllers/question.controller");
router.get("/", questionController.getQuestion);
router.post("/", questionController.createQuestion);
router.delete("/", questionController.deleteQuestion);
module.exports = router;
