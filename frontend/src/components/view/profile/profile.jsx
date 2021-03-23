import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import customerService from "../../../service/customerService";
import CustomerCard from "../cards/customerCard";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TicketPage from "../page/ticketPage";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import { Button } from "@material-ui/core";

export class Profile extends Component {
  state = {
    userId: "",
    userName: "",
    user: {},
    tickets: {},
    isExpanded: "",
    pageSize: 9,
    currentPage: 1,
  };

  componentDidMount() {
    if (!_.isUndefined(localStorage.getItem("username"))) {
      const userId = this.props.match.params.userId;
      const userName = localStorage.getItem("username");
      let user = {};
      customerService.getCustomer(userId).then((res) => {
        user = { userName: userName, ...res.data };
        this.setState({ userId, userName, user, tickets: res.data.tickets });
        console.log(this.state.user);
      });
    } else {
      toast("Not Logged In");
    }
  }

  handleChange = (panel) => {
    console.log(this.state.tickets);

    this.state.isExpanded === panel
      ? this.setState({ isExpanded: false })
      : this.setState({ isExpanded: panel });
  };

  getPagedData = () => {
    const { pageSize, currentPage, tickets } = this.state;

    const filteredTickets = paginate(tickets, currentPage, pageSize);

    return { totalCount: filteredTickets.length, data: filteredTickets };
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleTicketSelect=(ticket)=>{
        console.log(ticket);
  }

  render() {
    const { pageSize, currentPage } = this.state;
    const { totalCount, data: filteredTickets } = this.getPagedData();
    console.log(pageSize, currentPage, totalCount);
    return (
      <div className="container" style={{ width: "500", marginTop: "20px" }}>
        {!_.isEmpty(this.state.user) ? (
          <CustomerCard user={this.state.user} />
        ) : (
          <h1>bye</h1>
        )}
        <Accordion
          style={{ width: "500", marginTop: "20px" }}
          expanded={this.state.isExpanded === "panel1"}
          onChange={() => this.handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Booked Tickets</Typography>
            <Button variant="contained" size="small" color="secondary" style={{marginLeft:"20px"}}>
              see all
            </Button>
          </AccordionSummary>
          <AccordionDetails>
            {!_.isEmpty(this.state.user) ? (
              filteredTickets.map((ticket) => {
                return (
                  <div key={ticket.id} style={{ width: 100 }} onClick={()=>this.handleTicketSelect(ticket)}>
                    <TicketPage ticket={ticket} />
                  </div>
                );
              })
            ) : (
              <h1>No tickets</h1>
            )}
          </AccordionDetails>
        </Accordion>
        <div>
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Profile;
