import Quiz from '../models/quizSchema.js';
import mongoose from 'mongoose'

const quizController = {
  createQuiz : async (req, res) => {
    try {
      const { title, questions } = req.body;
      const courseId = req.params.courseId;
  
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: 'Invalid courseId' });
      }
  
      const newQuiz = new Quiz({ 
        course: courseId, 
        title: title, 
        questions: questions });
      await newQuiz.save();
  
      res.status(201).json(newQuiz);
    } catch (error) {
      console.error('Error saat menambahkan quiz:', error); 
      res.status(500).json({ message: 'Failed to create quiz', error: error.message });
    }
  },
  

  getQuizzesByCourseId: async (req, res) => {
    try {
      const quizzes = await Quiz.find({ course: req.params.courseId });
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch quizzes', error: error.message });
    }
  },

  getQuizById: async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

      res.status(200).json(quiz);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch quiz', error: error.message });
    }
  },

  updateQuiz: async (req, res) => {
    try {
      const { quizId } = req.params;
      const { title, questions } = req.body;

      const updatedQuiz = await Quiz.findByIdAndUpdate(
        quizId,
        { title: title, questions:questions},
        { new: true }
      );

      if (!updatedQuiz) return res.status(404).json({ message: 'Quiz not found' });

      res.status(200).json(updatedQuiz);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update quiz', error: error.message });
    }
  },

  deleteQuiz: async (req, res) => {
    try {
      const { quizId } = req.params;
      const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
  
      if (!deletedQuiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete quiz', error: error.message });
    }
  },

  deleteQuestion: async (req, res) => {
    try {
      const { quizId, questionId } = req.params;
  
      const updatedQuiz = await Quiz.findByIdAndUpdate(
        quizId,
        { $pull: { questions: { _id: questionId } } },
        { new: true }
      );
  
      if (!updatedQuiz) return res.status(404).json({ message: 'Quiz not found' });
  
      res.status(200).json(updatedQuiz);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete question', error: error.message });
    }
  },
  
  
};

export default quizController;
