import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import seatingService from "../../../service/seatingService";
import { toast } from "react-toastify";

export class BookingConfirmation extends Component {
  constructor(props) {
    super(props);
    const showId = props.match.params.showId;
    const customerId = props.location.state.customerId;
    const selectedSeats = props.location.state.selectedSeats;

    this.state = { showId, customerId, selectedSeats };
  }

  handleSuccess = (message, userId) => {
    toast(message);
    this.props.history.replace(`/customer/profile`);
  };

  handleFailure = (message) => {
    toast(message);
  };


  handleProceed=()=>{
    const {showId, customerId, selectedSeats} = this.state;
    seatingService
        .bookSeats(showId, customerId, selectedSeats)
        .then((res) => {
          console.log(res);
          const { data } = res;
          data.status === 1
            ? this.handleSuccess(data.message)
            : this.handleFailure(data.message);
        });
  }

  OutlinedCard = () => {
    const { selectedSeats } = this.state;
    const classes = makeStyles((theme) => ({
      root: {
        minWidth: 275,
        "& > *": {
          margin: theme.spacing(1),
        },
      },
      bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
    }));
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="initial" gutterBottom>
            Booking Confirmation
          </Typography>
          <Typography variant="h5" component="h2"></Typography>
          <Typography className={classes.pos} color="textSecondary">
            Selected Seats:
          </Typography>
          {Object.keys(selectedSeats).map(function (x) {
            return (
              <div key={x}>
                <Typography variant="h5" component="h2">
                  {selectedSeats[x]}
                </Typography>
              </div>
            );
          })}
          <Typography
            variant="subtitle1"
            component="p"
            style={{ marginTop: "10px" }}
          >
            Price:
            <FontAwesomeIcon
              icon={faRupeeSign}
              style={{ marginLeft: "10px" }}
            />
            {_.size(selectedSeats) * 500}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={()=>this.handleProceed()}>
            Proceed To Payment
          </Button>
          <Button variant="contained" color="secondary" onClick={()=>this.handleCancel()}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    );
  };

  handleCancel=()=>{
    console.log(this.props);
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="container" style={{ marginTop: "20px" }}>
        {this.OutlinedCard()}{" "}
      </div>
    );
  }
}

export default BookingConfirmation;
