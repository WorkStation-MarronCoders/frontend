import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://workstation-webapi-f6h3e4aqgxa6d5e7.canadacentral-01.azurewebsites.net";

const UsersAPI = `${API_BASE_URL}/api/workstation/user`;

export const UserApiService = {
  async login(command) {
    try {
      const response = await axios.post(`${UsersAPI}/login`, command);
      return response.data;
    } catch (error) {
      if (import.meta.env.DEV) console.error("❌ Error during login:", error);
      throw error.response?.data || error;
    }
  },

  async register(command) {
    try {
      const response = await axios.post(`${UsersAPI}/sign-up`, command);
      return response.data;
    } catch (error) {
      if (import.meta.env.DEV)
        console.error("❌ Error during registration:", error);
      throw error.response?.data || error;
    }
  },
};
