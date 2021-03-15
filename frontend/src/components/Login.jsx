import React, { Component } from "react";
import loginAndRegistrationService from "../service/loginAndRegistraionService";
import CityService from "../service/cityService";
import axios from "axios"

export class login extends Component {
  state = {
    username: "",
    password: "",
    status: "",
  };
  
  changeUserNameHandler = (event) => {
      this.setState({ username: event.target.value });
  };
  changePasswordHandler = (event) => {
      this.setState({ password: event.target.value });
  };
  loginUser = () => {
    let user = {
      username: this.state.username,
      password: this.state.password,
    };
    loginAndRegistrationService.login(user).then((res) => {
      console.log(res)
      localStorage.setItem("authorization", res.headers.authorization)

      this.props.history.push("/admin")
      
    });
    
  };


  render() {
    const { username, password } = this.state;

    return (
      <div className="container">
        <div className="card-body">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <div className="form-group">
                <label> UserName </label>
                <input
                  placeholder="username"
                  name="username"
                  className="form-control"
                  value={username}
                  onChange={this.changeUserNameHandler}
                />
              </div>
              <div className="form-group">
                <label> Password </label>
                <input
                  placeholder="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={this.changePasswordHandler}
                />
              </div>
              <h1>{this.state.status}</h1>
              <button
                className="btn btn-success"
                onClick={() => {
                  this.loginUser();
                }}
              >
                LogIn
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default login;
