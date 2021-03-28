import React, { Component } from "react";
import movieService from "../../../service/movieService";
import { Form } from "../../common/form";
import { toast } from "react-toastify";
import _ from "lodash";
import { language } from './../../../constants/language';
import { genre } from './../../../constants/genre';

export class MovieForm extends Component {
  state = {
    theaterId: "",
    movieId: "",
    movie: {
      movieName: "",
      actor: "",
      actress: "",
      director: "",
      language: language,
      genre: genre,
      activeStatus: ["true", "false"],
    },
    genre: "",
    language: "",
    activeStatus: "",
    title: "Add Movie",
  };

  componentDidMount() {
    let movie;
    if (localStorage.getItem("role") !== "ROLE_VENDOR") {
      this.props.history.push("/not-authorized");
    } else if (
      !_.isUndefined(this.props.match.params.movieId) &&
      this.props.match.params.movieId !== null
    ) {
      movie = this.props.location.state.movie;
      let theaterId = this.props.location.state.theaterId;
      this.setState({
        theaterId,
        movieId: movie.id,
        language: movie.language,
        genre: movie.genre,
        activeStatus: movie.activeStatus,
        title: "Update Movie",
      });
      this.setState(
        (state) => (
          (state.movie["movieName"] = movie.movieName),
          (state.movie["actor"] = movie.actor),
          (state.movie["actress"] = movie.actress),
          (state.movie["director"] = movie.director)
        )
      );
    } else {
      try {
        const theaterId = this.props.match.params.theaterId;
        this.setState({ theaterId });
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleFormValueChange = (event) => {
    const name = event.target.name;
    if (_.isUndefined(name)) {
      const id = event.target.id;
      if (_.includes(id, "language")) {
        console.log(event.target.innerText);
        this.setState({
          language: event.target.innerText,
        });
      } else if (_.includes(id, "genre")) {
        this.setState({
          genre: event.target.innerText,
        });
      } else if (_.includes(id, "activeStatus")) {
        this.setState({
          activeStatus: event.target.innerText,
        });
      }
    } else {
      this.setState((state) => (state.movie[name] = event.target.value));
    }
  };

  handleSuccess = (message) => {
    toast(message);
    this.props.history.replace(`/theater/${this.state.theaterId}/movies`);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleSubmit = () => {
    const {
      theaterId,
      movieId,
      movie,
      genre,
      language,
      activeStatus,
    } = this.state;

    const movieToUpdate = { ...movie };

    movieToUpdate.language = language;
    movieToUpdate.genre = genre;
    movieToUpdate.activeStatus = activeStatus;

    if (movieId!=="" && movieId!==null) {
      movieService.updateMovie(movieId, movieToUpdate).then((res) => {
        console.log(res.data);
        const { data } = res;
        data.status === 1
          ? this.handleSuccess(data.message)
          : this.handleFailure(data.message);
      });
    } else {
      movieService.addMovieToTheater(theaterId, movieToUpdate).then((res) => {
        console.log(res.data);
        const { data } = res;
        data.status === 1
          ? this.handleSuccess(data.message)
          : this.handleFailure(data.message);
      });
    }
  };

  handleCancel = () => {
    this.props.history.replace({
      pathname: `/theater/${this.state.theaterId}/movies`,
    });
  };

  render() {
    const { movie, title } = this.state;
    return (
      <div>
        <Form
          formObject={movie}
          title={title}
          onFormValueChange={this.handleFormValueChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default MovieForm;
