import Cookies from 'js-cookie';

const saveUserId = (userId) => {
  localStorage.setItem('userId', userId);
};

const getUserId = () => {
  return Cookies.get('userId');
};

const clear = () => {
  localStorage.clear();
};

const storageService = {
  saveUserId,
  getUserId,
  clear
};
export default storageService;
