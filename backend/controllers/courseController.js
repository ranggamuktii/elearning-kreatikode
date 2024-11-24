import Course from '../models/courseSchema.js';

const courseController = {
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
  addMaterial: async (req, res) => {
    try {
      const course = await Course.findById(req.params.courseId);
      if (!course) return res.status(404).json({ message: 'Course not found' });

      const { title, content, order } = req.body;

      course.materials.push({ title, content, order });
      course.updatedAt = Date.now();

      await course.save();

      return res.status(201).json(course);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },
  editMaterial: async (req, res) => {
    try {
      const { courseId, materialOrder } = req.params;
      const { title, content } = req.body;

      const course = await Course.findById(courseId);
      if (!course) return res.status(404).json({ message: 'Course not found' });

      const material = course.materials.find((m) => m.order === parseInt(materialOrder, 10));
      if (!material) return res.status(404).json({ message: 'Material not found' });

      material.title = title?.trim() || material.title;
      material.content = content?.trim() || material.content;

      course.updatedAt = Date.now();
      await course.save();

      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },
  deleteMaterial: async (req, res) => {
    try {
      const { courseId, materialOrder } = req.params;

      const course = await Course.findById(courseId);
      if (!course) return res.status(404).json({ message: 'Course not found' });

      course.materials = course.materials.filter((m) => m.order !== parseInt(materialOrder, 10));
      course.updatedAt = Date.now();

      await course.save();
      res.status(200).json({ message: 'Material deleted successfully', course });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },
};

export default courseController;
