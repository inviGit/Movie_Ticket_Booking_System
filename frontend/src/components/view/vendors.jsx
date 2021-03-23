import React, { Component } from "react";
import VendorTable from "./tables/vendorTable";
import vendorService from "../../service/vendorService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import _ from "lodash";

export class Vendor extends Component {
  state = {
    pageTitle: "WELCOME",
    vendors: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    if (localStorage.getItem("role") !== "ROLE_ADMIN") {
      this.props.history.push("/not-authorized");
      this.setState({ pageTitle: "Vendors List" });
    } else {
      vendorService.getAllVendors().then((res) => {
        console.log(res);
        this.setState({ vendors: res.data });
      });
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      vendors: allVendors,
    } = this.state;

    const sorted = _.orderBy(allVendors, [sortColumn.path], [sortColumn.order]);

    const vendors = paginate(sorted, currentPage, pageSize);

    return { totalCount: allVendors.length, data: vendors };
  };

  handleVendorForm =()=>{
        this.props.history.push("/vendor-form")
  }

  handleRole = () => {
    const role = localStorage.getItem("role");
    if (role === "ROLE_ADMIN") {
      return (
        <button
          className="btn btn-success"
          onClick={() => this.handleVendorForm()}
        >
          Add Vendor
        </button>
      );
    }
  };

  render() {
    const { pageTitle, pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data: vendors } = this.getPagedData();
    return (
      <div className="container">
        <h1>{pageTitle}</h1>
        <p>Showing {totalCount} vendors</p>
        {this.handleRole()}
        <VendorTable
          vendors={vendors}
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
    );
  }
}

export default Vendor;
