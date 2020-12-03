import axios from "axios";

const urls = {
  development: "http://localhost:4000/",
};

const api = axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
