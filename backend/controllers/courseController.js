import Course from '../models/courseModel.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ deleted: false }).sort({
      createdAt: -1,
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course || course.deleted)
      return res.status(404).json({
        message: 'Course not found',
      });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, category, level, introduction, materials } = req.body;

    const thumbnailPath = req.file?.path;

    const formattedMaterials = Array.isArray(materials)
      ? materials.map((material) => ({
          ...material,
        }))
      : [];

    const newCourse = new Course({
      title,
      description,
      category,
      level,
      thumbnail: thumbnailPath,
      introduction,
      materials: formattedMaterials,
    });

    const savedCourse = await newCourse.save();

    res.status(201).json({
      message: 'Course created successfully.',
      course: savedCourse,
    });
  } catch (error) {
    console.error('Error creating course:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

export const updateCourse = async (req, res) => {
  const { title, description, category, level, introduction, materials } = req.body;
  try {
    const material = Array.isArray(materials)
      ? materials.map((material) => ({
          ...material,
        }))
      : [];

    const thumbnailPath = req.file?.path;

    const updateCourse = await Course.findByIdAndUpdate(req.params.id, {
      title,
      description,
      category,
      level,
      thumbnail: thumbnailPath,
      introduction,
      materials: material,
      updatedAt: Date.now(),
    });

    if (!updateCourse)
      return res.status(404).json({
        message: 'Course not found',
      });

    res.status(200).json({
      message: 'Course updated successfully.',
      course: updateCourse,
    });
  } catch (error) {
    console.error('Error updating course:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findById(req.params.id);
    if (!deletedCourse)
      return res.status(404).json({
        message: 'Course not found',
      });

    deletedCourse.deleted = true;
    deletedCourse.updatedAt = Date.now();

    await deletedCourse.save();
    res.status(200).json({
      message: 'Course deleted successfully',
      deletedCourse,
    });
  } catch (error) {
    console.error('Error deleting course:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

export const addThumbnailToCourse = async (req, res) => {
  try {
    const { id } = req.params;
    z;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const thumbnailPath = req.file.path;

    const updatedCourse = await Course.findByIdAndUpdate(id, { thumbnail: thumbnailPath, updatedAt: Date.now() }, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      message: 'Thumbnail added successfully',
      course: updatedCourse,
    });
  } catch (error) {
    console.error('Error adding thumbnail:', error.message);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const filterCourseByCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category || typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({
        message: 'Category must be a non-empty string',
      });
    }

    const courses = await Course.find({ category: category.trim() });

    if (courses.length === 0) {
      return res.status(404).json({
        message: 'No courses found for this category',
      });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error filtering courses by category:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};
