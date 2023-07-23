/// <reference types = "cypress" />

describe("Default carousel movement functionality test suite", () => {
  it("Default carousel movement test", () => {
    cy.clock();
    cy.get("div.carousel-inner")
      .find("div.item.active")
      .invoke("index")
      .should("eq", 0);

    cy.tick(3000);

    cy.get("div.carousel-inner")
      .find("div.item.active")
      .invoke("index")
      .should("eq", 1);

    cy.tick(3000);

    cy.get("div.carousel-inner")
      .find("div.item.active")
      .invoke("index")
      .should("eq", 2);
  });
});
