# quiz-app
Routes - 
1. /quiz
GET /quiz/:category -> creates quiz selecting questions from database related to the category recieved in params
POST /quiz -> recieves {questions, answers} object in request body and responds with correct answers of the quiz

2. /category
POST /category/ -> recieves category name in request body and creates new category
GET /category/ -> responds with name of all categories

3. /question
POST /question  -> recieves { name, choice, mcq, answer, solution, explanation, category, lod } object in request body and is used to create a new question 
DELETE /question  -> recieves `id` in request body and used to delete corresponding question 
GET /question  -> responds with all questions
