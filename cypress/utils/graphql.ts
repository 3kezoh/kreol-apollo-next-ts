import { CyHttpMessages, RouteHandler } from "cypress/types/net-stubbing";

export const GRAPHQL_API = "http://localhost:4000/graphql";

export const interceptGraphQLAPI = (callback: RouteHandler): Cypress.Chainable<null> =>
  cy.intercept("POST", GRAPHQL_API, callback);

/**
 * Match GraphQL query or mutation based on the operation name
 * @param {CyHttpMessages.IncomingHttpRequest} req
 * @param {string} operationName
 * @returns {boolean}
 */
export const hasOperationName = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
): boolean => {
  const { body } = req;
  return (
    Object.prototype.hasOwnProperty.call(body, "operationName") &&
    body.operationName === operationName
  );
};

/**
 * Alias query if operationName matches
 * @param {CyHttpMessages.IncomingHttpRequest} req
 * @param {string} operationName
 */
export const aliasQuery = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
): void => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`;
  }
};

/**
 * Alias mutation if operationName matches
 * @param {CyHttpMessages.IncomingHttpRequest} req
 * @param {string} operationName
 */
export const aliasMutation = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
): void => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`;
  }
};
