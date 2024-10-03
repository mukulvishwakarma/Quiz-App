'use strict'
const mongoose = require('mongoose')
const { Schema } = mongoose
const { v4: uuidv4 } = require('uuid')

const ResultSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    quiz_id: { type: String, required: true },
    user_id: { type: String, required: true },
    score: { type: Number, required: true },
    answers: [{ type: String, ref: 'Answer' }],
  },
  { versionKey: false }
)

const ResultModel = mongoose.model('Result', ResultSchema);
module.exports = { ResultModel }
