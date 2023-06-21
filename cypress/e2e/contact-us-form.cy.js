/// <reference types = "cypress" />
import { faker } from "@faker-js/faker";
import HeaderPage from "../pages/HeaderPage";
import ContactUsPage from "../pages/ContactUsPage";

const fullName = faker.person.fullName()
const randomEmail = faker.internet.email();
const randomSubject = faker.lorem.sentence();
const randomParagraph = faker.lorem.paragraph();
const fileName = "463798.jpg";

describe("Contact us test suite", () => {

  it("Contact us test", () => {
    HeaderPage.getContactUsLink().click();
    ContactUsPage.getNameField().type(fullName, { delay: 0});
    ContactUsPage.getEmailField().type(randomEmail, { delay: 0});
    ContactUsPage.getSubjectField().type(randomSubject, { delay: 0});
    ContactUsPage.getParagraphField().type(randomParagraph, { delay: 0});
    ContactUsPage.getChooseFileBtn().selectFile("cypress/fixtures/" + fileName);
    ContactUsPage.getSubmitBtn().click();
    cy.get('div.status.alert.alert-success').contains('Success! Your details have been submitted successfully.').should('be.visible');
  });
 
});