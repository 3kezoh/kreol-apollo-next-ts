import { ApolloClient } from "@apollo/client";
import { cache, credentials, link, ssrMode } from "@lib/apollo/config";

const createApolloClient = () => new ApolloClient({ ssrMode, link, cache, credentials });

export default createApolloClient;
