import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import customerService from "../../../service/customerService";
import UserCard from "../cards/userCard";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TicketPage from "../page/ticketPage";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import { Button, Grid } from "@material-ui/core";
import DeleteDialog from "../alertDialog/deleteDialog";
import {
  FacebookMessengerShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
} from "react-share";
import Paper from "@material-ui/core/Paper";
import {
  FacebookMessengerIcon,
  WhatsappIcon,
  EmailIcon,
  TelegramIcon,
} from "react-share";

export class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  state = {
    userId: "",
    userName: "",
    user: [],
    tickets: [],
    sharedTickets: [],
    openCancelBookingDialog: false,
    isExpanded: "",
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    if (!_.isNull(localStorage.getItem("username"))) {
      if (localStorage.getItem("role") !== "ROLE_CUSTOMER") {
        this.props.history.replace("/not-authorized");
      }
      const userName = localStorage.getItem("username");
      let user = {};
      let sharedTickets = [];
      customerService.getCustomerByUserName(userName).then((res) => {
        user = { userName: userName, ...res.data };
        res.data.tickets.map((ticket) => {
          sharedTickets.push({
            "Seat Number: ": ticket.seatNo,
            "Show Time: ": ticket.show.showTime,
            "Show Date: ": ticket.show.showDate,
          });
        });
        this.setState({
          userId: res.data.id,
          userName,
          user,
          tickets: res.data.tickets,
          sharedTickets,
        });
      });
    } else {
      toast("Not Logged In");
    }
  }

  handlePanel1 = (panel) => {
    this.state.isExpanded === panel
      ? this.setState({ isExpanded: false })
      : this.setState({ isExpanded: panel });
  };

  getPagedData = () => {
    const { pageSize, currentPage, tickets } = this.state;

    const filteredTickets = paginate(tickets, currentPage, pageSize);

    return { totalCount: _.size(tickets), data: filteredTickets };
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleEdit = (user) => {
    this.props.history.push({
      pathname: `/customer/${user.id}/customer-form`,
      state: { user: user },
    });
  };

  handleCancelBooking = () => {
    this.setState({ openCancelBookingDialog: true });
  };

  handleCancellingDialogClose = () => {
    this.setState({ openCancelBookingDialog: false });
  };

  handleCancellingDialogClose = () => {
    const { tickets, userId } = this.state;
    this.props.history.push({
      pathname: `/customer/${userId}/cancel-booking`,
      state: { tickets: tickets },
    });
    this.setState({ openCancelBookingDialog: false });
  };

  render() {
    const {
      user,
      openCancelBookingDialog,
      tickets,
      sharedTickets,
      pageSize,
      currentPage,
    } = this.state;
    const { totalCount, data: filteredTickets } = this.getPagedData();
    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        <DeleteDialog
          open={openCancelBookingDialog}
          title={`Proceed to booking cancellation?`}
          content={`Individual ticket cancellation is not allowed. All tickets related to particular show will get cancelled`}
          onCancel={this.handleCancellingDialogClose}
          onConfirm={this.handleCancellingDialogClose}
        />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={4}></Grid>
          <Grid item xs={4} style={{ textAlign: "center" }}>
            {!_.isEmpty(user) ? (
              <UserCard user={user} onEdit={this.handleEdit} />
            ) : (
              <h1></h1>
            )}
          </Grid>
          <Grid item xs={4}></Grid>

          <Grid item xs={2}></Grid>

          <Grid item xs={6}>
            {_.size(tickets) > 0 ? (
              <div style={{ float: "right" }}>
                <span
                  className="nav-item badge badge-dark"
                  style={{
                    marginRight: "10px",
                    marginLeft: "30px",
                    fontSize: "16px",
                  }}
                >
                  Share Tickets:
                </span>
                <FacebookMessengerShareButton
                  title="Movie Tickets"
                  url={JSON.stringify(sharedTickets)}
                >
                  <FacebookMessengerIcon
                    size={46}
                    round={true}
                  ></FacebookMessengerIcon>
                </FacebookMessengerShareButton>
                <WhatsappShareButton
                  title="Movie Tickets"
                  url={JSON.stringify(sharedTickets)}
                >
                  <WhatsappIcon size={46} round={true}></WhatsappIcon>
                </WhatsappShareButton>
                <EmailShareButton
                  subject="Movie Tickets"
                  body={JSON.stringify(sharedTickets)}
                  url={" "}
                >
                  <EmailIcon size={46} round={true}></EmailIcon>
                </EmailShareButton>
                <TelegramShareButton
                  title="Movie Tickets"
                  url={JSON.stringify(sharedTickets, undefined, 4)}
                >
                  <TelegramIcon size={46} round={true}></TelegramIcon>
                </TelegramShareButton>
              </div>
            ) : (
              <h1></h1>
            )}
          </Grid>

          <Grid item xs={2}></Grid>

          <Grid item xs={8}>
            <Accordion
              style={{ marginTop: "20px" }}
              expanded={this.state.isExpanded === "panel1"}
              onChange={() => this.handlePanel1("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography>Booked Tickets</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ flexGrow: "1", marginTop: "20px" }}>
                  <Grid container>
                    {!_.isEmpty(user) ? (
                      filteredTickets.map((ticket) => {
                        return (
                          <Grid key={ticket.id} item xs={3}>
                            <TicketPage ticket={ticket} />
                          </Grid>
                        );
                      })
                    ) : (
                      <h1>No tickets</h1>
                    )}
                  </Grid>
                </div>
              </AccordionDetails>
              <AccordionDetails>
                <div>
                  <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={this.handleCancelBooking}
                  >
                    Cancel Booking
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CustomerProfile;
