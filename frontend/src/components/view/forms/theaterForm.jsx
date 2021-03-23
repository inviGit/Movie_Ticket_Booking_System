import React, { Component } from "react";
import theaterService from "../../../service/theaterService";
import {Form} from "../../common/form";
import { toast } from "react-toastify";
import vendorService from "../../../service/vendorService";
import _ from "lodash";

export class TheaterForm extends Component {
  state = {
    vendorId: "",
    theaterId: "",
    theater: {},
    title: "Add Theater",
  };

  componentDidMount() {
    let theater;
    if (localStorage.getItem("role") !== "ROLE_VENDOR") {
      this.props.history.replace("/not-authorized");
    } else if (
      !_.isUndefined(this.props.match.params.theaterId) &&
      this.props.match.params.theaterId !== null
    ) {
      theater = this.props.location.state.theater;
      this.setState(
        (state) => (
          (state.theater["theaterName"] = theater.theaterName),
          (state.theater["theaterAddress"] = theater.theaterAddress)
        )
      );
      this.setState({ title: "Update Theater", theaterId: theater.id });
    } else {
      vendorService
        .getVendorByUserName(localStorage.getItem("username"))
        .then((res) => {
          this.setState({ vendorId: res.data.id });
          this.setState(
            (state) => (
              (state.theater["city"] = ""),
              (state.theater["theaterName"] = ""),
              (state.theater["theaterAddress"] = "")
            )
          );
        });
    }
  }

  handleFormValueChange = (event) => {
    const name = event.target.name;
    this.setState((state) => (state.theater[name] = event.target.value));
  };

  handleSuccess = (message) => {
    toast(message);
    this.props.history.replace(`/theaters`);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleSubmit = () => {
    const { vendorId, theaterId, theater: theaterInfo } = this.state;

    if (theaterId !== null && theaterId !== "") {
      theaterService.updateTheater(theaterId, theaterInfo).then((res) => {
        console.log(res.data);
        const { data } = res;
        data.status === 1
          ? this.handleSuccess(data.message)
          : this.handleFailure(data.message);
      });
    } else {
      const theater = {
        theaterName: theaterInfo.theaterName,
        theaterAddress: theaterInfo.theaterAddress,
      };
      theaterService
        .addTheater(theaterInfo.city, vendorId, theater)
        .then((res) => {
          console.log(res.data);
          const { data } = res;
          data.status === 1
            ? this.handleSuccess(data.message)
            : this.handleFailure(data.message);
        });
    }
  };

  handleCancel = () => {
    this.props.history.replace(`/theaters`);
  };

  render() {
    const { title, theater } = this.state;
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
