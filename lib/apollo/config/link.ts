import { HttpLink, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

/**
 * TODO url as variable
 */

const httpLink = new HttpLink({
  uri: "https://ekezoh-kreol-back-end.herokuapp.com/graphql",
  credentials: "include",
});

let _link = null;

if (typeof window !== "undefined") {
  const wsLink = new WebSocketLink({
    uri: "wss://ekezoh-kreol-back-end.herokuapp.com/subscriptions",
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
