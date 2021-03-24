import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import { Button, Grid, Paper } from "@material-ui/core";
import vendorService from "../../../service/vendorService";
import TheaterPage from "../page/theaterPage";
import VendorCard from "../cards/vendorCard";

export class VendorProfile extends Component {
  state = {
    vendorId: "",
    userName: "",
    vendor: {},
    theaters: {},
    isExpanded: "",
    pageSize: 3,
    currentPage: 1,
  };

  componentDidMount() {
    if (!_.isUndefined(localStorage.getItem("username"))) {
      if (localStorage.getItem("role") !== "ROLE_VENDOR") {
        this.props.history.push("/not-authorized");
      }
      // const vendorId = this.props.match.params.userId;
      const userName = localStorage.getItem("username");
      let vendor = {};
      vendorService.getVendorByUserName(userName).then((res) => {
        vendor = { userName: userName, ...res.data };
        this.setState({
          vendorId: res.data.id,
          userName,
          vendor,
          theaters: res.data.theaters,
        });
        console.log(this.state.user);
      });
    } else {
      toast("Not Logged In");
    }
  }

  handleChange = (panel) => {
    this.state.isExpanded === panel
      ? this.setState({ isExpanded: false })
      : this.setState({ isExpanded: panel });
  };

  getPagedData = () => {
    const { pageSize, currentPage, theaters } = this.state;

    const filteredTheaters = paginate(theaters, currentPage, pageSize);

    return { totalCount: theaters.length, data: filteredTheaters };
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleTicketSelect = (theater) => {
    console.log(theater);
  };

  handleEdit = (user) => {
    console.log(user);
    this.props.history.push({
      pathname: `/vendor/${user.id}/vendor-form`,
      state: { vendor: user },
    });
  };

  handleSeeAllTheater=()=>{
    this.props.history.push("/theaters")
  }

  render() {
    const { vendor, pageSize, currentPage } = this.state;
    const { totalCount, data: filteredTheaters } = this.getPagedData();
    console.log(pageSize, currentPage, totalCount);
    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}></Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            {!_.isEmpty(vendor) ? (
              <VendorCard user={vendor} onEdit={this.handleEdit} />
            ) : (
              <h1></h1>
            )}
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={8}>
            <Accordion
              style={{ marginTop: "20px", textAlign: "center" }}
              expanded={this.state.isExpanded === "panel1"}
              onChange={() => this.handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography>Theaters</Typography>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  style={{ marginLeft: "20px" }}
                  onClick={this.handleSeeAllTheater}
                >
                  see all
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                {!_.isEmpty(vendor) ? (
                  filteredTheaters.map((theater) => {
                    return (
                      <div
                        key={theater.id}
                        style={{ flexGrow: "1" }}
                        onClick={() => this.handleTicketSelect(theater)}
                      >
                        <TheaterPage theater={theater} />
                      </div>
                    );
                  })
                ) : (
                  <h1>No tickets</h1>
                )}
              </AccordionDetails>
              <AccordionDetails>
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default VendorProfile;
