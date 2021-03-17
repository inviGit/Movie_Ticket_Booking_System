import axios from "axios";
import interceptors from "../Interceptors";

class TheaterService {
      getTheater(theaterId) {
    const url = `http://localhost:8080/api/v1/theater/${theaterId}`;
    return axios.get(url);
  }
  getAllTheaters() {
    const url = `http://localhost:8080/api/v1/theater/all`;
    return axios.get(url);
  }

  addTheater(cityId, vendorId, theater) {
    const url = `http://localhost:8080/api/v1/theater/add/${cityId}/${vendorId}`;
    const data = theater;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.put(url, data, headers);
  }

  updateTheater(theaterId, theater) {
    const url = `http://localhost:8080/api/v1/theater/update/${theaterId}`;
    const data = theater;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(url, data, headers);
  }

  removeTheater(theaterId) {
      const url = `http://localhost:8080/api/v1/theater/remove/${theaterId}`;
      return axios.delete(url,);
    }

}

export default new TheaterService();
