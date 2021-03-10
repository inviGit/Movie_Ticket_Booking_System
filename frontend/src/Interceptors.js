var axios = require("axios");

axios.interceptors.request.use(
  config=>{
    config.headers.authorization=localStorage.getItem("authorization")
    return config;
  },
  error=>{
    return Promise.reject(error)
  }
)