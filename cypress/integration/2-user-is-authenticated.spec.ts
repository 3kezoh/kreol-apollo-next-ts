import { aliasMutation, aliasQuery, hasOperationName, interceptGraphQLAPI } from "../utils/graphql";

/**
 * Intercepts the GraphQL "Vote" query and modifies its response
 * @param action 1 to upvote, 0 to unvote and -1 to downvote
 * @param score the next score value
 */
function interceptVote(action: number, score: number) {
  interceptGraphQLAPI((req) => {
    aliasMutation(req, "Vote");

    if (hasOperationName(req, "Vote")) {
      req.reply((res) => {
        res.body.data.vote = {
          definition: {
            id: "624883126f20c82672ba0526",
            score,
            __typename: "Definition",
          },
          action,
          __typename: "Vote",
        };

        res.body.errors = null;
      });
    }
  });
}

describe("If the user is authenticated", () => {
  const author = {
    id: "624883126f20c82672ba0526",
    name: "Leone",
    __typename: "User",
  };

  const definition = {
    id: "624c2b2812d4fc52801c96d5",
    word: "Faire le délicat",
    meaning: "Fè chichi",
    example: "Gadé misié ka fè chichi - « Regarde le gars faire le délicat »",
    __typename: "Definition",
    action: 0,
    translation: "fr",
    score: 0,
    createdAt: "2022-04-05T11:42:32.698Z",
    author,
  };

  const report = {
    definition: {
      id: "62486fa225b6d3263efb2bb6",
      word: "Not a cool word",
      meaning: "Not cool definition",
      example: null,
      __typename: "Definition",
      action: null,
      translation: "fr",
      score: -999,
      createdAt: "2022-04-02T15:45:39.019Z",
      author: { id: "62486f9b25b6d3263efb288a", name: "Not a cool guy", __typename: "User" },
    },
    reason: 3,
    message: "It's not cool",
    __typename: "Report",
  };

  beforeEach(() => {
    interceptGraphQLAPI((req) => {
      if (hasOperationName(req, "Me")) {
        aliasQuery(req, "Me");

        req.reply((res) => {
          res.body.data.me = author;
        });
      }
    });

    cy.visit("/");

    cy.wait("@gqlMeQuery");
  });

  it("should vote the for definition", function () {
    cy.dataCy("word")
      .first()
      .invoke("text")
      .then((word) => {
        cy.dataCy(`score-${word}`)
          .invoke("text")
          .then(parseInt)
          .then((score) => {
            interceptVote(1, score + 1);

            cy.dataCy(`upvote-${word}`).should("contain", "-").click();

            cy.wait("@gqlVoteMutation");

            cy.dataCy(`score-${word}`).should("contain", score + 1);

            interceptVote(0, score);

            cy.dataCy(`unvote-${word}`).should("contain", "↑").click();

            cy.wait("@gqlVoteMutation");

            cy.dataCy(`score-${word}`).should("contain", score);

            interceptVote(-1, score - 1);

            cy.dataCy(`downvote-${word}`).should("contain", "-").click();

            cy.wait("@gqlVoteMutation");

            cy.dataCy(`score-${word}`).should("contain", score - 1);

            interceptVote(0, score);

            cy.dataCy(`unvote-${word}`).should("contain", "↓").click();

            cy.wait("@gqlVoteMutation");

            cy.dataCy(`score-${word}`).should("contain", score);
          });
      });
  });

  it("should create a definition", function () {
    cy.dataCy("define").click();

    cy.location("pathname").should("eq", "/define");

    interceptGraphQLAPI((req) => {
      aliasMutation(req, "CreateDefinition");

      if (hasOperationName(req, "CreateDefinition")) {
        req.reply((res) => {
          res.body.data.createDefinition = null;

          res.body.errors = [
            {
              message: "Validation Error",
              locations: [{ line: 2, column: 3 }],
              path: ["createDefinition"],
              extensions: {
                validationErrors: { word: "WORD_EMPTY", meaning: "MEANING_EMPTY" },
                code: "BAD_USER_INPUT",
              },
            },
          ];
        });
      }
    });

    cy.get("*:invalid").should("have.length", 3);

    cy.dataCy("define-form").submit();

    cy.dataCy("error-word").should("be.visible").and("contain", "WORD_EMPTY");
    cy.dataCy("error-meaning").should("be.visible").and("contain", "MEANING_EMPTY");

    cy.dataCy("word").type(definition.word);
    cy.dataCy("meaning").type(definition.meaning);
    cy.dataCy("example").type(definition.example);
    cy.dataCy("translation").select(definition.translation);

    cy.get("*:invalid").should("have.length", 0);

    interceptGraphQLAPI((req) => {
      aliasMutation(req, "CreateDefinition");

      if (hasOperationName(req, "CreateDefinition")) {
        req.reply((res) => {
          res.body.data.createDefinition = {
            id: definition.id,
            __typename: "Definition",
          };

          res.body.errors = null;
        });
      }
    });

    cy.dataCy("submit").click();

    cy.wait("@gqlCreateDefinitionMutation");

    cy.location("pathname").should("eq", "/");
  });

  it("should access its profile and manage its definitions", () => {
    interceptGraphQLAPI((req) => {
      aliasQuery(req, "Definitions");
      aliasMutation(req, "DeleteDefinition");

      if (hasOperationName(req, "Definitions")) {
        req.reply((res) => {
          res.body.data.definitions = [definition];

          res.body.errors = null;
        });
      }

      if (hasOperationName(req, "DeleteDefinition")) {
        req.reply((res) => {
          res.body.data.deleteDefinitions = definition;

          res.body.errors = null;
        });
      }
    });

    cy.dataCy("profile").click();

    cy.wait("@gqlDefinitionsQuery");

    cy.location("pathname").should("eq", "/profile");
    cy.location("search").should("eq", `?id=${author.id}`);

    cy.dataCy("username").should("contain", author.name);
    cy.dataCy("word").should("contain", definition.word);
    cy.dataCy("meaning").should("contain", definition.meaning);
    cy.dataCy("example").should("contain", definition.example);

    cy.dataCy("delete").click();

    cy.wait("@gqlDeleteDefinitionMutation");

    cy.dataCy("definition").should("not.exist");

    cy.dataCy("loading").should("exist");
  });

  it("should report a definition", () => {
    interceptGraphQLAPI((req) => {
      aliasMutation(req, "Report");

      if (hasOperationName(req, "Report")) {
        req.reply((res) => {
          res.body.data.report = report;

          res.body.errors = null;
        });
      }
    });

    cy.dataCy("report").first().click();

    cy.location("pathname").should("contain", "/report");

    cy.dataCy("reason-3-textarea").should("not.exist");

    cy.dataCy("reason-3").click();

    cy.dataCy("reason-3-textarea").should("be.visible").type(report.message);

    cy.dataCy("report").click();

    cy.dataCy("report").should("not.exist");

    cy.dataCy("message").should("contain", report.message);

    cy.dataCy("back").click();

    cy.wait("@gqlReportMutation");

    interceptGraphQLAPI((req) => {
      aliasQuery(req, "Reported");

      if (hasOperationName(req, "Reported")) {
        req.reply((res) => {
          res.body.data.report = report;

          res.body.errors = null;
        });
      }
    });

    cy.dataCy("report").first().click();

    cy.wait("@gqlReportedQuery");
  });

  it("should be able to logout", () => {
    cy.dataCy("logout").click().should("not.exist");

    cy.dataCy("profile").should("not.exist");

    cy.dataCy("login").should("be.visible");
  });
});
