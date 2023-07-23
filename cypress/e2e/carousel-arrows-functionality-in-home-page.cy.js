/// <reference types = "cypress" />

import CarouselHomePage from "../pages/CarouselHomePage";

describe("Carousel arrows functionality test suite", () => {
  it("Prev arrow carousel test", () => {
    CarouselHomePage.getPrevArrow().click();
    cy.get('img[src="/static/images/home/girl1.jpg"]').should('exist');
    CarouselHomePage.getPrevArrow().click();
    cy.get('img[src="/static/images/home/girl3.jpg"]').should('exist');
    CarouselHomePage.getPrevArrow().click();
    cy.get('img[src="/static/images/home/girl2.jpg"]').should('exist');
  });


});
