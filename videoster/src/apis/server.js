import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001"
});

// axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

// axios.interceptors.request.use(function (config) {
//   const token = localStorage.getItem("token");
//   console.log(token);
//   config.headers.Authorization = token;

//   return config;
// });