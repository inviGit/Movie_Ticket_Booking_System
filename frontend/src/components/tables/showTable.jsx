import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Table from './../common/table';


export class ShowTable extends Component {
      columns = [
            {
              path: "showTime", 
              label: "Show Time",
              content: (show) => <Link to={{
                pathname: `/show/${show.id}/seatings`,
              }}
              >{show.showTime}</Link>,
            },
            { path: "showDate", label: "Show Date" },
          ];
  render() {
      const { shows, onSort, sortColumn } = this.props;

    return (
      <div>
        <Table
          columns={this.columns}
          data={shows}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default ShowTable;
