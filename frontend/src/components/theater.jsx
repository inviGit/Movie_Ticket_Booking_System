import React, { Component } from "react";
import TheaterTable from "./tables/theaterTable";
import cityService from "../service/cityService";
import theaterService from "../service/theaterService";
import vendorService from "../service/vendorService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import _ from "lodash";

export class Theaters extends Component {
  state = {
    pageTitle: "WELCOME",
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
          console.log(res);
          localStorage.setItem("userId", res.data.id);
          this.setState({ theaters: res.data.theaters });
          this.setState({ pageTitle: "Theaters under vendor" });
        });
    } else {
      try {
        const cityId = this.props.match.params.cityId;
        cityService.getCity(cityId).then((res) => {
          this.setState({ theaters: res.data.theaters });
          this.setState({ pageTitle: `Theaters in city  ${res.data.pincode}` });
        });
      } catch (error) {
        theaterService.getAllTheaters().then((res) => {
          this.setState({ theaters: res.data });
          this.setState({ pageTitle: "All theater" });
        });
      }
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
      pathname: `/theater-form`,
    });
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
    const { pageTitle, pageSize, currentPage, sortColumn } = this.state;


    const { totalCount, data: theaters } = this.getPagedData();

    return (
      <div className="container">
        
        
          <h1>{pageTitle}</h1>
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
    );
  }
}

export default Theaters;
