import { aliasQuery, interceptGraphQLAPI } from "../utils/graphql";

describe("If the user is not authenticated", () => {
  const definition = {
    word: "Faire le délicat",
    meaning: "Fè chichi",
    example: "Gadé misié ka fè chichi - « Regarde le gars faire le délicat »",
    translation: "fr",
  };

  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to browse the definitions", function () {
    interceptGraphQLAPI((req) => {
      aliasQuery(req, "Search");
      aliasQuery(req, "Definitions");
    });

    cy.get(".pagination-link")
      .last()
      .invoke("text")
      .then(parseInt)
      .then((lastPage) => {
        cy.dataCy("definition").should("have.length", 5);

        cy.dataCy("page-6").should("not.exist");
        cy.dataCy("previous").should("not.exist");
        cy.dataCy("page-1").should("have.class", "is-current");
        cy.dataCy(`page-${lastPage}`).should("be.visible");

        for (let i = 2; i <= 5; i++) {
          cy.dataCy(`page-${i}`).should("be.visible");
        }

        cy.dataCy("page-2").scrollIntoView().click().should("have.class", "is-current");

        cy.location("search").should("eq", "?page=2");

        cy.dataCy("previous").should("be.visible");
        cy.dataCy("definition").should("have.length", 5);

        cy.dataCy("next").scrollIntoView().click();

        cy.location("search").should("eq", "?page=3");

        cy.dataCy("page-3").should("have.class", "is-current");
        cy.dataCy("definition").should("have.length.at.most", 5);

        cy.dataCy(`page-${lastPage}`).scrollIntoView().click();

        cy.location("search").should("eq", `?page=${lastPage}`);

        cy.dataCy("definition").should("have.length.at.most", 5);

        cy.dataCy("next").should("not.exist");
        cy.dataCy("page-1").should("be.visible");
        cy.dataCy(`page-${lastPage - 5}`).should("not.exist");
        cy.dataCy(`page-${lastPage}`).should("have.class", "is-current");

        for (let i = lastPage - 4; i <= lastPage - 1; i++) {
          cy.dataCy(`page-${i}`).should("be.visible");
        }

        cy.dataCy("previous").scrollIntoView({ ensureScrollable: true }).click();

        cy.location("search").should("eq", `?page=${lastPage - 1}`);

        cy.dataCy("definition").should("have.length", 5);

        cy.dataCy("next").should("be.visible");
        cy.dataCy(`page-${lastPage - 1}`).should("have.class", "is-current");

        cy.dataCy(`page-${lastPage - 2}`)
          .scrollIntoView()
          .click()
          .should("have.class", "is-current");

        cy.location("search").should("eq", `?page=${lastPage - 2}`);

        cy.dataCy("definition").should("have.length", 5);
      });

    cy.dataCy("home").click();

    cy.location("pathname").should("eq", "/");

    cy.dataCy("word")
      .first()
      .invoke("text")
      .then((word) => {
        cy.dataCy("search").type(word);

        cy.wait("@gqlSearchQuery");

        cy.dataCy(word).should("contain", word).click();

        // Cached
        cy.dataCy("loading").should("not.exist");

        cy.wait("@gqlDefinitionsQuery");

        cy.location("pathname").should("eq", `/word/${word}`);

        cy.dataCy("definition").should("have.length.at.most", 5);

        cy.dataCy("definition").filter(`:contains(${word})`).should("have.length.at.most", 5);

        const letter = word.charAt(0);

        cy.dataCy("browse").click().should("have.class", "is-active");

        // ! Click on the dropdown item is broken
        cy.dataCy(letter).click();
        // Workaround
        cy.visit(`/popular/${letter}`);

        cy.location("pathname").should("eq", `/popular/${letter}`);

        cy.dataCy("definition").each((definition) => {
          expect(definition.text().startsWith(letter)).to.be.true;
        });
      });

    cy.dataCy("definition")
      .first()
      .click()
      .invoke("text")
      .then((word) => {
        cy.dataCy("loading").should("exist");

        cy.wait("@gqlDefinitionsQuery");

        cy.location("pathname").should("eq", `/word/${word}`);

        cy.dataCy("definition").should("have.length.at.most", 5);

        cy.dataCy("definition").filter(`:contains(${word})`).should("have.length", 5);
      });

    cy.dataCy("author")
      .first()
      .click()
      .invoke("text")
      .then((author) => {
        cy.wait("@gqlDefinitionsQuery");

        cy.location("pathname").should("eq", `/author/${author}`);

        cy.dataCy("definition").should("have.length.at.most", 5);

        cy.dataCy("author").each((element) => {
          expect(element.text()).to.eq(author);
        });
      });
  });

  it("should not be able to vote the for definition", function () {
    cy.dataCy("word")
      .first()
      .invoke("text")
      .then((word) => {
        cy.dataCy(`score-${word}`)
          .invoke("text")
          .then(parseInt)
          .then((score) => {
            cy.dataCy(`upvote-${word}`).should("contain", "-").click();

            cy.get(".modal").should("be.visible").and("have.class", "is-active");

            cy.get(".modal-close").click();

            cy.dataCy(`score-${word}`).should("contain", score);

            cy.dataCy(`downvote-${word}`).should("contain", "-").click();

            cy.get(".modal").should("be.visible").and("have.class", "is-active");

            cy.dataCy(`score-${word}`).should("contain", score);
          });
      });
  });

  it("should not be able to create a definition", function () {
    cy.dataCy("define").click();

    cy.location("pathname").should("eq", "/define");

    cy.get("*:invalid").should("have.length", 3);

    cy.dataCy("word").type(definition.word);
    cy.dataCy("meaning").type(definition.meaning);
    cy.dataCy("example").type(definition.example);
    cy.dataCy("translation").select(definition.translation);

    cy.get("*:invalid").should("have.length", 0);

    cy.dataCy("submit").click();

    cy.get(".modal").should("be.visible").and("have.class", "is-active");
  });

  it("should not be able to report a definition", () => {
    cy.dataCy("report").first().click();

    cy.get(".modal").should("be.visible").and("have.class", "is-active");
  });
});
