describe("The pagination", () => {
  beforeEach(() => {
    cy.visit("/", { qs: { page: 1 } });
    cy.get(".pagination-link").last().invoke("text").then(parseInt).as("lastPage");
  });

  context("On the first page", () => {
    it("should be able to click on the next button", function () {
      cy.dataCy("page-6").should("not.exist");
      cy.dataCy("previous").should("not.exist");
      cy.dataCy("page-1").should("have.class", "is-current");
      cy.dataCy(`page-${this.lastPage}`).should("be.visible");

      for (let i = 2; i <= 5; i++) {
        cy.dataCy(`page-${i}`).should("be.visible");
      }

      cy.dataCy("next").click();

      cy.dataCy("previous").should("be.visible");
      cy.dataCy("page-2").should("have.class", "is-current");
    });
  });

  context("On the last page", () => {
    it("should be able to click on the previous button", function () {
      cy.visit("/", { qs: { page: this.lastPage } });

      cy.dataCy("next").should("not.exist");
      cy.dataCy("page-1").should("be.visible");
      cy.dataCy(`page-${this.lastPage - 5}`).should("not.exist");
      cy.dataCy(`page-${this.lastPage}`).should("have.class", "is-current");

      for (let i = this.lastPage - 4; i <= this.lastPage - 1; i++) {
        cy.dataCy(`page-${i}`).should("be.visible");
      }

      cy.dataCy("previous").click();

      cy.dataCy("next").should("be.visible");
      cy.dataCy(`page-${this.lastPage - 1}`).should("have.class", "is-current");
    });
  });
});
