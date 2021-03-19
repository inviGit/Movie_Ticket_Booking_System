import React, { Component } from "react";
import Service from "../service/AdminService";  

class Seat extends Component {
  state = {
    seats: {
      array:[]
    }
  };

  componentDidMount = () => {
    Service.getSeats().then((res) => {
      console.log(res);
      this.setState({ seats: res.data });
      console.log(this.state.seats);
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.seats !== nextState.seats;
  }

  checkCheck = (rowIndex, colIndex) => {
    console.log("clicked");
    let array = [...this.state.seats.array];
    let seatRow = array[rowIndex];
    seatRow[colIndex] = 1;
    array[rowIndex] = seatRow;
    this.setState({ array });
  };

  handleSubmit = () => {
    console.log(this.state.seats);
    Service.updateSeats(this.state.seats);
  };

  render() {
    return (
      <div>
        <table className="table table-striped table-bordered">
          <thead></thead>
          <tbody>
            {this.state.seats.array.map((seat, rowIndex) => (
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
                        onChange={() => this.checkCheck(rowIndex, colIndex)}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={this.handleSubmit}>submit</button>

      </div>
    );
  }
}

export default Seat;
