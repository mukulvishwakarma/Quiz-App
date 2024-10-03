const express = require('express')
const { quizRouter } = require('./quiz.route')

const Router = express.Router()

Router.use('/quizzes', quizRouter)

module.exports = { Router }
