import React, { Component } from "react";
import movieService from "../../service/movieService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import ShowTable from "../view/tables/showTable";
import _ from "lodash";
import { toast } from "react-toastify";
import showService from "../../service/showService";
import { Button, Grid, Paper } from "@material-ui/core";
import MoviePage from "./page/moviePage";
import Page from "../common/page";
import DeleteDialog from "./alertDialog/deleteDialog";

export class Shows extends Component {
  state = {
    movieId: "",
    pageTitle: "",
    movie: {},
    shows: [],
    selectedShow: "",
    openDeleteDialog: false,
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    movieService.getMovie(this.props.match.params.movieId).then((res) => {
      this.setState({ movieId: res.data.id });
      this.setState({ movie: res.data });
      this.setState({ shows: res.data.shows });
      this.setState({ pageTitle: "Movie Shows" });
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
            style={{ marginBottom: "20px" }}
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
    window.location.reload();
    toast(message);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleDelete = (show) => {
    this.setState({ selectedShow: show, openDeleteDialog: true });
  };

  handleDeleteDialogClose = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleDeleteDialogConfirm = () => {
    showService
      .removeShowFromTheater(this.state.selectedShow.id)
      .then((res) => {
        const { data } = res;
        data.status === 1
          ? this.handleSuccess(data.message)
          : this.handleFailure(data.message);
      });
  };

  render() {
    const {
      pageTitle,
      movie,
      movieId,
      openDeleteDialog,
      pageSize,
      currentPage,
      sortColumn,
    } = this.state;
    const { totalCount, data: shows } = this.getPagedData();

    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        <DeleteDialog
          open={openDeleteDialog}
          title={`Delete Show?`}
          content={`This action is irreversible. Show will be deleted permanently`}
          onCancel={this.handleDeleteDialogClose}
          onConfirm={this.handleDeleteDialogConfirm}
        />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={3}>
            {!_.isEmpty(movie) ? <MoviePage movie={movie} /> : <h1></h1>}
          </Grid>

          <Grid item xs={10}>
            <Paper>
              <div
                className="col py-3 px-lg-5  bg-light"
                style={{ marginTop: "10px" }}
              >
                {this.handleRole()}
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
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Shows;
