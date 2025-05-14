import axios from "axios";

const PropertiesAPI = import.meta.env.VITE_PROPERTIES_API_URL;

export class PropertiesAPIService {
    async getAll() {
        var response = await axios.get(`${PropertiesAPI}`)
        return response; 
    }

    async createProperty(property) {
        const response = await axios.post(`${PropertiesAPI}`, property);
        return response;
    }

    async deleteProperty(id) {
        const response = await axios.delete(`${PropertiesAPI}/${id}`);
        return response;
    }
}