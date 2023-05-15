# quiz-app
Routes - 

1. GET /quiz/:category -> creates quiz selecting questions from database related to the `category` recieved in params
2. POST /quiz -> recieves `{questions, answers}` object in request body and responds with correct answers of the quiz


1. POST /category/ -> recieves`category` name in request body and creates new category
2. GET /category/ -> responds with name of all categories


1. POST /question  -> recieves `{ name, choice, mcq, answer, solution, explanation, category, lod }` object in request body and is used to create a new question 
2. DELETE /question  -> recieves `id` in request body and used to delete corresponding question 
3. GET /question  -> responds with all questions
