import axios from "axios";
import interceptors from "../Interceptors";

class MovieService {
  getMovie(movieId) {
    const url = `http://localhost:8080/api/v1/movie/${movieId}`;
    return axios.get(url);
  }

  getAllMovies() {
    const url = `http://localhost:8080/api/v1/movie/all`;
    return axios.get(url);
  }

  addMovieToTheater(theaterId, movie) {
    const url = `http://localhost:8080/api/v1/movie/add_movie_to_theater/${theaterId}`;
    const data = movie;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.put(url, data, headers);
  }

  updateMovie(movieId, movie) {
    const url = `http://localhost:8080/api/v1/movie/update/${movieId}`;
    const data = movie;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(url, data, headers);
  }

  removeMovieFromTheater(movieId) {
    const url = `http://localhost:8080/api/v1/movie/remove_movie_from_theater/${movieId}`;
    return axios.delete(url);
  }
}

export default new MovieService();
