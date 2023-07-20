/// <reference types = "cypress" />
import { faker } from "@faker-js/faker";
import HeaderPage from "../pages/HeaderPage";
import ContactUsPage from "../pages/ContactUsPage";

const fullName = faker.person.fullName();
const randomEmail = faker.internet.email();
const randomSubject = faker.lorem.sentence();
const randomParagraph = faker.lorem.paragraph();
const jpgFile = "463798.jpg";
const wordFile = "test.docx";
const pdfFile = "test.pdf";
const xlsxFile = "test.xlsx";
const gifImage = "test.gif";
const mp4Video = "test.mp4";
const txtFile = "test.txt";
const pptFile = "test.pptx";
const zipFile = "test.zip";

describe("Choose file functionality with different type of documents test suite", () => {
  
  beforeEach(()=> {
    HeaderPage.getContactUsLink().click();
    cy.get("div.col-sm-12 h2")
      .scrollIntoView()
      .within(() => {
        cy.window().then((win) => {
          cy.contains("Contact ").then(($el) => {
            const before = win.getComputedStyle($el[0], "::before");
            const beforeContent = before.getPropertyValue("content");
            expect(beforeContent).to.equal('" "');
          });
        });
      });
    ContactUsPage.getNameField().type(fullName, { delay: 0 });
    ContactUsPage.getEmailField().type(randomEmail, { delay: 0 });
    ContactUsPage.getSubjectField().type(randomSubject, { delay: 0 });
    ContactUsPage.getParagraphField().type(randomParagraph, { delay: 0 });
  });
  
  it("Choose file with Word test", () => {
    
    ContactUsPage.getChooseFileBtn().selectFile("cypress/fixtures/" + wordFile);
    ContactUsPage.getSubmitBtn().click();
    cy.get("div.status.alert.alert-success")
      .contains("Success! Your details have been submitted successfully.")
      .should("be.visible");
  });

  it("Choose file with JPG document test", () => {
    
    ContactUsPage.getChooseFileBtn().selectFile("cypress/fixtures/" + jpgFile);
    ContactUsPage.getSubmitBtn().click();
    cy.get("div.status.alert.alert-success")
      .contains("Success! Your details have been submitted successfully.")
      .should("be.visible");
  });

  it("Choose file with PDF document test", () => {
    
    ContactUsPage.getChooseFileBtn().selectFile("cypress/fixtures/" + pdfFile);
    ContactUsPage.getSubmitBtn().click();
    cy.get("div.status.alert.alert-success")
      .contains("Success! Your details have been submitted successfully.")
      .should("be.visible");
  });

  it("Choose file with XSLX file test", () => {
    
    ContactUsPage.getChooseFileBtn().selectFile("cypress/fixtures/" + xlsxFile);
    ContactUsPage.getSubmitBtn().click();
    cy.get("div.status.alert.alert-success")
      .contains("Success! Your details have been submitted successfully.")
      .should("be.visible");
  });

  it("Choose file with GIF image test", () => {
    
    ContactUsPage.getChooseFileBtn().selectFile("cypress/fixtures/" + gifImage);
    ContactUsPage.getSubmitBtn().click();
    cy.get("div.status.alert.alert-success")
      .contains("Success! Your details have been submitted successfully.")
      .should("be.visible");
  });

  it("Choose file with mp4 video test", () => {
    
    ContactUsPage.getChooseFileBtn().selectFile("cypress/fixtures/" + mp4Video);
    ContactUsPage.getSubmitBtn().click();
    cy.get("div.status.alert.alert-success")
      .contains("Success! Your details have been submitted successfully.")
      .should("be.visible");
  });

  it("Choose file with txt file test", () => {
    
    ContactUsPage.getChooseFileBtn().selectFile("cypress/fixtures/" + txtFile);
    ContactUsPage.getSubmitBtn().click();
    cy.get("div.status.alert.alert-success")
      .contains("Success! Your details have been submitted successfully.")
      .should("be.visible");
  });

  it("Choose file with pptx file test", () => {
    
    ContactUsPage.getChooseFileBtn().selectFile("cypress/fixtures/" + pptFile);
    ContactUsPage.getSubmitBtn().click();
    cy.get("div.status.alert.alert-success")
      .contains("Success! Your details have been submitted successfully.")
      .should("be.visible");
  });

  it("Choose file with ZIP file test", () => {
    
    ContactUsPage.getChooseFileBtn().selectFile("cypress/fixtures/" + zipFile);
    ContactUsPage.getSubmitBtn().click();
    cy.get("div.status.alert.alert-success")
      .contains("Success! Your details have been submitted successfully.")
      .should("be.visible");
  });

  afterEach(()=>{
    ContactUsPage.getHomeBtn().click();
    cy.get('div.col-sm-6 h2').contains('Full-Fledged practice website ').should('be.visible');
  })

});
