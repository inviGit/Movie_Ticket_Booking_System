var axios = require("axios");

export const jwtToken = localStorage.getItem("authorization");

axios.interceptors.request.use(
  function(config) {
    if (jwtToken) {
      config.headers["authorization"] = jwtToken;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);