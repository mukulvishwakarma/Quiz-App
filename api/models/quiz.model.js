'use strict'
const mongoose = require('mongoose')
const { Schema } = mongoose
const { v4: uuidv4 } = require('uuid')

const QuestionSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    text: { type: String, required: true },
    options: [{ type: String, required: true }],
    correct_option: { type: Number, required: true },
  },
  { versionKey: false }
)

const QuizSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    title: { type: String, required: true },
    questions: [ QuestionSchema ],
  },
  { versionKey: false }
)

const QuizModel = mongoose.model('Quiz', QuizSchema);
module.exports = { QuizModel }
