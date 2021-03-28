import { Button } from "@material-ui/core";
import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

export class MovieTable extends Component {
  handleRoleForUpdate = () => {
    if (localStorage.getItem("role") === "ROLE_VENDOR") {
      return {
        key: "update",
        content: (movie) => (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => this.props.onUpdate(movie)}
          >
            Update
          </Button>
        ),
      };
    } else {
      return null;
    }
  };
  handleRoleForDelete = () => {
    if (localStorage.getItem("role") === "ROLE_VENDOR") {
      return {
        key: "delete",
        content: (movie) => (
          <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </Button>
        ),
      };
    } else {
      return null;
    }
  };

  columns = [
    {
      path: "movieName",
      label: "Name",
      content: (movie) => (
        <Link
          to={{
            pathname: `/movie/${movie.id}/shows`,
          }}
        >
          {movie.movieName}
        </Link>
      ),
    },
    { path: "actor", label: "Actor" },
    { path: "actress", label: "Actress" },
    { path: "director", label: "Director" },
    { path: "language", label: "Language" },
    { path: "genre", label: "Genre" },
    { path: "activeStatus", label: "Active status" },
    this.handleRoleForUpdate(),
    this.handleRoleForDelete(),
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <div>
        <Table
          columns={_.compact(this.columns)}
          data={movies}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default MovieTable;
