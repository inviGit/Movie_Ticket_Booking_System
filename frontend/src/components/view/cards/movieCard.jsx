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
        src="https://picsum.photos/200/200/"
        className="card-img-top"
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
        <Link  className="text-dark" to={`/movie/${movie.id}`}>
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
