/// <reference types = "cypress" />

import BrandsCategoryPage from "../pages/BrandsCategoryPage";

describe("Navigation to Brands categories in home page test suite", () => {
  it("Navigate to Polo category test", () => {
    BrandsCategoryPage.getPoloBrandLink().click();
    cy.get("div.features_items h2.title.text-center")
      .scrollIntoView()
      .within(() => {
        cy.window().then((win) => {
          cy.contains("Brand - Polo ").then(($el) => {
            const before = win.getComputedStyle($el[0], "::before");
            const beforeContent = before.getPropertyValue("content");
            expect(beforeContent).to.equal('" "');
          });
        });
      });
  });

  it.only("Navigate to H&M category test", () => {
    BrandsCategoryPage.getHnMBrandLink().click();
    cy.get("div.features_items h2.title.text-center")
      .scrollIntoView()
      .within(() => {
        cy.window().then((win) => {
          cy.contains("Brand - H&M ").then(($el) => {
            const before = win.getComputedStyle($el[0], "::before");
            const beforeContent = before.getPropertyValue("content");
            expect(beforeContent).to.equal('" "');
          });
        });
      });
  });
  
});
