import React, { Component } from "react";
import loginAndRegistrationService from "../../../service/loginAndRegistraionService";
import { Form } from "../../common/form";
import { toast } from "react-toastify";

export class Login extends Component {
  state = {
    username: "",
    password: "",
    status: "",
    title: "Login Form",
  };

  componentDidMount() {
    if (localStorage.getItem("authorization") !== null) {
      toast("Already Logged In");
      this.handleRoute(localStorage.getItem("role"));
    }
  }

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
    toast("Loged in Successfully");
    this.handleRoute(data.role);
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
        this.handleSuccess(res.headers);
      })
      .catch((error) => {
        this.handleFailure("Wrong Credentials");
      });
  };

  handleCancel = () => {
    this.props.history.push({
      pathname: `/home`,
    });
  };

  handleRoute = (role) => {
    if (role === "ROLE_VENDOR") {
      window.location.href = "http://localhost:3000/theaters";
    } else if (role === "ROLE_CUSTOMER") {
      window.location.href = "http://localhost:3000/cities";
    } else {
      window.location.href = "http://localhost:3000/cities";
    }
  };

  render() {
    const { username, password, title } = this.state;
    const user = { username: username, password: password };
    return (
      <div>
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
