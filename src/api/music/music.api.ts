// src/api/music/music.api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002'; // Replace with your actual API base URL


export const uploadMusic = async (formData: FormData) => {
  try {
    const token = localStorage.getItem('token'); // Lấy token từ local storage

    const response = await axios.post(`${API_BASE_URL}/music/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token ? `Bearer ${token}` : '', // Thêm token vào header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading music:', error);
    throw error;
  }
};

export const getRecentMusic = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/music/recent`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent music:', error);
    throw error;
  }
};
export const streamMusic = async (musicId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/music/stream/${musicId}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error streaming music:', error);
    throw error;
  }


};

// Fetch number of likes for a song
export const getLikes = async (musicId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/music/likes/${musicId}`);
    console.log('Calling API:', response);
    return response.data.likes; // Assuming the endpoint returns { likes: number }
  } catch (error) {
    console.error('Error fetching likes:', error);
    return 0; // Return 0 likes if there's an error
  }
};

// Toggle like status for a song
export const toggleLike = async (musicId: string, token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/music/toggleLike/${musicId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.likes; // Updated number of likes
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};

export const getMusicByGenre = async (genre: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/music/genre/${genre}`);
    return response.data; // Đảm bảo trả về đúng dữ liệu từ backend
  } catch (error) {
    console.error("Error fetching music by genre:", error);
    throw error;
  }
};
