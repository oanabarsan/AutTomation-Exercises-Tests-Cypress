/// <reference types = "cypress" />
import { faker } from "@faker-js/faker";
import HeaderPage from "../pages/HeaderPage";
import AuthPage from "../pages/AuthPage";
import RegisterFormPage from "../pages/RegisterFormPage";

let maxBirthYear = new Date().getFullYear();

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const fullName = firstName + lastName;
const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password();
const birthDay = faker.helpers.rangeToNumber({ min: 1, max: 30 });
const birthYear = faker.helpers.rangeToNumber({ min: 1900, max: maxBirthYear });
const birthMonth = faker.date.month();
const companyName = faker.company.name();
const address = faker.location.streetAddress();
const myCountryArray = [
  "India",
  "United States",
  "Canada",
  "Australia",
  "Israel",
  "New Zealand",
  "Singapore",
];
const country =
  myCountryArray[Math.floor(Math.random() * myCountryArray.length)];
const randomState = faker.location.state();
const randomCity = faker.location.city();
const randomZipCode = faker.location.zipCode();
const randomPhoneNumber = faker.phone.number();
const incorrectEmail = faker.internet.email();
const incorrectPassword = faker.internet.password();

describe("Register user test suite", () => {
  beforeEach(() => {
    cy.visit("https://www.automationexercise.com/");
    cy.get('ul.nav.navbar-nav li a[href="/"]').should("exist");
  });

  it("Register with valid creds", () => {
    HeaderPage.getHomeLink().should("exist");
    HeaderPage.getSignupLink().click();
    AuthPage.getSignupTitle().should("exist");
    AuthPage.getNameField().type(fullName);
    AuthPage.getEmailField().type(randomEmail);
    AuthPage.getSubmitBtn().click();
    RegisterFormPage.getRegisterTitle().should("exist");
    RegisterFormPage.getGenderRadioBtn().check().should("be.checked");
    RegisterFormPage.getNameField().contains(fullName).should("be.visible");
    RegisterFormPage.getEmailField().contains(randomEmail).should("be.visible");
    RegisterFormPage.getPasswordField().type(randomPassword);
    RegisterFormPage.getBirthDay().select(birthDay);
    RegisterFormPage.getBirthDay().select(birthMonth);
    RegisterFormPage.getBirthYear().select(birthYear);
    RegisterFormPage.getNewsletterCheckbox().check().should("be.checked");
    RegisterFormPage.getOffersCheckbox().check().should("be.checked");
    RegisterFormPage.getFirstName().type(firstName);
    RegisterFormPage.getLastName().type(lastName);
    RegisterFormPage.getCompanyName().type(companyName);
    RegisterFormPage.getStreetAddress().type(address);
    RegisterFormPage.getCountry().select(country);
    RegisterFormPage.getState().type(randomState);
    RegisterFormPage.getCity().type(randomCity);
    RegisterFormPage.getZipCode().type(randomZipCode);
    RegisterFormPage.getPhoneNumber().type(randomPhoneNumber);
    RegisterFormPage.getCreateAccountBtn().click();
    cy.get('h2[data-qa="account-created"]')
      .contains("ACCOUNT CREATED!")
      .should("be.visible");
    RegisterFormPage.getContinueBtn().click();
    RegisterFormPage.getDismissBtn().click();
    cy.get("ul.nav.navbar-nav li:nth-child(10) a").contains(
      ` Logged in as ${fullName}`
    );
  });

  it("Log out test", () => {
    HeaderPage.getHomeLink().should("exist");
    HeaderPage.getLogoutLink().click();
    cy.get('ul.nav.navbar-nav li a[href="/login"]').should("be.visible");
  });

  it("Log in test", () => {
    HeaderPage.getHomeLink().should("exist");
    HeaderPage.getSignupLink().click();
    AuthPage.getLoginTitle().should("exist");
    AuthPage.getLoginEmail().type(randomEmail);
    AuthPage.getLoginPassword().type(randomPassword);
    AuthPage.getLoginBtn().click();
    cy.get("ul.nav.navbar-nav li:nth-child(10) a").contains(
      ` Logged in as ${fullName}`
    ).should("be.visible");
  });

  it("Try to log in with invalid email and password test", () => {
    HeaderPage.getHomeLink().should("exist");
    HeaderPage.getSignupLink().click();
    AuthPage.getLoginTitle().should("exist");
    AuthPage.getLoginEmail().type(incorrectEmail);
    AuthPage.getLoginPassword().type(incorrectPassword);
    AuthPage.getLoginBtn().click();
    cy.get('form[action="/login"] p').contains(
      "Your email or password is incorrect!"
    ).should("be.visible");
  });
});
