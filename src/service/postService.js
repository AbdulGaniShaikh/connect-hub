import axios from 'axios';
import { postUrl, userUrl } from './../global';

const uploadNewPost = (userId, image, text) => {
  if (image) {
    console.log(image);
  }
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('text', text);
  formData.append('image', image);
  return axios.post(postUrl, formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true });
};

const pageSize = 10;

const getPost = (postId) => {
  return axios.get(postUrl + '/' + postId, { withCredentials: true });
};

const getPostsOfUser = (userId, pageNumber) => {
  return axios.get(`${userUrl}/${userId}/posts`, { withCredentials: true, params: { pageNumber, pageSize } });
};

const getFeed = (userId, pageNumber) => {
  return axios.get(`${userUrl}/${userId}/feed`, { withCredentials: true, params: { pageNumber, pageSize } });
};

const postComment = (postId, comment, userId) => {
  return axios.post(`${postUrl}/${postId}/comments`, { userId, comment }, { withCredentials: true });
};

const getComments = (postId, pageNumber) => {
  return axios.get(`${postUrl}/${postId}/comments`, { withCredentials: true, params: { pageNumber } });
};

const isLikedAndSaved = (postId, userId) => {
  return axios.get(`${postUrl}/${postId}/isLikedAndBookmarked/${userId}`, { withCredentials: true });
};
const likePost = (postId, userId) => {
  return axios.post(`${postUrl}/${postId}/likes/${userId}`, null, { withCredentials: true });
};
const unlikePost = (postId, userId) => {
  return axios.delete(`${postUrl}/${postId}/unlikes/${userId}`, { withCredentials: true });
};

const savePost = (postId, userId) => {
  return axios.post(`${postUrl}/${postId}/bookmark/${userId}`, null, { withCredentials: true });
};
const unsavePost = (postId, userId) => {
  return axios.delete(`${postUrl}/${postId}/removeBookmark/${userId}`, { withCredentials: true });
};

const postService = {
  uploadNewPost,
  getPost,
  getPostsOfUser,
  getFeed,
  postComment,
  getComments,
  isLikedAndSaved,
  likePost,
  unlikePost,
  savePost,
  unsavePost
};
export default postService;
