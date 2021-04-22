import API from "./API";

const url = "/graphql";
const transformResponse = [
  (response) => {
    const { data } = JSON.parse(response);
    return data;
  },
];

const fetch = async ({ query, variables }) =>
  API({ url, data: { query, variables }, transformResponse });

export default fetch;
