import axios from "axios";

const OfficesAPI = import.meta.env.VITE_PROPERTIES_API_URL;

export class OfficesAPIService {
  async createOffice(office) {
    return await axios.post(`${OfficesAPI}`, office);
  }

  async getAllOffices() {
    return await axios.get(`${OfficesAPI}`);
  }

  async deleteOffice(id) {
    return await axios.delete(`${OfficesAPI}/${id}`);
  }
}
