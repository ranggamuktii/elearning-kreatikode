import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';

export const getUserData = () => {
  const token = Cookies.get('TOKEN');

  let userData = {};
  if (token) {
    try {
      userData = decodeJwt(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      Cookies.remove('TOKEN'); // Remove invalid token
    }
  }
  return userData;
};

export const setUserToken = (token) => {
  Cookies.set('TOKEN', token);
};

export const removeUserToken = () => {
  Cookies.remove('TOKEN');
};
