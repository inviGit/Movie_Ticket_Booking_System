import React, { Component } from "react";
import AlertDialog from "../../common/alertDialog";
import { Button } from "@material-ui/core";

export class VendorDialog extends Component {
  data = [
    {
      key: "title",
      title: "Vendor Details",
    },
    {
      key: "content",
      content: `Vendor Id: ${this.props.data.id}`,
    },
    {
      key: "content2",
      content: `Vendor Name: ${this.props.data.name}`,
    },
    {
      key: "content3",
      content: `Vendor vendorEmail: ${this.props.data.vendorEmail}`,
    },
    {
      key: "content4",
      content: `Vendor phoneNo: ${this.props.data.phoneNo}`,
    },
    {
      key: "action",
      action: (
        <div>
          <Button color="primary" onClick={this.props.onDialogClose}>
            Close
          </Button>
        </div>
      ),
    },
  ];

  render() {
    const { open } = this.props;
    return (
      <div>
        <AlertDialog open={open} data={this.data} />
      </div>
    );
  }
}

export default VendorDialog;
