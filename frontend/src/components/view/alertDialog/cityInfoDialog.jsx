import React, { Component } from "react";
import AlertDialog from "../../common/alertDialog";
import { Button } from "@material-ui/core";
import _ from "lodash";

export class CityInfoDialog extends Component {
  data = [
    {
      key: "title",
      title: "City Details",
    },
    {
      key: "content",
      content: `Pincode: ${this.props.data.pincode}`,
    },
    {
      key: "content2",
      content: `City Name: ${this.props.data.cityName}`,
    },
    {
      key: "content3",
      content: `State Name: ${this.props.data.stateName}`,
    },
    {
      key: "content4",
      content: `Number of theaters in city: ${_.size(
        this.props.data.theaters
      )}`,
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
    console.log(data);
    return (
      <div>
        <AlertDialog open={open} data={this.data} />
      </div>
    );
  }
}

export default CityInfoDialog;
