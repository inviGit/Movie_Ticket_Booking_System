import React, { Component } from "react";
import cityService from "../service/cityService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import CityTable from "./tables/cityTable";
import _ from "lodash";

export class City extends Component {
  state = {
    pageTitle: "",
    cities: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    cityService.getAllCities().then((res) => {
      let cities = [];
      res.data.map((city) => {
        city = { ...{ id: city.pincode }, ...city };
        cities.push(city);
      });
      this.setState({ cities });
    });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleCityForm = () => {
    this.props.history.push("/city-form");
  };

  handleRole = () => {
    const role = localStorage.getItem("role");
    if (role === "ROLE_ADMIN") {
      return (
        <button
          className="btn btn-success"
          onClick={() => this.handleCityForm()}
        >
          Add City
        </button>
      );
    }
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, cities: allCities } = this.state;

    const sorted = _.orderBy(allCities, [sortColumn.path], [sortColumn.order]);

    const cities = paginate(sorted, currentPage, pageSize);

    return { totalCount: allCities.length, data: cities };
  };

  render() {
    const { pageTitle, pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data: cities } = this.getPagedData();

    return (
      <div className="container ">
        <h1>{pageTitle}</h1>
        <p>Showing {totalCount} cities</p>
        {this.handleRole()}
        <CityTable
          cities={cities}
          sortColumn={sortColumn}
          onLike={this.handleLike}
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

export default City;
