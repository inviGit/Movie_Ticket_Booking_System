import React, { Component } from "react";
import Form from "../common/form";
import loginAndRegistrationService from "../../service/loginAndRegistraionService";
import { toast } from "react-toastify";

export class RegisterUser extends Component {
  state = {
        vendorId:"",
    username: "",
    password: "",
    title: "Registration Form",
  };

  componentDidMount() {
        if(this.props.match.params.user === "customer"){
              this.setState({title: "Customer Registration Form"})
        }else if(this.props.match.params.user === "vendor"){
            this.setState({title: "Vendor Registration Form"})
      } 
  }
  
  handleUserObject=(vendorId, username, password)=>{

      if(this.props.match.params.user === "customer"){
            return { username: username, password: password };
      }else if(this.props.match.params.user === "vendor"){
            return { vendorId: vendorId, username: username, password: password };
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

  handleSuccess = (message) => {
    toast(message);
    this.props.history.push(`/`);
  };

  handleFailure = (message) => {
    toast(message);
  };
  handleCustomerRegister=(user)=>{
      loginAndRegistrationService.registerCustomer(user).then((res)=>{
            console.log(res.data);
            const { data } = res;
            data.status === 1
              ? this.handleSuccess(data.message)
              : this.handleFailure(data.message);
          })
  }
  handleVendorRegister=()=>{
loginAndRegistrationService.registerVendor()
  }

  handleSubmit = () => {
        const user = {
          username: this.state.username,
          password: this.state.password,
        };
      if(this.props.match.params.user === "customer"){
            this.handleCustomerRegister(user);
      }else if(this.props.match.params.user === "vendor"){
            this.handleVendorRegister(user);
    } 

    
  };

  handleCancel = () => {
    this.props.history.push({
      pathname: `/`,
    });
  };



  render() {
    const { vendorId, username, password, title } = this.state;
    const user = this.handleUserObject(vendorId, username, password);
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

export default RegisterUser;
