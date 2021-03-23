import axios from "axios";
import interceptors from "../Interceptors";

class CityService {
  getCity(cityId) {
    const url = `http://localhost:8080/api/v1/city/${cityId}`;
    return axios.get(url);
  }

  getAllCities() {
    const url = `http://localhost:8080/api/v1/city/all`;
    return axios.get(url);
  }

  addCity(city) {
    const url = `http://localhost:8080/api/v1/city/add`;
    const data = city;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.put(url, data, headers);
  }

  updateCity(cityId, city) {
    const url = `http://localhost:8080/api/v1/city/update/${cityId}`;
    const data = city;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(url, data, headers);
  }

  removeCity(cityId) {
    const url = `http://localhost:8080/api/v1/city/remove/${cityId}`;
    return axios.delete(url);
  }
}

export default new CityService();
