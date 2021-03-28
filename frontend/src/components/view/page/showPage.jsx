import React, { Component } from "react";
import Page from "../../common/page";

export class ShowPage extends Component {
  columns = [
    {
      path: "showDate",
      label: "Show Date",
      type: "title",
    },
    { path: "showTime", label: "Show Time", type: "subTitle" },
  ];
  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div style={{ marginTop: "10px" }}>
        <Page columns={this.columns} data={data} />
      </div>
    );
  }
}

export default ShowPage;
