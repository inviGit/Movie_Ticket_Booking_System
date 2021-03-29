import React, { Component } from "react";
import _ from "lodash";
import CustomerService from "../../service/customerService";
import AutocompleteInput from "./../common/autocompleteInput";
import { ShowPage } from "./page/showPage";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { DeleteDialog } from "./alertDialog/deleteDialog";
import SeatingService from "../../service/seatingService";
import { toast } from "react-toastify";

export class BookingCancellation extends Component {
  state = {
    userId: "",
    tickets: [],
    shows: [],
    selectedShowId: "",
    openCancelBookingDialog: false,
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;

    if (localStorage.getItem("role") !== "ROLE_CUSTOMER") {
      this.props.history.replace("/not-authorized");
    } else {
      if (_.isUndefined(this.props.location.state)) {
        console.log("is");
        CustomerService.getCustomer(userId).then((res) => {
          this.setState({ tickets: res.data.tickets, userId });
          this.handleTicketShow(res.data.tickets);
        });
      } else {
        let tickets = this.props.location.state.tickets;
        this.setState({ tickets, userId });
        this.handleTicketShow(tickets);
      }
    }
  }

  handleTicketShow = (tickets) => {
    let shows = [];
    tickets.map((t) => {
      if (
        _.findIndex(shows, (o) => {
          return _.isMatch(o, t.show);
        }) === -1
      ) {
        shows.push(t.show);
      }
    });
    this.setState({ shows });
  };

  handleSuccess = (message) => {
    toast(message);
    this.props.history.replace(`/customer/profile`);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleShowSelect = (show) => {
    this.setState({ selectedShowId: show.id, openCancelBookingDialog: true });
  };
  handleDialogClose = () => {
    this.setState({ openCancelBookingDialog: false });
  };

  handleDialogConfirm = () => {
    const { selectedShowId, userId } = this.state;
    SeatingService.cancelBooking(selectedShowId, userId).then((res) => {
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  render() {
    const { shows, openCancelBookingDialog } = this.state;

    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        <DeleteDialog
          open={openCancelBookingDialog}
          title={`Your booking will be cancelled?`}
          content={`Individual ticket cancellation is not allowed. All tickets related to this show will get cancelled`}
          onCancel={this.handleDialogClose}
          onConfirm={this.handleDialogConfirm}
        />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={3}></Grid>

          <Grid item xs={6}>
            <Paper style={{ textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                Select show to cancel
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={3}></Grid>

          {shows.map((show) => {
            return (
              <div key={show.id}>
                <Grid
                  item
                  xs={"auto"}
                  style={{ margin: "10px" }}
                  onClick={() => this.handleShowSelect(show)}
                >
                  <ShowPage data={show} onItemSelect={this.handleShowSelect} />
                </Grid>
              </div>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default BookingCancellation;
