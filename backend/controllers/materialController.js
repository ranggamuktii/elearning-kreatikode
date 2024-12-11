import Course from '../models/courseModel.js';

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({deleted: false}).sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course || course.deleted) return res.status(404).json({
            message: 'Course not found'
        });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
};

export const addMaterial = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course || course.deleted) return res.status(404).json({
            message: 'Course not found'
        });

        const {
            title,
            content
        } = req.body;

        course.materials.push({
            title,
            content
        });
        course.updatedAt = Date.now();

        await course.save();

        return res.status(201).json(course);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const editMaterial = async (req, res) => {
    try {
        const {
            courseId,
            id
        } = req.params;
        const {
            title,
            content
        } = req.body;

        const course = await Course.findById(courseId);
        if (!course || course.deleted) return res.status(404).json({
            message: 'Course not found'
        });

        // Use find instead of findById to locate the material in the materials array
        const material = course.materials.find(material => material._id.toString() === id);
        if (!material) return res.status(404).json({
            message: 'Material not found'
        });

        // Update the material's title and content if provided
        material.title = title?.trim() || material.title;
        material.content = content?.trim() || material.content;

        course.updatedAt = Date.now();
        await course.save();

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const deleteMaterial = async (req, res) => {
    try {
        const {
            courseId,
            id
        } = req.params;

        const course = await Course.findById(courseId);
        if (!course || course.deleted) return res.status(404).json({
            message: 'Course not found'
        });

        const materialIndex = course.materials.findIndex(material => material._id.toString() === id);
        if (materialIndex === -1) return res.status(404).json({
            message: 'Material not found'
        });

        course.materials.splice(materialIndex, 1);
        course.updatedAt = Date.now();

        await course.save();
        res.status(200).json({
            message: 'Material deleted successfully',
            course
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};