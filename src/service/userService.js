import axios from 'axios';
import storageService from 'service/storageService';
import { authUrl, friendUrl, searchUrl, serverStatusUrl, userUrl } from 'global';

const pageSize = 10;

const getUser = (userId) => {
  return axios.get(`${userUrl}/${userId}`, { withCredentials: true });
};
const fetchLastSeen = (userId) => {
  return axios.get(`${userUrl}/${userId}/lastSeen`, { withCredentials: true });
};

const fetchAccessToken = () => {
  return axios.get(`${authUrl}refresh-token`, { withCredentials: true });
};

const getCurrentUser = () => {
  var user = storageService.getUser();
  return user ? user : null;
};

const updateProfile = (userId, image) => {
  const formData = new FormData();
  formData.append('file', image);
  return axios.put(`${userUrl}/${userId}/updateProfile`, formData, {
    headers: { 'content-type': 'multipart/form-data' },
    withCredentials: true
  });
};

const updateCover = (userId, image) => {
  const formData = new FormData();
  formData.append('file', image);
  return axios.put(`${userUrl}/${userId}/updateCover`, formData, {
    headers: { 'content-type': 'multipart/form-data' },
    withCredentials: true
  });
};

const updateDesp = (userId, description) => {
  return axios.put(
    `${userUrl}/${userId}/updateDescription`,
    { description },
    {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    }
  );
};

const sendFriendRequest = (userId) => {
  return axios.get(friendUrl, null, { withCredentials: true });
};

const search = (q, pageNumber) => {
  return axios.get(searchUrl, { withCredentials: true, params: { q, pageNumber, pageSize: 15 } });
};

const getMyRelation = (userId, otherUserId) => {
  return axios.get(`${userUrl}/relation/${userId}`, { withCredentials: true, params: { otherUserId } });
};

const getSavedPosts = (userId, pageNumber) => {
  return axios.get(`${userUrl}/${userId}/bookmarks`, { withCredentials: true, params: { pageNumber, pageSize } });
};

const changePassword = (userId, oldPassword, newPassword) => {
  return axios.put(`${userUrl}/${userId}/change-password`, { oldPassword, newPassword }, { withCredentials: true });
};

const fetchServerStatus = () => {
  return axios.get(serverStatusUrl);
};

const userService = {
  getUser,
  fetchLastSeen,
  getCurrentUser,
  updateDesp,
  updateProfile,
  updateCover,
  sendFriendRequest,
  search,
  getMyRelation,
  getSavedPosts,
  fetchAccessToken,
  changePassword,
  fetchServerStatus
};

export default userService;
