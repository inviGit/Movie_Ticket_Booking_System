import React, { Component } from "react";
import AlertDialog from "../../common/alertDialog";
import { Button } from "@material-ui/core";
import _ from "lodash";

export class TheaterinfoDialog extends Component {
  data = [
    {
      key: "title",
      title: "Theater Details",
    },
    {
      key: "content",
      content: `Theater Name: ${this.props.data.theaterName}`,
    },
    {
      key: "content2",
      content: `Theater Address: ${this.props.data.theaterAddress}`,
    },
    {
      key: "content3",
      content: `Available Movies: ${_.size(this.props.data.movies)}`,
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
    const { open, data } = this.props;
    console.log(data)
    return (
      <div>
        <AlertDialog open={open} data={this.data} />
      </div>
    );
  }
}

export default TheaterinfoDialog;
