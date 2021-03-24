import React, { Component } from "react";
import VendorTable from "./tables/vendorTable";
import vendorService from "../../service/vendorService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import _ from "lodash";
import AutocompleteInput from "../common/autocompleteInput";
import { toast } from "react-toastify";
import { Button, Grid, Paper } from "@material-ui/core";

export class Vendor extends Component {
  state = {
    allVendors: [],
    vendors: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    pageTitle: "WELCOME",
  };

  componentDidMount() {
    if (localStorage.getItem("role") !== "ROLE_ADMIN") {
      this.props.history.push("/not-authorized");
      this.setState({ pageTitle: "Vendors List" });
    } else {
      vendorService.getAllVendors().then((res) => {
        console.log(res);
        this.setState({ vendors: res.data, allVendors: res.data });
      });
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleVendorSelect = (event, vendor) => {
    let a = {};
    if (_.isNull(vendor)) {
      a = { ...this.state.allVendors };
      this.setState({ vendors: a });
    } else {
      a = [vendor];
      this.setState({ vendors: a });
    }
  };

  handleSuccess = (message) => {
    toast(message);
    window.location.reload();
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleDelete = (vendor) => {
    vendorService.removeVendor(vendor.id).then((res) => {
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  handleRole = () => {
    const role = localStorage.getItem("role");
    if (role === "ROLE_ADMIN") {
      return (
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => this.handleVendorForm()}
        >
          Add Vendor
        </Button>
      );
    }
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, vendors } = this.state;

    const sorted = _.orderBy(vendors, [sortColumn.path], [sortColumn.order]);

    const filteredVendors = paginate(sorted, currentPage, pageSize);

    return { totalCount: vendors.length, data: filteredVendors };
  };

  handleVendorForm = () => {
    this.props.history.push("/vendor-form");
  };

  render() {
    const {
      allVendors,
      pageTitle,
      pageSize,
      currentPage,
      sortColumn,
    } = this.state;

    const { totalCount, data: filteredVendors } = this.getPagedData();
    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={10}>
            <Paper>
              {" "}
              <AutocompleteInput
                data={allVendors}
                label={"name"}
                onItemSelect={this.handleVendorSelect}
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            ]
            <div className="col py-3 px-lg-5  bg-light">
              {this.handleRole()}
              <VendorTable
                vendors={filteredVendors}
                sortColumn={sortColumn}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Vendor;
