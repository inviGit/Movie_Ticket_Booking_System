import axios from "axios";
import interceptors from "../Interceptors";

class VendorService {
  getVendor(vendorId) {
    const url = `http://localhost:8080/api/v1/vendor/${vendorId}`;
    return axios.get(url);
  }

  getVendorByUserName(username) {
    const url = `http://localhost:8080/api/v1/vendor/get-by-username/${username}`;
    return axios.get(url);
  }

  getAllVendors() {
    const url = `http://localhost:8080/api/v1/vendor/all`;
    return axios.get(url);
  }

  addVendor(vendor) {
    const url = `http://localhost:8080/api/v1/vendor/add`;
    const data = vendor;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.put(url, data, headers);
  }

  updateVendor(vendorId, vendor) {
    const url = `http://localhost:8080/api/v1/vendor/update/${vendorId}`;
    const data = vendor;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(url, data, headers);
  }

  removeVendor(vendorId) {
    const url = `http://localhost:8080/api/v1/vendor/remove/${vendorId}`;
    return axios.delete(url);
  }
}

export default new VendorService();
