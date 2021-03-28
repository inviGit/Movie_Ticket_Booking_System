import { Button, IconButton } from "@material-ui/core";
import { InfoTwoTone } from "@material-ui/icons";
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
            size="small"
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
          size="small"
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
        <div>
          <Link
            to={{
              pathname: `/theater/${theater.id}/movies`,
            }}
          >
            {theater.theaterName}
          </Link>
          <IconButton
            color="primary"
            style={{float:"right"}}
            onClick={() => this.props.onTheaterInfoSelect(theater)}

          >
            <InfoTwoTone/>
          </IconButton>
        </div>
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
