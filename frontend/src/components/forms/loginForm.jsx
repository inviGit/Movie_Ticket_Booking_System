import React, { Component } from "react";
import loginAndRegistrationService from "../../service/loginAndRegistraionService";
import CustomerService from "../../service/customerService";

import Form from "../common/form";
import { toast } from "react-toastify";

export class Login extends Component {
  state = {
    username: "",
    password: "",
    status: "",
    title: "Login Form",
  };

  handleFormValueChange = (event) => {
    const name = event.target.name;

    if (name === "username") {
      this.setState({ username: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  };

  handleSuccess = (data) => {
    localStorage.setItem("authorization", data.authorization);
    localStorage.setItem("username", this.state.username);
    localStorage.setItem("role", data.role);
    this.handleRoute(data.role);
    toast("Loged in Successfully");
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleSubmit = () => {
    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    loginAndRegistrationService
      .login(user)
      .then((res) => {
        console.log(res);
        this.handleSuccess(res.headers);
      })
      .catch((error) => {
        console.log(error.response);
        this.handleFailure("Wrong Credentials");
      });
  };

  handleCancel = () => {
    this.props.history.push({
      pathname: `/`,
    });
  };

  handleRoute = (role) => {
    if (role === "ROLE_VENDOR") {
      this.props.history.push("/theaters");
    } else if (role === "ROLE_CUSTOMER") {
      // customer
      // CustomerService.getCustomerByUserName(this.state.username).then((res) => {
      //   console.log("login",res);
      //   localStorage.setItem("userId", res.data.id);
      // });
      this.props.history.push("/cities");
    } else {
      this.props.history.push("/cities");
    }
  };

  render() {
    const { username, password, title } = this.state;
    const user = { username: username, password: password };
    return (
      <div className="container">
        <Form
          formObject={user}
          title={title}
          onFormValueChange={this.handleFormValueChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default Login;
