import React, { Component } from "react";
import cityService from "../../service/cityService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import CityTable from "../view/tables/cityTable";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import _ from "lodash";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import AutocompleteInput from "../common/autocompleteInput";
import { Button } from "@material-ui/core";

export class City extends Component {
  state = {
    pageTitle: "",
    allCities: [],
    cities: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    value: "",
  };

  componentDidMount() {
    cityService.getAllCities().then((res) => {
      let cities = [];
      res.data.map((city) => {
        city = { ...{ id: city.pincode }, ...city };
        cities.push(city);
      });
      this.setState({ cities });
      this.setState({ allCities: cities });
      console.log(this.state.cities);
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

  handleSuccess = (message) => {
    toast(message);
    window.location.reload();
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleDelete = (city) => {
    cityService.removeCity(city.id).then((res) => {
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  handleUpdate = (city) => {
    console.log(city);
    this.props.history.push({
      pathname: `/city/${city.id}/city-form`,
      state: { city: city },
    });
  };

  handleCitySelect = (event, city) => {
    let a = {};
    if (_.isNull(city)) {
      a = { ...this.state.allcities };
      this.setState({ cities: a });
    } else {
      a = [city];
      this.setState({ cities: a });
    }
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, allCities, cities } = this.state;

    const sorted = _.orderBy(cities, [sortColumn.path], [sortColumn.order]);

    const filteredCities = paginate(sorted, currentPage, pageSize);

    return { totalCount: allCities.length, data: filteredCities };
  };

  handleRole = () => {
    const role = localStorage.getItem("role");
    if (role === "ROLE_ADMIN") {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.handleCityForm()}
        >
          Add City
        </Button>
      );
    }
  };

  render() {
    const {
      pageTitle,
      pageSize,
      currentPage,
      sortColumn,
      allCities,
    } = this.state;

    const { totalCount, data: filteredCities } = this.getPagedData();

    return (
      <div className="container ">
        <div className="row ">
          <div className="col">
            {" "}
            <h3>{pageTitle}</h3>
            <p>Showing {totalCount} cities</p>
            {this.handleRole()}
          </div>
        </div>
        <div className="row mx-lg-n5" style={{ marginTop: "10px" }}>
          <div className="col py-3 px-lg-5  bg-light">
            <AutocompleteInput
              data={allCities}
              onCitySelect={this.handleCitySelect}
            />
            <CityTable
              cities={filteredCities}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onUpdate={this.handleUpdate}
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

export default City;
