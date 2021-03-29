import { Button, IconButton } from "@material-ui/core";
import { InfoTwoTone } from "@material-ui/icons";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

export class VendorTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (vendor) => (
        <div>
          <h6>
            {vendor.name}
            <IconButton
              color="primary"
              className="badge"
              style={{ float: "right" }}
              size="small"
              onClick={() => this.props.onVendorSelect(vendor)}
            >
              <InfoTwoTone />
            </IconButton>
          </h6>
        </div>
      ),
    },
    { path: "vendorEmail", label: "Email" },
    { path: "phoneNo", label: "Phone Number" },
    {
      key: "delete",
      content: (vendor) => (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => this.props.onDelete(vendor)}
        >
          Delete
        </Button>
      ),
    },
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
