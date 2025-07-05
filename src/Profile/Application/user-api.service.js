import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://workstation-webapi-f6h3e4aqgxa6d5e7.canadacentral-01.azurewebsites.net";

const UsersAPI = `${API_BASE_URL}/api/workstation/user`;

export const UserApiService = {
  async getUserById(userId) {
    try {
      const response = await axios.get(`${UsersAPI}/${userId}`);
      return response.data;
    } catch (error) {
      if (import.meta.env.DEV)
        console.error(`❌ Error getting user with ID ${userId}:`, error);
      throw error.response?.data || error;
    }
  },
};
