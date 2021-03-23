import React, { Component } from "react";
import Page from "../../common/page";

export class TheaterPage extends Component {
  columns = [
    {
      path: "theaterName",
      label: "Name",
      type: "title",
    },
    { path: "theaterAddress", label: "Address", type: "subTitle" }
  ];
  render() {
    const { theater } = this.props;
    console.log(theater);
    return (
      <div style={{ marginTop: "10px" }}>
        <Page columns={this.columns} data={theater} />
      </div>
    );
  }
}

export default TheaterPage;
