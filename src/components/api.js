import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = '30577458-4ba1bcc8e50eb18fed42c68e0';

export const fetchPictureByHits = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data.hits;
};
