import { Button } from "@material-ui/core";
import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

export class TheaterTable extends Component {
  handleRoleForUpdate = () => {
    if (localStorage.getItem("role") === "ROLE_VENDOR") {
      return {
        key: "update",
        content: (theater) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.onUpdate(theater)}
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
    if (localStorage.getItem("role") === "ROLE_VENDOR") {
      return {
        key: "delete",
        content: (theater) => (
          <Button
          variant="contained"
          color="secondary"
          onClick={() => this.props.onDelete(theater)}
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
      path: "theaterName",
      label: "Name",
      content: (theater) => (
        <Link
          to={{
            pathname: `/theater/${theater.id}/movies`,
          }}
        >
          {theater.theaterName}
        </Link>
      ),
    },
    { path: "theaterAddress", label: "Address" },
    this.handleRoleForUpdate(),
    this.handleRoleForDelete(),
  ];

  render() {
    const { theaters, onSort, sortColumn } = this.props;

    return (
      <div>
        <Table
          columns={_.compact(this.columns)}
          data={theaters}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default TheaterTable;
