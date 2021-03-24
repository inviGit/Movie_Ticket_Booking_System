import React, { Component } from "react";
import cityService from "../../service/cityService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import CityTable from "../view/tables/cityTable";
import _ from "lodash";
import { toast } from "react-toastify";
import AutocompleteInput from "../common/autocompleteInput";
import { Button, Grid, Paper } from "@material-ui/core";

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
          style={{ marginBottom: "20px" }}
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
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={10}>
            <Paper>
              {" "}
              <AutocompleteInput
                data={allCities}
                label={"cityName"}
                onItemSelect={this.handleCitySelect}
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper>
              <div className="col py-3 px-lg-5  bg-light">
                {this.handleRole()}
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
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default City;
