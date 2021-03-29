import React, { Component } from "react";
import { toast } from "react-toastify";
import {Form} from "../../common/form";
import showService from "../../../service/showService";

export class ShowForm extends Component {
  state = {
    movieId: "",
    show: {
      showTime: "",
      showDate: "",
    },
    title: "Add Show",
  };

  componentDidMount() {
    if (localStorage.getItem("role") !== "ROLE_VENDOR") {
      this.props.history.push("/not-authorized");
    } else {
      try {
        const movieId = this.props.match.params.movieId;
        this.setState({ movieId });
      } catch (error) {
      }
    }
  }

  handleFormValueChange = (event) => {
    const {target} = event
    const id = target.id;
    this.setState((state) => (state.show[id] = target.value));
  };

  handleSuccess = (message) => {
    toast(message);
    this.props.history.replace(`/movie/${this.state.movieId}/shows`);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleSubmit = () => {
    const { movieId, show } = this.state;

    showService.addShowToTheater(movieId, show).then((res) => {
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  handleCancel = () => {
    this.props.history.replace({
      pathname: `/movie/${this.state.movieId}/shows`,
    });
  };

  render() {
    const { show, title } = this.state;
    return (
      <div>
        <Form
          formObject={show}
          title={title}
          onFormValueChange={this.handleFormValueChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default ShowForm;
