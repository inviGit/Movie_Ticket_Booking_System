import React, { Component } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import theaterService from "../service/theaterService";
import _ from "lodash";
import TheaterTable from "./tables/theaterTable";
import vendorService from "../service/vendorService";

export class Theaters extends Component {
  state = {
    vendor: [],
    theaters: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    if (localStorage.getItem("role") === "ROLE_VENDOR") {
      vendorService
        .getVendorByUserName(localStorage.getItem("username"))
        .then((res) => {
          this.setState({ vendor: res.data });
          this.setState({ theaters: res.data.theaters });
        });
    } else {
      theaterService.getAllTheaters().then((res) => {
        this.setState({ theaters: res.data });
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
      theaters: allTheaters,
    } = this.state;

    const sorted = _.orderBy(
      allTheaters,
      [sortColumn.path],
      [sortColumn.order]
    );

    const theaters = paginate(sorted, currentPage, pageSize);

    return { totalCount: allTheaters.length, data: theaters };
  };

  handleTheaterForm = () => {
        this.props.history.push({
            pathname: '/theater-form',
            state: { detail: this.state.vendor.id}
        })
  };

  handleRole = () => {
    const role = localStorage.getItem("role");
    if (role === "ROLE_VENDOR") {
      return (
        <button
          className="btn btn-success"
          onClick={() => this.handleTheaterForm()}
        >
          Add Theater
        </button>
      );
    }
  };

  render() {
    const { length: theaterCount } = this.state.theaters;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (theaterCount === 0) return <p>There are no theater in the database.</p>;

    const { totalCount, data: theaters } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2"></div>
        <div className="col">
          <p>Showing {totalCount} theaters</p>
          {this.handleRole()}
          <TheaterTable
            theaters={theaters}
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
    );
  }
}

export default Theaters;
