import axios from "axios";

//console.log("Environment variables:");
//console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
//console.log("MODE:", import.meta.env.MODE);
//console.log("All env vars:", import.meta.env);

// Fallback si no se encuentra la variable
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://workstation-webapi-f6h3e4aqgxa6d5e7.canadacentral-01.azurewebsites.net";

const OfficesAPI = `${API_BASE_URL}/api/workstation/office`;

//console.log("Final API URL:", OfficesAPI);
export class OfficeSearchAPIService {
  async getAllOffices() {
    //console.log("Getting all offices from URL:", OfficesAPI);
    try {
      const response = await axios.get(OfficesAPI);
      //console.log("Response status:", response.status);
      //console.log("Response headers:", response.headers);
      return response;
    } catch (error) {
      //console.error("Error in getAllOffices:", error);
      //console.error("Error response:", error.response?.data);
      throw error;
    }
  }

  async getOfficeByLocation(location) {
    //console.log("Getting office by location:", location);
    try {
      const response = await axios.get(
        `${OfficesAPI}/by-location/${encodeURIComponent(location)}`
      );
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      return response;
    } catch (error) {
      //console.error("Error in getOfficeByLocation:", error);
      //console.error("Error response:", error.response?.data);
      throw error;
    }
  }
}
