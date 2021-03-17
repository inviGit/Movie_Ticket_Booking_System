import React, { Component } from "react";
import movieService from "../service/movieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MovieTable from "./tables/movieTable";
import _ from "lodash";

export class Movies extends Component {
  state = {
    pageTitle: "WELCOME",
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    try {
      this.setState({movies: this.props.location.state.detail})
      this.setState({pageTitle: "Movies is theater"})
    } catch (error) {
      movieService.getAllMovies().then((res) => {
        this.setState({ movies: res.data });
        this.setState({pageTitle: "All Movies"})
      });
    }
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleMovieForm = () => {
       this.props.history.push("/movie-form")
  }

  handleRole = () => {
    const role = localStorage.getItem("role")
    if (role === "ROLE_VENDOR") {
      return <button className="btn btn-success"  onClick={()=>this.handleMovieForm()}>Add Movie</button>;
    }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const { pageTitle, pageSize, currentPage, sortColumn } = this.state;

    if (moviesCount === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h1>{pageTitle}</h1>
          <p>Showing {totalCount} movies</p>
          {this.handleRole()}
          <MovieTable
            movies={movies}
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

export default Movies;
