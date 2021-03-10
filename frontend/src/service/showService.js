import axios from "axios";
import interceptors from "../Interceptors";

class ShowService {
      getShow(showId) {
    const url = `http://localhost:8080/api/v1/show/${showId}`;
    return axios.get(url);
  }

  addShowToTheater(movieId, show) {
    const url = `http://localhost:8080/api/v1/show/add/${movieId}`;
    const data = show;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.put(url, data, headers);
  }

  updateShowToTheater(showId, show) {
    const url = `http://localhost:8080/api/v1/show/update/${showId}`;
    const data = show;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(url, data, headers);
  }

  removeShowFromTheater(showId) {
    const url = `http://localhost:8080/api/v1/show/remove/${showId}`;
    return axios.delete(url);
  }
}

export default new ShowService();
