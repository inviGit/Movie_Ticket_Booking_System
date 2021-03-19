import axios from "axios";
import interceptors from "../Interceptors";

class SeatingService {
getSeatingById(seatingId) {
    const url = `http://localhost:8080/api/v1/seating/${seatingId}`;
    return axios.get(url);
  }

  bookSeats(showId, customerId, seats) {
    const url = `http://localhost:8080/api/v1/seating/book/${showId}/${customerId}`;
    const data = seats;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(url, data, headers);
  }

  cancelBooking(showId, customerId) {
    const url = `http://localhost:8080/api/v1/seating/cancel/${showId}/${customerId}`;
    return axios.post(url);
  }
}

export default new SeatingService();
