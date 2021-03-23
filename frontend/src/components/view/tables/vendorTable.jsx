import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

export class VendorTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (Vendor) => (
        <Link
          to={{
            pathname: `/vendor/:vendorId`,
          }}
        >
          {Vendor.name}
        </Link>
      ),
    },
    { path: "vendorEmail", label: "Email" },
    { path: "phoneNo", label: "Phone Number" },
  ];

  render() {
    const { vendors, onSort, sortColumn } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          data={vendors}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default VendorTable;
