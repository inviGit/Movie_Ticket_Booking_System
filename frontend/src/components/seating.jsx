import React, { Component } from "react";
import seatingService from "../service/seatingService";
import showService from "../service/showService";
import { toast } from "react-toastify";
import customerService from "../service/customerService";

export class Seatings extends Component {
  state = {
    showId: "",
    pageTitle: "WELCOME",
    seatingId: "",
    seats: [],
  };

  componentDidMount() {
    const showId = this.props.match.params.showId;
    showService.getShow(showId).then((res) => {
      const { seating } = res.data;
      this.setState({ seats: seating.seats, seatingId: seating.id });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.seats !== nextState.seats;
  }

  handelCheck = (rowIndex, colIndex) => {
    let array = [...this.state.seats];
    let seatRow = array[rowIndex];
    seatRow[colIndex] = 1;
    array[rowIndex] = seatRow;
    this.setState({ array });
  };

  handleSuccess = (message, userId) => {
    toast(message);
    this.props.history.push(`/customer/${userId}/tickets`);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleBookShow = () => {
    console.log(this.state.seats);
    const { seatingId, seats } = this.state;
    const username = localStorage.getItem("username");
    let id="";
    customerService.getCustomerByUserName(username).then((res)=>{
      id = res.data.id;
    })
    seatingService.bookSeats(seatingId, id , seats).then((res) => {
          console.log(res);
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message, id)
        : this.handleFailure(data.message);
    });
    // const userId = localStorage.getItem("userId");
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
              onClick={()=>this.handleBookShow()}
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
