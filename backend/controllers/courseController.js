import Course from '../models/courseModel.js';

const adminController = {
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find({ deleted: false }).sort({ createdAt: -1 });
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  },

  getCourseById: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course || course.deleted) return res.status(404).json({ message: 'Course not found' });
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  },

  createCourse: async (req, res) => {
    try {
      const { title, description, category, level, thumbnail, introduction, materials } = req.body;

      // Check if materials is defined, if not set it to an empty array
      const materialsWithOrder = Array.isArray(materials)
        ? materials.map((material) => ({
            ...material,
          }))
        : [];

      const newCourse = new Course({
        title,
        description,
        category,
        level,
        thumbnail,
        introduction,
        materials: materialsWithOrder,
      });

      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      console.error('Error creating course:', error.message);
      res.status(500).json({ message: 'Internal server error', error });
    }
  },

  updateCourse: async (req, res) => {
    try {
      const { title, description, category, level, thumbnail, introduction, materials } = req.body;

      const materialsWithOrder = Array.isArray(materials)
        ? materials.map((material) => ({
            ...material,
          }))
        : [];

      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          category,
          level,
          thumbnail,
          introduction,
          materials: materialsWithOrder,
          updatedAt: Date.now(),
        },
        { new: true }
      );

      if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      const deletedCourse = await Course.findById(req.params.id);
      if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });

      deletedCourse.deleted = true;
      deletedCourse.updateAt = Date.now();

      await deletedCourse.save();
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  },
  addThumbnailToCourse: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      course.thumbnail = `/public/images/${req.file.filename}`;

      await course.save();
      res.status(200).json({ message: 'Thumbnail uploaded successfully', course });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  },
};

export default adminController;
