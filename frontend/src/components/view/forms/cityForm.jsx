import React, { Component } from "react";
import cityService from "../../../service/cityService";
import {Form} from "../../common/form";
import { toast } from "react-toastify";
import _ from "lodash";

export class CityForm extends Component {
  state = {
    cityId: "",
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
    } else if (
      !_.isUndefined(this.props.match.params.cityId) &&
      this.props.match.params.cityId !== null
    ) {
      let city = this.props.location.state.city;
      let cityId = this.props.match.params.cityId;
      this.setState({
        cityId,
        title: "Update city",
      });
      this.setState(
        (state) => (
          (state.city["cityName"] = city.cityName),
          (state.city["pincode"] = city.pincode),
          (state.city["stateName"] = city.stateName)
        )
      );
    }
  }

  handleFormValueChange = (event) => {
    this.setState(
      (state) => (state.city[event.target.name] = event.target.value)
    );
  };

  handleSuccess = (message) => {
    toast(message);
    this.props.history.replace("/cities");
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleSubmit = () => {
    const { cityId, city } = this.state;

    if (cityId !== null && cityId !== "") {
      cityService.updateCity(cityId, city).then((res) => {
        console.log(res.data);
        const { data } = res;
        data.status === 1
          ? this.handleSuccess(data.message)
          : this.handleFailure(data.message);
      });
    } else {
      cityService.addCity(this.state.city).then((res) => {
        const { data } = res;
        data.status === 1
          ? this.handleSuccess(data.message)
          : this.handleFailure(data.message);
      });
    }
  };

  handleCancel = () => {
    this.props.history.replace("/cities");
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
