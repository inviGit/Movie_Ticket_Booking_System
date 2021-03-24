import React, { Component } from "react";
import { toast } from "react-toastify";
import { Button, Grid, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import showService from "../../service/showService";
import customerService from "../../service/customerService";
import _ from "lodash";

export class Seatings extends Component {
  state = {
    movieId: "",
    showId: "",
    customerId: "",
    pageTitle: "WELCOME",
    seatingId: "",
    seats: [],
    selectedSeats: [],
    seatMap: {},
    noOfselectedSeats: 0,
    price: 0,
  };

  componentDidMount() {
    const showId = this.props.match.params.showId;
    const movieId = this.props.location.state.movieId;
    showService.getShow(showId).then((res) => {
      const { seating } = res.data;
      this.setState({
        showId,
        seats: seating.seats,
        seatingId: seating.id,
        movieId,
      });
    });
    if (localStorage.getItem("role") === "ROLE_CUSTOMER") {
      const username = localStorage.getItem("username");
      customerService.getCustomerByUserName(username).then((res) => {
        console.log(res);
        this.setState({ customerId: res.data.id });
      });
      this.handleSeatMapping();
    } else {
      toast("Only Customer can book the show");
    }
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
    const { seats, selectedSeats, seatMap, noOfselectedSeats } = this.state;
    let array = [...seats];
    let seatRow = array[rowIndex];
    seatRow[colIndex] = 1;
    array[rowIndex] = seatRow;
    this.setState({ array });

    let seatNo = seatMap[rowIndex] + (colIndex + 1);
    console.log(seatNo);

    const selectedSeatIndex = selectedSeats.indexOf(seatNo);

    if (selectedSeatIndex > -1) {
      selectedSeats.splice(selectedSeatIndex, 1);
      this.setState({ noOfselectedSeats: noOfselectedSeats - 1 });
    } else {
      selectedSeats.push(seatNo);
      this.setState({ noOfselectedSeats: noOfselectedSeats + 1 });
    }
    console.log(noOfselectedSeats);
  };

  handleBookShow = () => {
    const { showId, selectedSeats, customerId } = this.state;
    if (localStorage.getItem("role") === "ROLE_CUSTOMER") {
      if (!_.isEmpty(selectedSeats)) {
        this.props.history.push({
          pathname: `/show/${showId}/booking`,
          state: { selectedSeats: selectedSeats, customerId: customerId },
        });
      } else {
        toast("No seats are selected. Select seats to proceed");
      }
    } else {
      toast("Only Customer can book the show");
    }
  };

  handleCancel = () => {
    this.props.history.push(`/movie/${this.state.movieId}/shows`);
  };

  render() {
    const { seats } = this.state;
    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        <div
          className="card col-md-6 offset-md-3 offset-md-3"
          style={{ marginTop: "40px" }}
        >
          <div className="card-body">
            <h3 className="text-center">SCREEN</h3>
            <hr />
            <table
              className="table table-striped table-bordered"
              style={{ marginBottom: "40px" }}
            >
              <thead></thead>
              <tbody>
                {seats.map((seat, rowIndex) => (
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
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleBookShow()}
              >
                Book Seats
              </Button>
              <Typography style={{ marginLeft: "10px" }}>
                <FontAwesomeIcon icon={faRupeeSign} />
                500/
                <FontAwesomeIcon icon={faTicketAlt} />
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                style={{ float: "right" }}
                onClick={() => this.handleCancel()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Seatings;
