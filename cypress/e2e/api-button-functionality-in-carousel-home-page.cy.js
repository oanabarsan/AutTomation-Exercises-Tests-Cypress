/// <reference types = "cypress" />

import CarouselHomePage from "../pages/CarouselHomePage";

describe("APIs button functionality in carousel home page test suite", () => {
  it("APIs button functionality located in first carousel image test", () => {
    CarouselHomePage.getFirstAPIsBtn().click();
    cy.get("div.col-sm-9 h2.title.text-center")
    .scrollIntoView()
    .within(() => {
      cy.window().then((win) => {
        cy.contains("APIs List ").then(($el) => {
          const before = win.getComputedStyle($el[0], "::before");
          const beforeContent = before.getPropertyValue("content");
          expect(beforeContent).to.equal("none");
        });
      });
    });
  });

});
