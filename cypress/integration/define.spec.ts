import { aliasQuery, hasOperationName } from "../utils/graphql";

function fillAndSubmit() {
  cy.dataCy("word").type("Faire le délicat");
  cy.dataCy("meaning").type("Fè chichi");
  cy.dataCy("example").type("Gadé misié ka fè chichi");
  cy.dataCy("translation").select("gf");

  cy.get("*:invalid").should("have.length", 0);

  cy.dataCy("submit").click();
}

context("On the /define page", () => {
  context("if required fields are empty", () => {
    it("should not be submitted", () => {
      cy.visit("/define");

      cy.dataCy("submit").click();

      cy.get("*:invalid").should("have.length", 3);

      cy.dataCy("example").type("Gadé misié ka fè chichi");

      cy.dataCy("submit").click();

      cy.get("*:invalid").should("have.length", 3);

      cy.dataCy("word").type("Faire le délicat");

      cy.dataCy("submit").click();

      cy.get("*:invalid").should("have.length", 2);

      cy.dataCy("word").clear();
      cy.dataCy("meaning").type("Fè chichi");
      cy.dataCy("example").clear();

      cy.get("*:invalid").should("have.length", 2);

      cy.dataCy("submit").click();
    });
  });

  context("if the user is authenticated", () => {
    it("should create a definition and redirect to the home page", () => {
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

        if (hasOperationName(req, "CreateDefinition")) {
          req.reply((res) => {
            res.body.data.createDefinition = {
              id: "6248ba47a08cb742fd827f21",
              __typename: "Definition",
            };

            res.body.errors = null;
          });
        }
      });

      cy.visit("/define");

      cy.wait("@gqlMeQuery");

      fillAndSubmit();

      cy.location("pathname").should("eq", "/");
    });
  });

  context("if the user is not authenticated", () => {
    it("should open the the login modal", () => {
      cy.visit("/define");

      fillAndSubmit();

      cy.get(".modal").should("be.visible").and("have.class", "is-active");
    });
  });
});
