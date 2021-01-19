import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import withApollo from "next-with-apollo";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : "" } };
});

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache().restore(initialState || {}),
    })
);
