import axios from "axios";

const urls = {
  development: "http://localhost:4000/graphql",
};

const API = axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  method: "POST",
});

export default API;
