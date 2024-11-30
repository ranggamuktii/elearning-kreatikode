import { toast, Slide } from 'react-toastify';
import '../../App.css';

export const showToast = (type, message) => {
  toast[type](message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Slide,
  });
};

export const showSuccessToast = (message) => showToast('success', message);
export const showErrorToast = (message) => showToast('error', message);
export const showWarningToast = (message) => showToast('warn', message);
export const showInfoToast = (message) => showToast('info', message);
