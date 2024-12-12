import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchCourses = () => API.get('/courses');
export const fetchCourseById = (id) => API.get(`/courses/${id}`);
export const createCourse = (courseData) => API.post('/courses', courseData);
export const updateCourse = (id, courseData) => API.put(`/courses/${id}`, courseData);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);
export const getProgress = (courseId) => API.get(`/progress/${courseId}`);
export const loadComment = (courseId) => API.get(`/courses/${courseId}/comments`);
