import { aliasQuery, hasOperationName } from "../utils/graphql";

describe("Definitions", () => {
  context("if the user is authenticated", () => {
    it.only("should vote the for definition", function () {
      cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
        if (hasOperationName(req, "Me")) {
          aliasQuery(req, "Me");

          req.reply((res) => {
            res.body.data.me = {
              id: "624883126f20c82672ba0526",
              name: "Leone",
              __typename: "User",
            };
          });
        }
      });

      cy.visit("/");

      cy.wait("@gqlMeQuery");

      cy.dataCy("definition").first().as("firstDefinition");

      cy.get("@firstDefinition")
        .find("[data-cy=score]")
        .invoke("text")
        .then(parseInt)
        .then((score) => {
          cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
            if (hasOperationName(req, "Vote")) {
              req.reply((res) => {
                res.body.data.vote = {
                  definition: {
                    id: "6248bc39a08cb742fd827f26",
                    score: score + 1,
                    __typename: "Definition",
                  },
                  action: 1,
                  __typename: "Vote",
                };

                res.body.errors = null;
              });
            }
          });

          cy.get("@firstDefinition").find("[data-cy=upvote]").should("contain", "-").click();

          cy.get("@firstDefinition")
            .find("[data-cy=score]")
            .should("contain", score + 1);

          cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
            if (hasOperationName(req, "Vote")) {
              aliasQuery(req, "Vote");

              req.reply((res) => {
                res.body.data.vote = {
                  definition: {
                    id: "6248bc39a08cb742fd827f26",
                    score: score - 1,
                    __typename: "Definition",
                  },
                  action: 0,
                  __typename: "Vote",
                };

                res.body.errors = null;
              });
            }
          });

          cy.get("@firstDefinition").find("[data-cy=unvote]").should("contain", "↑").click();

          cy.get("@firstDefinition")
            .find("[data-cy=score]")
            .should("contain", score - 1);

          cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
            if (hasOperationName(req, "Vote")) {
              aliasQuery(req, "Vote");

              req.reply((res) => {
                res.body.data.vote = {
                  definition: {
                    id: "6248bc39a08cb742fd827f26",
                    score: score - 1,
                    __typename: "Definition",
                  },
                  action: -1,
                  __typename: "Vote",
                };

                res.body.errors = null;
              });
            }
          });

          cy.get("@firstDefinition").find("[data-cy=downvote]").click();

          cy.get("@firstDefinition")
            .find("[data-cy=score]")
            .should("contain", score - 1);

          cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
            if (hasOperationName(req, "Vote")) {
              aliasQuery(req, "Vote");

              req.reply((res) => {
                res.body.data.vote = {
                  definition: {
                    id: "6248bc39a08cb742fd827f26",
                    score: score + 1,
                    __typename: "Definition",
                  },
                  action: 0,
                  __typename: "Vote",
                };

                res.body.errors = null;
              });
            }
          });

          cy.get("@firstDefinition").find("[data-cy=unvote]").should("contain", "↓").click();
        });
    });
  });

  context.only("if the user is not authenticated", () => {
    it("should open the login modal", () => {
      cy.visit("/");

      cy.dataCy("definition").first().as("firstDefinition");

      cy.get("@firstDefinition").find("[data-cy=upvote]").click();

      cy.get(".modal").should("be.visible").and("have.class", "is-active");

      cy.get(".modal-close").click();

      cy.get("@firstDefinition").find("[data-cy=downvote]").click();

      cy.get(".modal").should("be.visible").and("have.class", "is-active");
    });
  });
});
