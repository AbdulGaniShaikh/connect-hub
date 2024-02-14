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

const deleteFriendRequest = (senderId, receiverId) => {
  return axios.put(
    friendUrls.friendRequests,
    { senderId, receiverId },
    { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
  );
};

const acceptFriendRequest = (senderId, receiverId) => {
  return axios.put(
    friendUrls.acceptFr,
    { senderId, receiverId },
    { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
  );
};

const rejectFriendRequest = (senderId, receiverId) => {
  return axios.put(
    friendUrls.rejectFr,
    { senderId, receiverId },
    { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
  );
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

const getFriends = (userId, pageNumber) => {
  return axios.get(`${userUrl}/${userId}/friends`, { withCredentials: true, params: { pageNumber, pageSize } });
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
