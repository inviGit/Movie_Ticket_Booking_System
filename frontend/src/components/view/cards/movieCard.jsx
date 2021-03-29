import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../../common/card";

export class MovieCard extends Component {
  columns = [
    {
      key: "image",
      content: () => (
        <img
          src="https://images.unsplash.com/photo-1594827768989-e6acf749aa1c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          className="card-img-top"
          style={{ height: "200px", width: "200px" }}
          alt="..."
        />
      ),
      type: "image",
    },
    {
      path: "movieName",
      label: "Name",
      type: "title",
      content: (movie) => (
        <Link className="text-dark" to={`/movie/${movie.id}`}>
          {/* <FontAwesomeIcon icon={faFilm} /> */}
          <h5 className="card-title">{movie.movieName}</h5>
        </Link>
      ),
    },
    { path: "language", label: "Language", type: "subTitle" },
    { path: "genre", label: "Genre", type: "subTitle" },
    { path: "activeStatus", label: "Active status", type: "boolean" },
    {
      key: "update",
      content: (movie) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.props.onShowClick(movie)}
        >
          View Show's
        </Button>
      ),
      type: "button",
    },
  ];
  render() {
    const { movies } = this.props;
    return (
      <div>
        <Card columns={this.columns} data={movies} />
      </div>
    );
  }
}

export default MovieCard;
