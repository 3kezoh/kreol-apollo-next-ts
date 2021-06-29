import { HttpLink, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql", credentials: "include" });

let _link = null;

if (typeof window !== "undefined") {
  const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/subscriptions",
    options: { reconnect: true },
  });

  _link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink,
    httpLink
  );
}

export const link = _link ?? httpLink;
