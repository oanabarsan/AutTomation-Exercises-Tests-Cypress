/// <reference types = "cypress" />

import { faker } from "@faker-js/faker";
import FooterPage from "../pages/FooterPage";

 const email = faker.internet.email();
 const invalidEmail = "invalidemail@"

describe("Subscribe to newsletter test suite", () => {
  it("Subscribe to newsletter test", () => {
    FooterPage.getFooter().scrollIntoView();
    FooterPage.getSubscribeField().type(email);
    FooterPage.getSubscribeBtn().click();
    cy.get('div.alert-success.alert').contains('You have been successfully subscribed!').should('be.visible');
  });

  it("Subscribe to newsletter using invalid email test", () => {
    FooterPage.getFooter().scrollIntoView();
    FooterPage.getSubscribeField().type(invalidEmail);
    FooterPage.getSubscribeBtn().click();
    cy.get('#susbscribe_email:invalid')
  .invoke('prop', 'validationMessage')
  .should('exist');
  });
});
