import axios from 'axios';
import { chatUrl } from 'global';

const fetchMessages = (userId, id, page) => {
  return axios.get(`${chatUrl}/${userId}/${id}`, { withCredentials: true, params: { pageNumber: page, pageSize: 15 } });
};

const chatService = { fetchMessages };
export default chatService;
