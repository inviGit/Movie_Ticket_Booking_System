import React, { Component } from "react";
import movieService from "../../service/movieService";
import Form from "../common/form";
import { toast } from "react-toastify";

export class MovieForm extends Component {
  state = {
    theaterId: "",
    movie: {
      movieName: "",
      actor: "",
      actress: "",
      director: "",
      language: [
        "None",
        "Telugu",
        "Hindi",
        "English",
        "Kannada",
        "Tamil",
        "Malayalam",
      ],
      genre: [
        "None",
        "Fantasy",
        "Thriller",
        "SciFi",
        "Action",
        "Periodic",
        "Comedy",
        "Drama",
        "Crime",
        "Animation",
        "Fiction",
        "Horror",
        "Adventure",
        "Romantic",
      ],
      activeStatus: "",
    },
    genre: "",
    language: "",
    title: "Add Movie",
  };

  componentDidMount() {
    if (localStorage.getItem("role") !== "ROLE_VENDOR") {
      this.props.history.push("/not-authorized");
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
    if (name === "genre") {
      this.setState({
        genre: this.state.movie.genre[event.target.options.selectedIndex],
      });
    } else if (name === "language") {
      this.setState({
        language: this.state.movie.language[event.target.options.selectedIndex],
      });
    } else {
      this.setState((state) => (state.movie[name] = event.target.value));
    }
  };

  handleSuccess = (message) => {
    toast(message);
    this.props.history.push(`/theater/${this.state.theaterId}/movies`);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleSubmit = () => {
    const { movie, genre, language } = this.state;
    movie["genre"] = genre;
    movie["language"] = language;
    movieService.addMovieToTheater(this.state.theaterId, movie).then((res) => {
      console.log(res.data);
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  handleCancel = () => {
    this.props.history.push({
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
