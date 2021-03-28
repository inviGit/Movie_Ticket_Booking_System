import React, { Component } from "react";
import { Form } from "../../common/form";
import { toast } from "react-toastify";
import customerService from "../../../service/customerService";
import _ from "lodash";

export class CustomerForm extends Component {
  state = {
    customerId: "",
    customer: {
      name: "",
      email: "",
      phoneNo: "",
    },
    title: "Update Customer",
  };

  componentDidMount() {
    if (localStorage.getItem("role") === "ROLE_CUSTOMER") {
      if (!_.isUndefined(this.props.match.params.userId)) {
        const customerId = this.props.match.params.userId;
        const customer = this.props.location.state.user;
        this.setState({
          customerId,
        });
        if (
          !_.isNull(customer.email) &&
          !_.isNull(customer.name) &&
          !_.isNull(customer.phoneNo)
        ) {
          this.setState(
            (state) => (
              (state.customer["name"] = customer.name),
              (state.customer["email"] = customer.email),
              (state.customer["phoneNo"] = customer.phoneNo)
            )
          );
        }
      }
    } else {
      this.props.history.push("/not-authorized");
    }
  }

  handleFormValueChange = (event) => {
    const name = event.target.name;
    this.setState((state) => (state.customer[name] = event.target.value));
  };

  handleUpdateSuccess = (message) => {
    toast(message);
    this.props.history.replace(`/customer/profile`);
  };
  handleFailure = (message) => {
    toast(message);
  };

  handleSubmit = () => {
    const { customerId, customer } = this.state;
    if (!_.isNull(customerId) && !_.isNil(customerId)) {
      customerService.updateCustomer(customerId, customer).then((res) => {
        console.log(res.data);
        const { data } = res;
        data.status === 1
          ? this.handleUpdateSuccess(data.message)
          : this.handleFailure(data.message);
      });
    }
  };

  handleCancel = () => {
    this.props.history.push(`/customer/profile`);
  };

  render() {
    const { customer, title } = this.state;
    return (
      <div>
        <Form
          formObject={customer}
          title={title}
          onFormValueChange={this.handleFormValueChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default CustomerForm;
