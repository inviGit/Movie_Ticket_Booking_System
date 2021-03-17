import React, { Component } from "react";
import movieService from "../../service/movieService";
import Form from "../common/form";

export class MovieForm extends Component {
  state = {
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

  handleSubmit = () => {
    const { movie, genre, language } = this.state;
    movie["genre"] = genre;
    movie["language"] = language;
    console.log(movie);
    // movieService.addMovieToTheater(movie)
  };

  handleCancel=()=>{
    this.props.history.push("/movies")
  }

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
