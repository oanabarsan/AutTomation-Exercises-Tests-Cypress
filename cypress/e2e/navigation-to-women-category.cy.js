/// <reference types = "cypress" />

import HeaderPage from "../pages/HeaderPage";
import HomeCategoryLinksPage from "../pages/HomeCategoryLinksPage";

describe("Navigation to Women categories in home page test suite", () => {
  beforeEach(() => {
    HomeCategoryLinksPage.getWomenCategoryLink().click();
  });
  it("Navigate to dress category test", () => {
    HomeCategoryLinksPage.getDressCategory().click();
    cy.get("div.features_items h2.title.text-center")
      .scrollIntoView()
      .within(() => {
        cy.window().then((win) => {
          cy.contains("Women - Dress Products").then(($el) => {
            const before = win.getComputedStyle($el[0], "::before");
            const beforeContent = before.getPropertyValue("content");
            expect(beforeContent).to.equal('" "');
          });
        });
      });
  });

  it("Navigate to Tops category test", () => {
    HomeCategoryLinksPage.getTopsCategory().click();
    cy.get("div.features_items h2.title.text-center")
      .scrollIntoView()
      .within(() => {
        cy.window().then((win) => {
          cy.contains("Women - Tops Products").then(($el) => {
            const before = win.getComputedStyle($el[0], "::before");
            const beforeContent = before.getPropertyValue("content");
            expect(beforeContent).to.equal('" "');
          });
        });
      });
  });

  it("Navigate to Saree category test", () => {
    HomeCategoryLinksPage.getSareeCategory().click();
    cy.get("div.features_items h2.title.text-center")
      .scrollIntoView()
      .within(() => {
        cy.window().then((win) => {
          cy.contains("Women - Saree Products").then(($el) => {
            const before = win.getComputedStyle($el[0], "::before");
            const beforeContent = before.getPropertyValue("content");
            expect(beforeContent).to.equal('" "');
          });
        });
      });
  });
});
