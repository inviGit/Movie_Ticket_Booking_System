import React, { Component } from "react";
import {Form} from "../../common/form";
import { toast } from "react-toastify";
import vendorService from "../../../service/vendorService";

export class VendorForm extends Component {
  state = {
    vendor: {
      name: "",
      vendorEmail: "",
      phoneNo: "",
    },
    title: "Add Vendor",
  };

  componentDidMount() {
    if (localStorage.getItem("role") !== "ROLE_ADMIN") {
      this.props.history.push("/not-authorized");
    }
  }

  handleFormValueChange = (event) => {
    const name = event.target.name;
    this.setState((state) => (state.vendor[name] = event.target.value));
  };

  handleSuccess = (data) => {
    toast(data.message);
    toast("Vendor Id", data.object.id);
    this.props.history.push(`/vendors`);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleSubmit = () => {
    const { vendor } = this.state;
    vendorService.addVendor(vendor).then((res) => {
      console.log(res.data);
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data)
        : this.handleFailure(data.message);
    });
  };

  handleCancel = () => {
    this.props.history.push(`/vendors`);
  };

  render() {
    const { vendor, title } = this.state;
    return (
      <div>
        <Form
          formObject={vendor}
          title={title}
          onFormValueChange={this.handleFormValueChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default VendorForm;
