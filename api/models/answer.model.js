'use strict'
const mongoose = require('mongoose')
const { Schema } = mongoose
const { v4: uuidv4 } = require('uuid')

const AnswerSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    question_id: { type: String, required: true },
    user_id: { type: String, required: true },
    selected_option: { type: Number, required: true },
    is_correct: { type: Boolean, required: true },
  },
  { versionKey: false }
)

const AnswerModel = mongoose.model('Answer', AnswerSchema);
module.exports = { AnswerModel }
