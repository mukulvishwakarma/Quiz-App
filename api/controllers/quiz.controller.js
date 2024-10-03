const { QuizModel } = require('../models/quiz.model');
const { ResultModel } = require('../models/result.model');
const { AnswerModel } = require('../models/answer.model');

const QuizController = {}

// Create Quiz
QuizController.createQuiz = async (req, res) => {
  const quizData = req.body;

  // Validate input data
  if (!quizData || Object.keys(quizData).length === 0) {
    return res.status(400).json({ message: 'Quiz data is required' });
  }

  try {
    const quiz = await new QuizModel(quizData).save()
    return res.status(201).json(quiz)
  } catch (error) {
    // Send a more specific error message
    const errorMessage = error.name === 'ValidationError' 
      ? error.message 
      : 'An error occurred while creating the quiz';
    res.status(400).json({ message: errorMessage });
  }
};


// Get Quiz by ID
QuizController.getQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await QuizModel.findById(id).select('-questions.correct_option');

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    return res.status(200).json(quiz)
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'An error occurred while retrieving the quiz' });
  }
};

// Submit Answer
QuizController.submitAnswer = async (req, res) => {
  const { question_id, selected_option, user_id } = req.body;
  const quizId = req.params.id;

  try {
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const question = quiz.questions.id(question_id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const is_correct = question.correct_option === selected_option;

    const answer = new AnswerModel({ question_id, user_id, selected_option, is_correct });
    await answer.save();


    return res.status(200).json({ is_correct, correct_option: question.correct_option });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while submitting the answer' });
  }
};

// Get Results
QuizController.getResults = async (req, res) => {
  const { user_id } = req.body;

  const answers = await AnswerModel.find({ user_id })

  const result = new ResultModel({
      quiz_id: req.params.id,
      user_id,
      score: answers.filter(ans => ans.is_correct).length,
      answers
  });

  await result.save();
  res.send(result);
};


module.exports = { QuizController };
