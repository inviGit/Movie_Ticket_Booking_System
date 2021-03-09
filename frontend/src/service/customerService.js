import axios from "axios";

class CustomerService {
  getCustomer(customerId) {
    const url = `http://localhost:8080/api/v1/customer/${customerId}`;
    return axios.get(url);
  }

  getAllCustomers() {
    const url = `http://localhost:8080/api/v1/customer/all`;
    return axios.get(url);
  }

  updateCustomer(customerId, customer) {
      const url = `http://localhost:8080/api/v1/customer/update/${customerId}`;
      const data = customer;
      const headers = {
            "Content-Type": "application/json",
          };
      return axios.post(url, data, headers);
}

removeCustomer(customerId) {
      const url = `http://localhost:8080/api/v1/customer/remove/${customerId}`;
      return axios.delete(url);
    }

}

export default new CustomerService();
