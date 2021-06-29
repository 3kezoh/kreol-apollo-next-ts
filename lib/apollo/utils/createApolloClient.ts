import { ApolloClient } from "@apollo/client";
import { cache, credentials, link, ssrMode } from "@lib/apollo/config";

export const createApolloClient = () => new ApolloClient({ ssrMode, link, cache, credentials });
