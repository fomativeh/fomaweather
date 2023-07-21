import axios from 'axios';
import { toast } from 'react-hot-toast';
const BASE_URL = 'https://api.unsplash.com';

export const fetchWeatherImage = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
        query,
        client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
      },
    });

    if (response.status === 200) {
      const imageResults = response.data.results;
      return imageResults.length > 0 ? imageResults[0].urls.regular : null;
    } else {
      return null;
    }
  } catch (error) {
    toast.error('Error fetching weather image.', {duration:2800});
    console.log(error)
    return null;
  }
};