import React, { Component } from "react";
import seatingService from "../service/seatingService";
import showService from "../service/showService";
import { toast } from "react-toastify";
import customerService from "../service/customerService";

export class Seatings extends Component {
  state = {
    showId: "",
    customerId: "",
    pageTitle: "WELCOME",
    seatingId: "",
    seats: [],
    selectedSeats: [],
    seatMap: {},
  };

  componentDidMount() {
    const showId = this.props.match.params.showId;
    showService.getShow(showId).then((res) => {
      const { seating } = res.data;
      this.setState({ showId, seats: seating.seats, seatingId: seating.id });
    });
    const username = localStorage.getItem("username");

    customerService.getCustomerByUserName(username).then((res) => {
      console.log(res);
      this.setState({ customerId: res.data.id });
    });
    this.handleSeatMapping()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.seats !== nextState.seats;
  }

  handleSeatMapping = () => {
    let seatMap = this.state.seatMap;
    let char = "A";
    for (let i = 0; i < 9; i++) {
      seatMap[i] = char;
      char = String.fromCharCode(char.charCodeAt() + 1);
    }
  };

  handelCheck = (rowIndex, colIndex) => {
    const {seats, selectedSeats, seatMap} = this.state;
    let array = [...seats];
    let seatRow = array[rowIndex];
    seatRow[colIndex] = 1;
    array[rowIndex] = seatRow;
    this.setState({ array });
    
    let seatNo = seatMap[rowIndex]+(colIndex+1) 
    console.log(seatNo);
    
    const selectedSeatIndex = selectedSeats.indexOf(seatNo);

    selectedSeatIndex > -1 ? selectedSeats.splice(selectedSeatIndex, 1) : selectedSeats.push(seatNo)

  };

  handleSuccess = (message, userId) => {
    toast(message);
    this.props.history.push(`/customer/${userId}/tickets`);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleBookShow = () => {
    const { showId, selectedSeats } = this.state;

    seatingService
      .bookSeats(showId, this.state.customerId, selectedSeats)
      .then((res) => {
        console.log(res);
        const { data } = res;
        data.status === 1
          ? this.handleSuccess(data.message)
          : this.handleFailure(data.message);
      });
      };

  render() {
    return (
      <div>
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <div className="card-body">
            <h3 className="text-center">SCREEN</h3>
            <hr />
            <table className="table table-striped table-bordered">
              <thead></thead>
              <tbody>
                {this.state.seats.map((seat, rowIndex) => (
                  <tr key={rowIndex}>
                    {seat.map((val, colIndex) => (
                      <td key={colIndex}>
                        {val === 1 ? (
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            checked
                            disabled
                          />
                        ) : (
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            onChange={() =>
                              this.handelCheck(rowIndex, colIndex)
                            }
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => this.handleBookShow()}
            >
              Book Seats
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Seatings;
