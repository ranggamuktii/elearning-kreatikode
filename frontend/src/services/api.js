import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

export default API;
