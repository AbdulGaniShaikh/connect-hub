import axios from 'axios';
import { chatUrl, inboxUrl } from 'global';

const fetchMessages = (userId, id, page) => {
  return axios.get(`${chatUrl}/${userId}/${id}`, { withCredentials: true, params: { pageNumber: page, pageSize: 15 } });
};

const fetchInbox = (userId, page) => {
  return axios.get(`${inboxUrl}/${userId}`, { withCredentials: true, params: { pageNumber: page } });
};

const fetchTotalUnreadConvo = (userId) => {
  return axios.get(`${inboxUrl}/${userId}/count`, { withCredentials: true });
};

const chatService = { fetchMessages, fetchInbox, fetchTotalUnreadConvo };
export default chatService;
