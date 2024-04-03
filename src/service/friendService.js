import axios from 'axios';
import { friendUrls, userUrl } from 'global';

const pageSize = 10;

const sendFriendRequest = (senderId, receiverId) => {
  return axios.post(
    friendUrls.friendUrl,
    { senderId, receiverId },
    { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
  );
};

const deleteFriendRequest = (requestId) => {
  return axios.delete(`${friendUrls.friendRequests}/${requestId}`, {
    withCredentials: true
  });
};

const acceptFriendRequest = (requestId) => {
  return axios.put(`${friendUrls.friendRequests}/${requestId}/accept`, null, {
    withCredentials: true
  });
};

const rejectFriendRequest = (requestId) => {
  return axios.delete(`${friendUrls.friendRequests}/${requestId}/reject`, {
    withCredentials: true
  });
};

const unfriend = (asker, friendToUnfriend) => {
  return axios.put(
    friendUrls.friendUrl,
    { asker, friendToUnfriend },
    { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
  );
};

const getFriendRequests = (userId, pageNumber) => {
  return axios.get(`${userUrl}/${userId}/friend-requests`, {
    withCredentials: true,
    params: { pageNumber, pageSize }
  });
};

const getFriends = (userId, pageNumber, size = pageSize) => {
  return axios.get(`${userUrl}/${userId}/friends`, { withCredentials: true, params: { pageNumber, size } });
};

const friendService = {
  getFriends,
  getFriendRequests,
  sendFriendRequest,
  deleteFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  unfriend
};
export default friendService;
