import React, { Component } from "react";
import Page from "../../common/page";

export class MoviePage extends Component {
  columns = [
    {
      path: "movieName",
      label: "Name",
      type: "title",
    },
    { path: "actor", label: "Actor", type: "detail" },
    { path: "actress", label: "Actress", type: "detail" },
    { path: "director", label: "Director", type: "detail" },
    { path: "language", label: "Language", type: "subTitle" },
    { path: "genre", label: "Genre", type: "subTitle" },
    { path: "activeStatus", label: "Active status", type: "boolean" }
  ];
  render() {
    const { movie } = this.props;
    return (
      <div style={{ marginTop: "10px" }}>
        <Page columns={this.columns} data={movie} />
      </div>
    );
  }
}

export default MoviePage;
