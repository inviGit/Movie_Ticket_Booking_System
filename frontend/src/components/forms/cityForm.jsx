import React, { Component } from "react";
import cityService from "../../service/cityService";
import Form from "../common/form";
import { toast } from "react-toastify";

export class CityForm extends Component {
  state = {
    city: {
      pincode: "",
      cityName: "",
      stateName: "",
    },
    title: "City Form",
  };

  componentDidMount() {
    if (localStorage.getItem("role") !== "ROLE_ADMIN") {
      this.props.history.push("/not-authorized");
    }
  }

  handleFormValueChange = (event) => {
    this.setState(
      (state) => (state.city[event.target.name] = event.target.value)
    );
  };

  handleSuccess = (message) => {
    toast(message);
    this.props.history.push("/cities");
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleSubmit = () => {
    cityService.addCity(this.state.city).then((res) => {
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  handleCancel = () => {
    this.props.history.push("/city");
  };

  render() {
    const { city, title } = this.state;
    return (
      <div>
        <Form
          formObject={city}
          title={title}
          onFormValueChange={this.handleFormValueChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default CityForm;
