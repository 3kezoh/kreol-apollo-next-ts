describe("When you visit the home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be the first page of definition", () => {
    cy.get("[data-cy=pagination-link-1]").should("have.class", "is-current");
  });

  it("should display 5 definitions per page", () => {
    cy.get("[data-cy=definition]").should("have.length", 5);
  });
});
