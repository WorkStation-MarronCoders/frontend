import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://workstation-webapi-f6h3e4aqgxa6d5e7.canadacentral-01.azurewebsites.net";

const OfficesAPI = `${API_BASE_URL}/api/workstation/office`;

export class OfficeSearchAPIService {
  async getAllOffices() {
    try {
      const response = await axios.get(OfficesAPI);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getOfficeByLocation(location) {
    try {
      const response = await axios.get(
        `${OfficesAPI}/by-location/${encodeURIComponent(location)}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
