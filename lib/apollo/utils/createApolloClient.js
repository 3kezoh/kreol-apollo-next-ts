import { ApolloClient } from "@apollo/client";
import { cache, link, ssrMode } from "@lib/apollo/config";

const createApolloClient = () => new ApolloClient({ ssrMode, link, cache });

export default createApolloClient;
