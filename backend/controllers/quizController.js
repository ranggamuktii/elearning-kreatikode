import Quiz from '../models/quizModel.js';
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
      const quizzes = await Quiz.find({ course: req.params.courseId,  deleted: false });
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch quizzes', error: error.message });
    }
  },

  updateQuiz: async (req, res) => {
    try {
      const { courseId } = req.params;
      const { title, questions } = req.body;

      const updatedQuiz = await Quiz.findOneAndUpdate(
        { course: courseId },
        { title: title, questions:questions, updatedAt: new Date()},
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
      const { courseId } = req.params;
      const updatedQuiz = await Quiz.findOneAndUpdate(
        { course: courseId },
        { deleted: true, updatedAt: new Date() },
        { new: true }
      );
  
      if (!updatedQuiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      res.status(200).json({ message: 'Quiz marked as deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to mark quiz as deleted', error: error.message });
    }
  },

  deleteQuestion: async (req, res) => {
    try {
      const { courseId, questionId } = req.params;
  
      const updatedQuiz = await Quiz.findOneAndUpdate(
        { course: courseId },
        { $pull: { questions: { _id: questionId } }, updatedAt: new Date() },
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
