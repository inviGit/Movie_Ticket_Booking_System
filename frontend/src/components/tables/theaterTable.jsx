import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./../common/table";

export class TheaterTable extends Component {
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
  ];

  render() {
    const { theaters, onSort, sortColumn } = this.props;

    return (
      <div>
        <Table
          columns={this.columns}
          data={theaters}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default TheaterTable;
