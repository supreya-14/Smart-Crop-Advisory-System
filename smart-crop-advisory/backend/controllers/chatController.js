// This controller handles the AI chatbot feature where farmers can ask
// free-form questions about crops, diseases, fertilizers, etc.
const ChatHistory = require("../models/ChatHistory");
const geminiService = require("../services/geminiService");

// @route   POST /api/chat
// @desc    Send a question to the AI chatbot and save the conversation
const sendMessage = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ message: "Question cannot be empty" });
    }

    // Get the AI's answer
    const answer = await geminiService.getChatbotReply(question);

    // Save this question-answer pair to the database
    const chat = await ChatHistory.create({
      user: req.user.id,
      question,
      answer,
    });

    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/chat/history
// @desc    Get all past chat messages for the logged-in user
const getChatHistory = async (req, res, next) => {
  try {
    const history = await ChatHistory.find({ user: req.user.id }).sort({ createdAt: 1 });
    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getChatHistory };
