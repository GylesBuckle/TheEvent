import axios from './axios';
const searchLocations = async (query, lang, token) => {
  try {
    const response = await axios.get(`/events/searchLocation/?q=${query}&lang=${lang}`, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
      };
    } else {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || 'Something went wrong',
    };
  }
};
export default searchLocations;
