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
export const updateProfileDetails = (userId, { name }) => {
  return updateUser(userId, { name });
};

export const updatePersonalData = (userId, { phone, dateOfBirth, gender }) => {
  return updateUser(userId, { phone, dateOfBirth, gender });
};

export const updatePassword = (userId, { password }) => {
  return updateUser(userId, { password });
};

export const fetchCourses = () => API.get('/courses');
export const fetchCourseById = (id) => API.get(`/courses/${id}`);
export const createCourse = (courseData) => API.post('/courses', courseData);
export const updateCourse = (id, courseData) => API.put(`/courses/${id}`, courseData);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);
export const getProgress = (courseId) => API.get(`/progress/${courseId}`);
export const loadComment = (courseId) => API.get(`/courses/${courseId}/comments`);
