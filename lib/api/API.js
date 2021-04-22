import axios from "axios";

const urls = {
  development: "http://localhost:4000",
};

const API = axios.create({
  baseURL: urls[process.env.NODE_ENV],
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default API;
