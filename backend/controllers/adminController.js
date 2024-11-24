import Course from '../models/courseSchema.js';

const adminController = {
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find().sort({ createdAt: -1 });
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  },

  getCourseById: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  },

  createCourse: async (req, res) => {
    try {
      const { title, description, category, thumbnail, introduction, materials, duration, price } = req.body;

      const materialsWithOrder = materials.map((material, index) => ({
        ...material,
        order: index + 1,
      }));

      const newCourse = new Course({
        title,
        description,
        category,
        thumbnail,
        introduction,
        materials: materialsWithOrder,
        duration,
        price,
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
      const { title, description, category, thumbnail, introduction, materials, duration, price } = req.body;

      const materialsWithOrder = materials.map((material, index) => ({
        ...material,
        order: index + 1,
      }));

      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          category,
          thumbnail,
          introduction,
          materials: materialsWithOrder,
          duration,
          price,
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
      const deletedCourse = await Course.findByIdAndDelete(req.params.id);
      if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  },
};

export default adminController;
