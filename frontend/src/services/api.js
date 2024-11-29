import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});


export const fetchCourses = () => API.get('/courses');
export const fetchCourseById = (id) => API.get(`/courses/${id}`);
export const fetchMaterialById = (materialId) => API.get(`/materials/${materialId}`);
export const createCourse = (courseData) => API.post('/admin/courses', courseData);
export const updateCourse = (id, courseData) => API.put(`/admin/courses/${id}`, courseData);
export const deleteCourse = (id) => API.delete(`/admin/courses/${id}`);
export const addMaterial = (courseId, materialData) => API.post(`/courses/${courseId}/materials`, materialData);
export const updateMaterial = (courseId, order, materialData) => API.put(`/courses/${courseId}/materials/${order}`, materialData);
export const deleteMaterial = (courseId, order) => API.delete(`/courses/${courseId}/materials/${order}`);
export const fetchQuizByCourse = (courseId) => API.get(`/quiz/${courseId}`);
export const fetchQuizById = (courseId, quizId) => API.get(`/quiz/${courseId}/${quizId}`);
export const createQuiz = (courseId, quizData) => API.post(`/quiz/${courseId}`, quizData);
export const updateQuiz = (courseId, quizId, quizData) => API.put(`/quiz/${courseId}/${quizId}`, quizData);
export const deleteQuiz = (courseId, quizId) => API.delete(`/quiz/${courseId}/${quizId}`);
export const deleteQuestion = (courseId, quizId, questionId) => API.delete(`/quiz/${courseId}/${quizId}/questions/${questionId}`);


export default API;
