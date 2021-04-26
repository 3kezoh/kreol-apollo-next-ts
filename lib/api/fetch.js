import { print } from "graphql";
import API from "./API";

const url = "/graphql";
const transformResponse = [
  (response) => {
    const { data } = JSON.parse(response);
    return data;
  },
];

const fetch = async ({ query, variables, token }) => {
  if (token) API.defaults.headers.common.Authorization = `Bearer ${token}`;
  return API({ url, data: { query: print(query), variables }, transformResponse });
};

export default fetch;
