import React, { Component } from "react";
import movieService from "../service/movieService";
import showService from "../service/showService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";

import _ from "lodash";
import ShowTable from "./tables/showTable";

export class Shows extends Component {
  state = {
    movieId: "",
    pageTitle: "",
    shows: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    movieService.getMovie(this.props.match.params.movieId).then((res) => {
      console.log(res);
      this.setState({ movieId: res.data.id });
      this.setState({ shows: res.data.shows });
      this.setState({pageTitle:"Movie Shows"})
    });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleShowForm = () => {
    this.props.history.push({
      pathname: `/movie/${this.state.movieId}/show-form`,
    });
  };
  handleRole = () => {
    const role = localStorage.getItem("role");
    if (role === "ROLE_VENDOR") {
      return (
        <button
          className="btn btn-success"
          onClick={() => this.handleShowForm()}
        >
          Add Show
        </button>
      );
    }
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, shows: allshows } = this.state;

    const sorted = _.orderBy(allshows, [sortColumn.path], [sortColumn.order]);

    const shows = paginate(sorted, currentPage, pageSize);

    return { totalCount: allshows.length, data: shows };
  };

  render() {
    const { pageTitle, pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: shows } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2"></div>
        <div className="col">
          <h1>{pageTitle}</h1>
          <p>Showing {totalCount} shows</p>
          {this.handleRole()}
          <ShowTable
            shows={shows}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Shows;
