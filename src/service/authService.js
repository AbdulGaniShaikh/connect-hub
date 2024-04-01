import axios from 'axios';
import { authUrl, authUrls } from 'global';

const login = (username, password) => {
  if (typeof username !== 'string' && typeof password !== 'string') return;
  if (!username || !password) return;
  return axios.post(
    authUrls.login,
    { credential: username, password },
    { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
  );
};

const sendOtpToResetPassword = (email) => {
  return axios.post(`${authUrl}${email}/forgot-password`, null, {
    withCredentials: true
  });
};
const resetPassword = (email, password, otp) => {
  return axios.put(
    `${authUrl}${email}/reset-password`,
    {
      newPassword: password,
      otp
    },
    { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
  );
};

const signUp = ({ username, password, email }) => {
  if (typeof username !== 'string' && typeof password !== 'string') return;
  if (!username || !password) return;
  return axios.post(
    authUrls.signUp,
    { username, password, email },
    { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
  );
};

const isUserLoggedIn = () => {
  return axios.get(authUrls.isUserLoggedIn, { withCredentials: true });
};

const logout = () => {
  return axios.post(authUrls.logout, null, { withCredentials: true });
};

const verifyEmail = (email, token) => {
  return axios.get(`${authUrl}verify-account/${email}`, { withCredentials: true, params: { token } });
};

const resendVerificationLink = (email) => {
  return axios.post(`${authUrl}resend-verification-email/${email}`);
};

const authService = {
  login,
  signUp,
  logout,
  sendOtpToResetPassword,
  resetPassword,
  isUserLoggedIn,
  verifyEmail,
  resendVerificationLink
};

export default authService;
