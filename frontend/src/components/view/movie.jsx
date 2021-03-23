import React, { Component } from "react";
import movieService from "../../service/movieService";
import { paginate } from "../../utils/paginate";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import MovieTable from "../view/tables/movieTable";
import theaterService from "../../service/theaterService";
import MovieCard from "./cards/movieCard";
import { toast } from "react-toastify";
import _, { filter } from "lodash";
import { Button, Fab, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AutocompleteInput from "../common/autocompleteInput";
import MoviePage from "./page/moviePage";
import TheaterPage from "./page/theaterPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";
import { genre } from './../../constants/genre';
import {language} from "../../constants/language"
export class Movies extends Component {
  state = {
    theaterId: "",
    theater: "",
    allMovies: [],
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: genre,
    language: language,
    selectedGenre: "",
    selectedLanguage: "",
    sortColumn: { path: "title", order: "asc" },
    pageTitle: "WELCOME",
  };

  componentDidMount() {
    console.log(this.props.match.params.theaterId);
    if (_.isUndefined(this.props.match.params.theaterId)) {
      movieService
        .getAllMovies()
        .then((res) => {
          this.setState({
            movies: res.data,
            allMovies: res.data,
          });
          this.setState({ pageSize: 8, pageTitle: "All Movies" });
        })
        .catch((error) => {
          toast(error);
          if (error.response.data.status === 403) {
            toast("Please Login First");
          }
        });
    } else {
      const theaterId = this.props.match.params.theaterId;
      theaterService.getTheater(theaterId).then((res) => {
        console.log(res);
        this.setState({ theaterId: res.data.id, theater: res.data });
        this.setState({ movies: res.data.movies, allMovies: res.data.movies });
        this.setState({ pageTitle: "Movies is theater" });
      });
    }
  }

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
    toast(message);
    window.location.reload();
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleDelete = (movie) => {
    movieService.removeMovieFromTheater(movie.id).then((res) => {
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
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
        <div >
          <MovieCard movies={movies} onShowClick={this.handleShowClick} />;
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
      allMovies,
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

  render() {
    const {
      allMovies,
      theater,
      pageTitle,
      pageSize,
      currentPage,
      sortColumn,
    } = this.state;

    const { totalCount, data: filteredMovies } = this.getPagedData();

    return (
      <div className="container ">
        <div className="row ">
          <div className="col-2"> </div>
          <div className="col">
            {" "}
            <h3>{pageTitle}</h3>
            <p>Showing {totalCount} movies</p>
            {this.handleRole()}
          </div>
        </div>
        <div className="row mx-lg-n5" style={{ marginTop: "10px" }}>
          <div className="col-2 py-3 px-lg-5  bg-light">
            <span className="badge badge-dark">Filter:</span>
            <div style={{ marginTop: "10px" }}>
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <ListGroup
                items={this.state.language}
                selectedItem={this.state.selectedLanguage}
                onItemSelect={this.handleLanguageSelect}
              />
            </div>
            <div>
              <hr />

              {!_.isEmpty(this.state.theater) ? (
                <Typography variant="h6" component="h1">
                  Theater Details:
                  <TheaterPage theater={theater} />
                </Typography>
              ) : (
                <h1></h1>
              )}
            </div>
          </div>
          <div className="col py-3 px-lg-5  bg-light">
            <AutocompleteInput
              data={allMovies}
              onCitySelect={this.handleMovieSelect}
            />
            {this.handleView(filteredMovies, sortColumn)}
            <div style={{ marginTop: "20px" }}>
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
