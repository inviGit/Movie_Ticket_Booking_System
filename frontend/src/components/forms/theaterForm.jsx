import React, { Component } from "react";
import theaterService from "../../service/theaterService";
import Form from "../common/form";
import { toast } from "react-toastify";

export class TheaterForm extends Component {
  state = {
    vendorId:"",
    theater: {
      city: "",
      theaterName: "",
      theaterAddress: "",
    },
    title: "Add Theater",
  };

  componentDidMount() {
    if(localStorage.getItem("role")!=="ROLE_VENDOR"){
      this.props.history.push("/not-authorized")
    }else{
      this.setState({vendorId: localStorage.getItem("vendorId")});
    }
  }
  
  handleFormValueChange = (event) => {
    const name = event.target.name;
    this.setState((state) => (state.theater[name] = event.target.value));
  };

  handleSuccess = (message) => {
    toast(message);
    this.props.history.push(`/theaters`);
  };

  handleFailure = (message) => {
    toast(message);
  };


  handleSubmit = () => {
    const { vendorId, theater: theaterInfo } = this.state;
    const theater = {
      theaterName: theaterInfo.theaterName,
      theaterAddress: theaterInfo.theaterAddress,
    };
    theaterService.addTheater(
      theaterInfo.city,
      vendorId,
      theater
    ).then((res)=>{
      console.log(res.data);
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  handleCancel = () => {
    this.props.history.push(`/theaters`);
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
