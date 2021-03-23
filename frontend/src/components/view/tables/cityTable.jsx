import { Button } from "@material-ui/core";
import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

export class CityTable extends Component {
  handleRoleForUpdate = () => {
    if (localStorage.getItem("role") === "ROLE_ADMIN") {
      return {
        key: "update",
        content: (city) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.onUpdate(city)}
          >
            Update
          </Button>
        ),
      };
    } else {
      return null;
    }
  };
  handleRoleForDelete = () => {
    if (localStorage.getItem("role") === "ROLE_ADMIN") {
      return {
        key: "delete",
        content: (city) => (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.props.onDelete(city)}
          >
            Delete
          </Button>
        ),
      };
    } else {
      return null;
    }
  };

  columns = [
    {
      path: "cityName",
      label: "cityName",
      content: (city) => (
        <Link
          to={{
            pathname: `/city/${city.id}/theaters`,
            state: { city },
          }}
        >
          {city.cityName}
        </Link>
      ),
    },
    { path: "pincode", label: "Pincode" },
    { path: "stateName", label: "State" },
    this.handleRoleForUpdate(),
    this.handleRoleForDelete(),
  ];

  render() {
    const { cities, onSort, sortColumn } = this.props;
    return (
      <div>
        <Table
          columns={_.compact(this.columns)}
          data={cities}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default CityTable;
