import CryptoJS from 'crypto-js';

const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
};

export default hashPassword;
