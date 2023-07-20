/// <reference types = "cypress" />

import HeaderPage from "../pages/HeaderPage";

describe("Navbar hyperlinks test suite", () => {
  it("Home page hyperlink test", () => {
    HeaderPage.getHomeLink.click();
    cy.get('div.col-sm-6 h2').contains('Full-Fledged practice website ').should('be.visible');
  });

  it("All products page hyperlink test", () => {
   HeaderPage.getProductsLink.click();
   cy.get("div.features_items h2.title.text-center")
   .scrollIntoView()
   .within(() => {
     cy.window().then((win) => {
       cy.contains("All Products").then(($el) => {
         const before = win.getComputedStyle($el[0], "::before");
         const beforeContent = before.getPropertyValue("content");
         expect(beforeContent).to.equal('" "');
       });
     });
   });
  });
  it("Cart page hyperlink test", () => {
HeaderPage.getCartLink().click();

   });
});
