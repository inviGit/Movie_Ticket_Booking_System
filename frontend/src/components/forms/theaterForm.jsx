import React, { Component } from "react";
import theaterService from "../../service/theaterService";
import Form from "../common/form";

export class TheaterForm extends Component {
  state = {
    theater: {
      city: "",
      theaterName: "",
      theaterAddress: "",
    },
    title: "Add Theater",
  };

  handleFormValueChange = (event) => {
    const name = event.target.name;
    this.setState((state) => (state.theater[name] = event.target.value));
  };

  handleSubmit = () => {
    const { theater: theaterInfo } = this.state;
    console.log(this.state.theater);
    const theater = {
      theaterName: theaterInfo.theaterName,
      theaterAddress: theaterInfo.theaterAddress,
    };
    theaterService.addTheater(
      theaterInfo.city,
      this.props.location.state.detail,
      theater
    );
  };

  handleCancel = () => {
    this.props.history.push("/theaters");
  };

  render() {
    const { theater, title } = this.state;
    return (
      <div>
        <Form
          formObject={theater}
          title={title}
          onFormValueChange={this.handleFormValueChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default TheaterForm;
