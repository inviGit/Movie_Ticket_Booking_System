import React, { Component } from "react";
import movieService from "../../service/movieService";
import { paginate } from "../../utils/paginate";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import MovieTable from "../view/tables/movieTable";
import theaterService from "../../service/theaterService";
import MovieCard from "./cards/movieCard";
import { toast } from "react-toastify";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import AutocompleteInput from "../common/autocompleteInput";
import TheaterPage from "./page/theaterPage";
import { genre } from "./../../constants/genre";
import { language } from "../../constants/language";
import _ from "lodash";
import DeleteDialog from "./alertDialog/deleteDialog";

export class Movies extends Component {
  state = {
    theaterId: "",
    theater: "",
    allMovies: [],
    movies: [],
    genres: genre,
    language: language,
    selectedGenre: "",
    selectedLanguage: "",
    openDeleteDialog: false,
    selectedMovie: "",
    pageSize: 5,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    pageTitle: "WELCOME",
  };

  componentDidMount() {
    try {
      const theaterId = this.props.match.params.theaterId;
      if (_.isUndefined(theaterId)) {
        movieService.getAllMovies().then((res) => {
          this.setState({
            movies: res.data,
            allMovies: res.data,
          });
          this.setState({ pageTitle: "All Movies" });
        });
      } else {
        theaterService.getTheater(theaterId).then((res) => {
          this.setState({ theaterId: res.data.id, theater: res.data });
          this.setState({
            movies: res.data.movies,
            allMovies: res.data.movies,
          });
          this.setState({
            pageTitle: `Movies is theater: ${res.data.theaterName}`,
          });
        });
      }
    } catch (error) {
      movieService
        .getAllMovies()
        .then((res) => {
          this.setState({
            movies: res.data,
            allMovies: res.data,
          });
          this.setState({ pageTitle: "All Movies" });
        })
        .catch((error) => {
          toast(error);
          if (error.response.data.status === 403) {
            toast("Please Login First");
          }
        });
    }
  }

  handleView = (movies, sortColumn) => {
    const role = localStorage.getItem("role");
    if (role === "ROLE_VENDOR") {
      return (
        <MovieTable
          movies={movies}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onUpdate={this.handleUpdate}
          onSort={this.handleSort}
        />
      );
    } else {
      return (
        <div className="row">
          <MovieCard movies={movies} onShowClick={this.handleShowClick} />
        </div>
      );
    }
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
            onClick={() => this.handleMovieForm()}
          >
            Add Movie
          </Button>
        </div>
      );
    }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      selectedLanguage,
      movies,
    } = this.state;

    const Language =
      selectedLanguage === "All Language" ? "" : selectedLanguage;

    const Genre = selectedGenre === "All Genre" ? "" : selectedGenre;

    let filtered = Genre ? movies.filter((m) => m.genre === Genre) : movies;

    filtered = Language
      ? filtered.filter((m) => m.language === Language)
      : filtered;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const filteredMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: filteredMovies };
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleLanguageSelect = (language) => {
    this.setState({ selectedLanguage: language, currentPage: 1 });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleMovieForm = () => {
    this.props.history.push({
      pathname: `/theater/${this.state.theaterId}/movie-form`,
    });
  };

  handleShowClick = (movie) => {
    this.props.history.push(`/movie/${movie.id}/shows`);
  };

  handleSuccess = (message) => {
    window.location.reload();
    toast(message);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleUpdate = (movie) => {
    this.props.history.push({
      pathname: `/movie/${movie.id}/movie-form`,
      state: { movie: movie, theaterId: this.state.theaterId },
    });
  };

  handleMovieSelect = (event, movie) => {
    let a = {};
    if (_.isNull(movie)) {
      a = { ...this.state.allMovies };
      this.setState({ movies: a });
    } else {
      a = [movie];
      this.setState({ movies: a });
    }
  };

  handleDelete = (movie) => {
    this.setState({ selectedMovie: movie, openDeleteDialog: true });
  };

  handleDeleteDialogClose = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleDeleteDialogConfirm = () => {
    movieService
      .removeMovieFromTheater(this.state.selectedMovie.id)
      .then((res) => {
        const { data } = res;
        data.status === 1
          ? this.handleSuccess(data.message)
          : this.handleFailure(data.message);
      });
  };

  render() {
    const {
      allMovies,
      theater,
      openDeleteDialog,
      pageTitle,
      pageSize,
      currentPage,
      sortColumn,
    } = this.state;

    const { totalCount, data: filteredMovies } = this.getPagedData();

    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        <DeleteDialog
          open={openDeleteDialog}
          title={`Delete Movie?`}
          content={`This action is irreversible. Movie will be deleted permanently`}
          onCancel={this.handleDeleteDialogClose}
          onConfirm={this.handleDeleteDialogConfirm}
        />

        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={10}>
            <Paper>
              {" "}
              <AutocompleteInput
                data={allMovies}
                label={"movieName"}
                onItemSelect={this.handleMovieSelect}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={"auto"}>
            <span className="badge badge-dark" style={{ fontSize: "20px" }}>
              Filter:
            </span>
          </Grid>
          <Grid item xs={"auto"}>
            <Paper>
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </Paper>
          </Grid>
          <Grid item xs={"auto"}>
            <Paper>
              <ListGroup
                items={this.state.language}
                selectedItem={this.state.selectedLanguage}
                onItemSelect={this.handleLanguageSelect}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={"auto"}>
            <span className="badge badge-dark" style={{ fontSize: "20px" }}>
              Theater Details:
            </span>
          </Grid>
          <Grid item xs={"auto"}>
            {!_.isEmpty(this.state.theater) ? (
              <div style={{ marginTop: "10px" }}>
                <TheaterPage theater={theater} />
              </div>
            ) : (
              <h1></h1>
            )}
          </Grid>
          <Grid item xs={10}>
            <Paper>
              <div
                className="col py-3 px-lg-5  bg-light"
                style={{ marginTop: "10px" }}
              >
                <p>{pageTitle}</p>
                {this.handleRole()}
                {this.handleView(filteredMovies, sortColumn)}
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

export default Movies;
