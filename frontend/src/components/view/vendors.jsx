import React, { Component } from "react";
import VendorTable from "./tables/vendorTable";
import vendorService from "../../service/vendorService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import _ from "lodash";
import AutocompleteInput from "../common/autocompleteInput";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";

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

  handleTheaterSelect = (event, theater) => {
    console.log(event);
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
      <div className="container">
        <div className="row ">
          <div className="col">
            {" "}
            <h3>{pageTitle}</h3>
            <p>Showing {totalCount} vendors</p>
            {this.handleRole()}
          </div>
        </div>
        <div className="row mx-lg-n5" style={{ marginTop: "10px" }}>
          <div className="col py-3 px-lg-5  bg-light">
            <AutocompleteInput
              data={allVendors}
              onItemSelect={this.handleTheaterSelect}
            />
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
        </div>
      </div>
    );
  }
}

export default Vendor;
