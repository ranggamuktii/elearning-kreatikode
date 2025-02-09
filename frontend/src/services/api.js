import axios from 'axios';
import { getUserData, removeUserToken } from '../components/Utils/tokendata';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const userData = getUserData();
  if (userData) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response?.status) {
      case 401:
        removeUserToken();
        window.location.href = '/login';
        break;
      case 403:
        break;
      case 404:
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => API.post('/users/register', userData);
export const loginUser = (credentials) => API.post('/users/login', credentials);

export const updateUser = (userId, data) => API.put(`/users/${userId}`, data);
export const getUserProfile = (userId) => API.get(`/users/${userId}`);

export const updateUserPhoto = (userId, formData) => {
  return API.put(`/users/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProfileDetails = (userId, data) => {
  // Jika data adalah objek dengan nama
  if (data && data.name) {
    return updateUser(userId, { name: data.name });
  }

  // Jika data adalah FormData (foto)
  if (data instanceof FormData) {
    return updateUserPhoto(userId, data);
  }
};

export const updatePersonalData = (userId, { phone, dateOfBirth, gender }) => {
  return updateUser(userId, { phone, dateOfBirth, gender });
};

export const updatePassword = (userId, data) => {
  return updateUser(userId, { password: data.password });
};

export const verifyEmail = (token) => API.put(`/users/verify-email/${token}`);

export const resendVerification = (data) => API.post('/users/resend-verification', data);

export const fetchCourses = () => API.get('/courses');
export const fetchCourseById = (courseId) => API.get(`/courses/${courseId}`);
export const createCourse = (courseData) => API.post('/courses', courseData);
export const updateCourse = (id, courseData) => API.put(`/courses/${id}`, courseData);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);

export const getProgress = (courseId, userId) => API.get(`/progress/${courseId}/${userId}`);
export const addProgress = (courseId, materialId, userId) => API.post(`/progress/${courseId}/material/${materialId}/${userId}`);
export const getProgressByUserId = (userId) => API.get(`/progress/${userId}`);
export const addQuizScore = (courseId, userId, quizScore) => API.post(`/progress/${courseId}/${userId}/quiz-score`, quizScore);

export const postComment = (courseId, data) => API.post(`/courses/${courseId}/comments`, data);
export const loadComment = (courseId) => API.get(`/courses/${courseId}/comments`);

export const fetchQuizByCourse = (courseId) => API.get(`/courses/${courseId}/quiz`);
