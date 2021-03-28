import { Button } from "@material-ui/core";
import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

export class ShowTable extends Component {
  handleRoleForDelete = () => {
    if (localStorage.getItem("role") === "ROLE_VENDOR") {
      return {
        key: "delete",
        content: (show) => (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => this.props.onDelete(show)}
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
      path: "showTime",
      label: "Show Time",
      content: (show) => (
        <Link
          to={{
            pathname: `/show/${show.id}/seatings`,
            state: { movieId: this.props.movieId },
          }}
        >
          {show.showTime}
        </Link>
      ),
    },
    { path: "showDate", label: "Show Date" },
    this.handleRoleForDelete(),
  ];
  render() {
    const { shows, onSort, sortColumn } = this.props;

    return (
      <div>
        <Table
          columns={_.compact(this.columns)}
          data={shows}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default ShowTable;
