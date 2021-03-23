import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../../common/card";

export class CustomerCard extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      type: "title",
    },
    { path: "userName", label: "Username", type: "subTitle" },
    { path: "email", label: "Email", type: "subTitle" },
    { path: "phoneNo", label: "Phone Number", type: "subTitle" },
    {
      key: "update",
      content: (user) => (
        <Button
          variant="contained"
          color="primary"
          //   onClick={() => this.props.onShowClick(movie)}
        >
            Edit Details
        </Button>
      ),
      type: "button",
    },
  ];
  render() {
    const { user } = this.props;
    let data = [];
    data.push(user);
    return (
      <div>
        <Card columns={this.columns} data={data} />
      </div>
    );
  }
}

export default CustomerCard;