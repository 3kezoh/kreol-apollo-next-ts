import { CyHttpMessages } from "cypress/types/net-stubbing";

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
