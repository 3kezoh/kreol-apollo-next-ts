import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });
const cache = new InMemoryCache();
const authLink =
  typeof window === "undefined"
    ? null
    : setContext((_, { headers }) => {
        const token = localStorage?.getItem("token");
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      });
const link = typeof window === "undefined" ? httpLink : authLink?.concat(httpLink);

const apolloClient = new ApolloClient({ link, cache });

export default apolloClient;
