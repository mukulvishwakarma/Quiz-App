const express = require('express')
const { asyncMiddleware } = require('../middlewares/async.middleware')
const { QuizController } = require('../controllers/quiz.controller')
const quizRouter = express.Router()

quizRouter.post('/', asyncMiddleware(QuizController.createQuiz))
quizRouter.get('/:id', asyncMiddleware(QuizController.getQuiz))
quizRouter.post('/:id/answers', asyncMiddleware(QuizController.submitAnswer))
quizRouter.post('/:id/results', asyncMiddleware(QuizController.getResults))

module.exports = { quizRouter }
