import React, { Component } from "react";
import cityService from "../../service/cityService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import CityTable from "../view/tables/cityTable";
import _ from "lodash";
import { toast } from "react-toastify";
import AutocompleteInput from "../common/autocompleteInput";
import { Button, Grid, Paper } from "@material-ui/core";
import DeleteDialog from "./alertDialog/deleteDialog";
import { CityInfoDialog } from "./alertDialog/cityInfoDialog";

export class City extends Component {
  state = {
    pageTitle: "",
    allCities: [],
    cities: [],
    selectedCity: "",
    openDeleteDialog: false,
    openCityInfoDialog: false,
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
      this.setState({ allCities: cities });
    });
  }

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

  handleAutoCompleteSelect = (event, city) => {
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSuccess = (message) => {
    window.location.reload();
    toast(message);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleCityForm = () => {
    this.props.history.push("/city-form");
  };

  handleDelete = (city) => {
    this.setState({ selectedCity: city, openDeleteDialog: true });
  };

  handleDeleteDialogClose = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleDeleteDialogConfirm = () => {
    cityService.removeCity(this.state.selectedCity.id).then((res) => {
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

  handleCityInfoSelect = (city) => {
    this.setState({ selectedCity: city, openCityInfoDialog: true });
  };

  handleCityInfoDialogClose = () => {
    this.setState({ selectedCity: "", openCityInfoDialog: false });
  };

  render() {
    const {
      pageTitle,
      allCities,
      selectedCity,
      openDeleteDialog,
      openCityInfoDialog,
      sortColumn,
      pageSize,
      currentPage,
    } = this.state;

    const { totalCount, data: filteredCities } = this.getPagedData();

    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        {!_.isEmpty(selectedCity) && !_.isNull(selectedCity) ? (
          <CityInfoDialog
            open={openCityInfoDialog}
            data={selectedCity}
            onDialogClose={this.handleCityInfoDialogClose}
          />
        ) : (
          <h1></h1>
        )}

        <DeleteDialog
          open={openDeleteDialog}
          title={`Delete City?`}
          content={`This action is irreversible. City will be deleted permanently`}
          onCancel={this.handleDeleteDialogClose}
          onConfirm={this.handleDeleteDialogConfirm}
        />

        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={10}>
            <Paper>
              {" "}
              <AutocompleteInput
                data={allCities}
                label={"cityName"}
                onItemSelect={this.handleAutoCompleteSelect}
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper>
              <div className="col py-3 px-lg-5  bg-light">
                <p>{pageTitle}</p>
                {this.handleRole()}
                <CityTable
                  cities={filteredCities}
                  sortColumn={sortColumn}
                  onCityInfoSelect={this.handleCityInfoSelect}
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
