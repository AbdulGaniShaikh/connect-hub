import axios from 'axios';
import { imageUrl } from 'global';
import { cache } from 'utility/LRUCache';

const get = async (id) => {
  return new Promise(async (resolve, reject) => {
    const data = cache.get(id);
    if (data) {
      resolve(data);
    }
    try {
      const res = await axios.get(`${imageUrl}/${id}`, { responseType: 'blob' });
      const blob = new Blob([res.data]);
      const imageData = URL.createObjectURL(blob);
      cache.put(id, imageData);
      resolve(imageData);
    } catch (error) {
      reject(error);
    }
  });
};

const imageService = { get };
export default imageService;
