import { Button, IconButton } from "@material-ui/core";
import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";
import { InfoTwoTone } from "@material-ui/icons";

export class CityTable extends Component {
  handleRoleForUpdate = () => {
    if (localStorage.getItem("role") === "ROLE_ADMIN") {
      return {
        key: "update",
        content: (city) => (
          <Button
            variant="contained"
            color="primary"
            size="small"
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
            size="small"
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
        <div>
          <Link
            to={{
              pathname: `/city/${city.id}/theaters`,
              state: { city },
            }}
          >
            {city.cityName}
          </Link>
          <IconButton
            color="primary"
            style={{ float: "right" }}
            onClick={() => this.props.onCityInfoSelect(city)}
          >
            <InfoTwoTone />
          </IconButton>
        </div>
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
