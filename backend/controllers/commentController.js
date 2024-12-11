import Comment from '../models/commentModel.js';
import Course from '../models/courseModel.js';
import User from '../models/userModel.js';

export const getAllComments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const comments = await Comment.find({ course:courseId }).populate('user course');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments.', error: error.message });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id).populate('user course');

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comment.', error: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { user, course, text, rating } = req.body;

    // if (!user || !course || !text) {
    //   return res.status(400).json({ message: 'User, course, and text are required.' });
    // }

    const newComment = new Comment({
      user,
      course,
      text,
      rating,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment.', error: error.message });
  }
};



export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, rating } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { text, rating, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update comment.', error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }

    res.status(200).json({ message: 'Comment deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment.', error: error.message });
  }
};
