import React, { Component } from "react";
import movieService from "../../service/movieService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import ShowTable from "../view/tables/showTable";
import _ from "lodash";
import { toast } from "react-toastify";
import showService from "../../service/showService";
import { Button } from "@material-ui/core";
import MoviePage from "./page/moviePage";
import Page from "../common/page";

export class Shows extends Component {
  state = {
    movieId: "",
    pageTitle: "",
    movie: {},
    shows: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    movieService.getMovie(this.props.match.params.movieId).then((res) => {
      console.log(res);
      this.setState({ movieId: res.data.id });
      this.setState({ movie: res.data });
      this.setState({ shows: res.data.shows });
      this.setState({ pageTitle: "Movie Shows" });
      console.log(this.state.movie);
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
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleShowForm()}
          >
            Add Show
          </Button>
        </div>
      );
    }
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, shows: allshows } = this.state;

    const sorted = _.orderBy(allshows, [sortColumn.path], [sortColumn.order]);

    const shows = paginate(sorted, currentPage, pageSize);

    return { totalCount: allshows.length, data: shows };
  };

  handleSuccess = (message) => {
    toast(message);
    window.location.reload();
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleDelete = (show) => {
    console.log(show);

    showService.removeShowFromTheater(show.id).then((res) => {
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  render() {
    const { pageTitle, pageSize, currentPage, sortColumn, movie, movieId } = this.state;
    const { totalCount, data: shows } = this.getPagedData();

    return (
      <div className="container">
        <div className="row ">
          <div className="col">
            {" "}
            <h3>{pageTitle}</h3>
            <p>Showing {totalCount} shows</p>
            {this.handleRole()}
            {!_.isEmpty(movie) ? <MoviePage movie={movie} /> : <h1>hi</h1>}
          </div>
        </div>
        <div className="row mx-lg-n5" style={{ marginTop: "10px" }}>
          <div className="col py-3 px-lg-5  bg-light">
            <ShowTable
              movieId={movieId}
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
      </div>
    );
  }
}

export default Shows;
