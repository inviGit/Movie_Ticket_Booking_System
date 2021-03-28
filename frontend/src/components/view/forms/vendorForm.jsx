import React, { Component } from "react";
import { Form } from "../../common/form";
import { toast } from "react-toastify";
import vendorService from "../../../service/vendorService";
import _ from "lodash";

export class VendorForm extends Component {
  state = {
    vendorId: "",
    vendor: {
      name: "",
      vendorEmail: "",
      phoneNo: "",
    },
    title: "Add Vendor",
  };

  componentDidMount() {
    let vendor;
    if (
      localStorage.getItem("role") !== "ROLE_ADMIN" &&
      localStorage.getItem("role") !== "ROLE_VENDOR"
    ) {
      this.props.history.push("/not-authorized");
    } else {
      if (!_.isUndefined(this.props.match.params.userId)) {
        console.log("hu");
        const vendorId = this.props.match.params.userId;
        const vendor = this.props.location.state.vendor;

        this.setState({
          vendorId,
        });
        if (
          !_.isNull(vendor.vendorEmail) &&
          !_.isNull(vendor.name) &&
          !_.isNull(vendor.phoneNo)
        )
          this.setState(
            (state) => (
              (state.vendor["name"] = vendor.name),
              (state.vendor["vendorEmail"] = vendor.vendorEmail),
              (state.vendor["phoneNo"] = vendor.phoneNo)
            )
          );
      }
    }
  }

  handleFormValueChange = (event) => {
    const name = event.target.name;
    this.setState((state) => (state.vendor[name] = event.target.value));
  };

  handleSuccess = (data) => {
    toast(data.message);
    toast("Vendor Id", data.object.id);
    this.props.history.replace(`/vendors`);
  };

  handleUpdateSuccess = (data) => {
    toast(data.message);
    this.props.history.push(`/vendor/profile`);
  };
  handleFailure = (message) => {
    toast(message);
  };

  handleSubmit = () => {
    const { vendorId, vendor } = this.state;

    if (vendorId!=="" && vendorId!==null) {
      vendorService.updateVendor(vendorId, vendor).then((res) => {
        console.log(res.data);
        const { data } = res;
        data.status === 1
          ? this.handleUpdateSuccess(data.message)
          : this.handleFailure(data.message);
      });
    } else {
      vendorService.addVendor(vendor).then((res) => {
        console.log(res.data);
        const { data } = res;
        data.status === 1
          ? this.handleSuccess(data)
          : this.handleFailure(data.message);
      });
    }
  };

  handleCancel = () => {
    if (!_.isNull(this.state.vendorId)) {
      this.props.history.push(`/vendor/profile`);
    } else {
      this.props.history.push(`/vendors`);
    }
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
