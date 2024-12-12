import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Course Functions
export const fetchCourses = () => API.get('/admin/courses');
export const fetchCourseById = (id) => API.get(`/admin/courses/${id}`);
export const createCourse = (courseData) => API.post('/admin/courses', courseData);
export const updateCourse = (id, courseData) => API.put(`/admin/courses/${id}`, courseData);
export const deleteCourse = (id) => API.delete(`/admin/courses/${id}`);
export const getProgress = (courseId) => API.get(`/progress/${courseId}`);

// Get Progress berdasarkan courseId
//export const getProgress = async (courseId) => {
// try {
// const response = await fetch(`${API_BASE_URL}/progress/${courseId}`, { // Menggunakan backticks
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

//     const data = await response.json();
//     console.log("Progress data from API:", data); // Cek data yang diterima
//     return data.progress || 0; // Pastikan progress adalah angka atau 0
//   } catch (error) {
//     console.error("Error fetching progress:", error);
//     return 0; // Kembalikan 0 jika terjadi error
//   }
// };
