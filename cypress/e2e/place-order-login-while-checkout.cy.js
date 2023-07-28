/// <reference types = "cypress" />

import HeaderPage from "../pages/HeaderPage";
import AllProductsPage from "../pages/AllProductsPage";
import CartPage from "../pages/CartPage";
import AuthPage from "../pages/AuthPage";
import { faker } from "@faker-js/faker";
import CheckoutPage from "../pages/CheckoutPage";
import PaymentPage from "../pages/PaymentPage";
import RegisterFormPage from "../pages/RegisterFormPage";

const loginEmail = faker.internet.email();;
const loginPassword = faker.internet.password();
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const fullName = firstName + " " + lastName;
const birthDay = faker.helpers.rangeToNumber({ min: 1, max: 30 });
const birthMonth = faker.date.month();
const birthYear = "1990";
const confirmationFullName = fullName;
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
const fullAddress =
  randomCity + " " + randomState + "\n\t\t\t\t\t\t\t\t" + randomZipCode;
const priceFirstItem = 500;
const priceSecondItem = 400;
const totalPrice = priceFirstItem + priceSecondItem;
const additionalComment = faker.lorem.sentence({ min: 10, max: 20 });
const cardNumber = faker.finance.creditCardNumber();
const cardCVC = faker.finance.creditCardCVV();
const randomMonthNumber = Math.floor(Math.random() * 12) + 1;
const randomYearNumber = faker.helpers.rangeToNumber({
  min: new Date().getFullYear(),
  max: 2030,
});

describe("Place order and login while checkout test suite", () => {
  beforeEach(() => {
    HeaderPage.getSignupLink().click();
    AuthPage.getSignupTitle().should("exist");
    AuthPage.getNameField().type(fullName, { delay: 0 });
    AuthPage.getEmailField().type(loginEmail, { delay: 0 });
    AuthPage.getSubmitBtn().click();
    RegisterFormPage.getGenderRadioBtn().check().should("be.checked");
    RegisterFormPage.getNameField().should("have.value", confirmationFullName);
    RegisterFormPage.getEmailField().should("have.value", loginEmail);
    RegisterFormPage.getPasswordField().type(loginPassword, { delay: 0 });
    RegisterFormPage.getBirthDay().select(birthDay);
    RegisterFormPage.getBirthMonth().select(birthMonth, { force: true });
    RegisterFormPage.getBirthYear().select(birthYear, { force: true });
    RegisterFormPage.getNewsletterCheckbox().check().should("be.checked");
    RegisterFormPage.getOffersCheckbox().check().should("be.checked");
    RegisterFormPage.getFirstName().type(firstName, { delay: 0 });
    RegisterFormPage.getLastName().type(lastName, { delay: 0 });
    RegisterFormPage.getStreetAddress().type(address, { delay: 0 });
    RegisterFormPage.getCountry().select(country);
    RegisterFormPage.getState().type(randomState, { delay: 0 });
    RegisterFormPage.getCity().type(randomCity, { delay: 0 });
    RegisterFormPage.getZipCode().type(randomZipCode, { delay: 0 });
    RegisterFormPage.getPhoneNumber().type(randomPhoneNumber, { delay: 0 });
    RegisterFormPage.getCreateAccountBtn().click();
    cy.get("div.col-sm-9.col-sm-offset-1>p")
      .contains(
        "Congratulations! Your new account has been successfully created!"
      )
      .should("be.visible");
    RegisterFormPage.getContinueBtn().click();
    cy.get("ul.nav.navbar-nav li:nth-child(10) a")
      .contains(` Logged in as ${fullName}`)
      .should("be.visible");
    HeaderPage.getLogoutLink().click();
  });

  it("Place order and login while checkout test", () => {
    HeaderPage.getProductsLink().click();
    AllProductsPage.getAddFirstProduct().click();
    AllProductsPage.getContinueShoppingBtn().click();
    AllProductsPage.getAddSecondProduct().click();
    AllProductsPage.getViewCartBtn().click();
    cy.get("tr.cart_menu td").should(($tds) => {
      expect($tds).to.have.length(6);
      expect($tds[0]).to.have.text("Item");
      expect($tds[1]).to.have.text("Description");
      expect($tds[2]).to.have.text("Price");
      expect($tds[3]).to.have.text("Quantity");
      expect($tds[4]).to.have.text("Total");
      expect($tds[5]).to.have.text("");
    });
    cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
    cy.get('a[href="/product_details/2"]')
      .contains("Men Tshirt")
      .should("exist");
    cy.get('tr[id="product-1"] td.cart_price p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_price p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('tr[id="product-1"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-2"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-1"] td.cart_total p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_total p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    CartPage.getProceedToCheckoutBtn().click();
    CartPage.getRegisterLoginLink().click();
    AuthPage.login(loginEmail, loginPassword);
    cy.get("ul.nav.navbar-nav li:nth-child(10) a")
      .contains(` Logged in as `)
      .should("be.visible");
    HeaderPage.getCartLink().click();
    CartPage.getProceedToCheckoutBtn().click();
    cy.get("div.step-one h2.heading")
      .contains("Address Details")
      .should("exist");
    cy.get("ul.address.item.box li").should(($lis) => {
      expect($lis).to.have.length(8);
      expect($lis[0]).to.have.attr("class", "address_title");
      expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
      expect($lis[2]).to.have.text("");
      expect($lis[3]).to.have.text(address);
      expect($lis[4]).to.have.text("");
      expect($lis[5]).to.have.text(fullAddress);
      expect($lis[6]).to.have.text(country);
      expect($lis[7]).to.have.text(randomPhoneNumber);
    });
    cy.get("ul.address.alternate_item.box li").should(($lis) => {
      expect($lis).to.have.length(8);
      expect($lis[0]).to.have.attr("class", "address_title");
      expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
      expect($lis[2]).to.have.text("");
      expect($lis[3]).to.have.text(address);
      expect($lis[4]).to.have.text("");
      expect($lis[5]).to.have.text(fullAddress);
      expect($lis[6]).to.have.text(country);
      expect($lis[7]).to.have.text(randomPhoneNumber);
    });
    cy.get("div.step-one h2.heading")
      .contains("Review Your Order")
      .should("exist");
    cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
    cy.get('a[href="/product_details/2"]')
      .contains("Men Tshirt")
      .should("exist");
    cy.get('tr[id="product-1"] td.cart_price p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_price p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('tr[id="product-1"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-2"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-1"] td.cart_total p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_total p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('td[colspan="2"] h4')
      .children("b")
      .should("have.text", "Total Amount");
    cy.get("td p.cart_total_price")
      .contains(`Rs. ${totalPrice}`)
      .should("be.visible");
    CheckoutPage.getMessageField().type(additionalComment, { delay: 0 });
    CheckoutPage.getPlaceOrderBtn().click();
    PaymentPage.getNameField().type(fullName, { delay: 0 });
    PaymentPage.getCardNumberField().type(cardNumber, { delay: 0 });
    PaymentPage.getCardCVC().type(cardCVC, { delay: 0 });
    PaymentPage.getExpirationMonth().type(randomMonthNumber, { delay: 0 });
    PaymentPage.getExpirationYear().type(randomYearNumber, { delay: 0 });
    PaymentPage.getConfirmOrderBtn().click();
    cy.on("window:confirm", (t) => {
      expect(t).to.equal(" Your order has been placed successfully! ");
    });
    cy.get("div.col-sm-9.col-sm-offset-1 p")
      .contains("Congratulations! Your order has been confirmed!")
      .should("exist");
    HeaderPage.getDeleteAccount().click();
    cy.get("div.col-sm-9.col-sm-offset-1 p:nth-child(2)")
      .contains("Your account has been permanently deleted!")
      .should("be.visible");
  });

  it("Try to place order with no card name inserted in card name field test", () => {
    HeaderPage.getProductsLink().click();
    AllProductsPage.getAddFirstProduct().click();
    AllProductsPage.getContinueShoppingBtn().click();
    AllProductsPage.getAddSecondProduct().click();
    AllProductsPage.getViewCartBtn().click();
    cy.get("tr.cart_menu td").should(($tds) => {
      expect($tds).to.have.length(6);
      expect($tds[0]).to.have.text("Item");
      expect($tds[1]).to.have.text("Description");
      expect($tds[2]).to.have.text("Price");
      expect($tds[3]).to.have.text("Quantity");
      expect($tds[4]).to.have.text("Total");
      expect($tds[5]).to.have.text("");
    });
    cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
    cy.get('a[href="/product_details/2"]')
      .contains("Men Tshirt")
      .should("exist");
    cy.get('tr[id="product-1"] td.cart_price p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_price p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('tr[id="product-1"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-2"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-1"] td.cart_total p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_total p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    CartPage.getProceedToCheckoutBtn().click();
    CartPage.getRegisterLoginLink().click();
    AuthPage.login(loginEmail, loginPassword);
    cy.get("ul.nav.navbar-nav li:nth-child(10) a")
      .contains(` Logged in as `)
      .should("be.visible");
    HeaderPage.getCartLink().click();
    CartPage.getProceedToCheckoutBtn().click();
    cy.get("div.step-one h2.heading")
      .contains("Address Details")
      .should("exist");
    cy.get("ul.address.item.box li").should(($lis) => {
      expect($lis).to.have.length(8);
      expect($lis[0]).to.have.attr("class", "address_title");
      expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
      expect($lis[2]).to.have.text("");
      expect($lis[3]).to.have.text(address);
      expect($lis[4]).to.have.text("");
      expect($lis[5]).to.have.text(fullAddress);
      expect($lis[6]).to.have.text(country);
      expect($lis[7]).to.have.text(randomPhoneNumber);
    });
    cy.get("ul.address.alternate_item.box li").should(($lis) => {
      expect($lis).to.have.length(8);
      expect($lis[0]).to.have.attr("class", "address_title");
      expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
      expect($lis[2]).to.have.text("");
      expect($lis[3]).to.have.text(address);
      expect($lis[4]).to.have.text("");
      expect($lis[5]).to.have.text(fullAddress);
      expect($lis[6]).to.have.text(country);
      expect($lis[7]).to.have.text(randomPhoneNumber);
    });
    cy.get("div.step-one h2.heading")
      .contains("Review Your Order")
      .should("exist");
    cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
    cy.get('a[href="/product_details/2"]')
      .contains("Men Tshirt")
      .should("exist");
    cy.get('tr[id="product-1"] td.cart_price p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_price p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('tr[id="product-1"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-2"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-1"] td.cart_total p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_total p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('td[colspan="2"] h4')
      .children("b")
      .should("have.text", "Total Amount");
    cy.get("td p.cart_total_price")
      .contains(`Rs. ${totalPrice}`)
      .should("be.visible");
    CheckoutPage.getMessageField().type(additionalComment, { delay: 0 });
    CheckoutPage.getPlaceOrderBtn().click();
    PaymentPage.getCardNumberField().type(cardNumber, { delay: 0 });
    PaymentPage.getCardCVC().type(cardCVC, { delay: 0 });
    PaymentPage.getExpirationMonth().type(randomMonthNumber, { delay: 0 });
    PaymentPage.getExpirationYear().type(randomYearNumber, { delay: 0 });
    PaymentPage.getConfirmOrderBtn().click();
    cy.get('div.col-sm-12.form-group input[data-qa="name-on-card"]')
    .invoke("prop", "validationMessage")
    .should("exist");
    HeaderPage.getDeleteAccount().click();
    cy.get("div.col-sm-9.col-sm-offset-1 p:nth-child(2)")
      .contains("Your account has been permanently deleted!")
      .should("be.visible");
  });

  it("Try to place order with no card number inserted in card number field test", () => {
    HeaderPage.getProductsLink().click();
    AllProductsPage.getAddFirstProduct().click();
    AllProductsPage.getContinueShoppingBtn().click();
    AllProductsPage.getAddSecondProduct().click();
    AllProductsPage.getViewCartBtn().click();
    cy.get("tr.cart_menu td").should(($tds) => {
      expect($tds).to.have.length(6);
      expect($tds[0]).to.have.text("Item");
      expect($tds[1]).to.have.text("Description");
      expect($tds[2]).to.have.text("Price");
      expect($tds[3]).to.have.text("Quantity");
      expect($tds[4]).to.have.text("Total");
      expect($tds[5]).to.have.text("");
    });
    cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
    cy.get('a[href="/product_details/2"]')
      .contains("Men Tshirt")
      .should("exist");
    cy.get('tr[id="product-1"] td.cart_price p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_price p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('tr[id="product-1"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-2"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-1"] td.cart_total p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_total p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    CartPage.getProceedToCheckoutBtn().click();
    CartPage.getRegisterLoginLink().click();
    AuthPage.login(loginEmail, loginPassword);
    cy.get("ul.nav.navbar-nav li:nth-child(10) a")
      .contains(` Logged in as `)
      .should("be.visible");
    HeaderPage.getCartLink().click();
    CartPage.getProceedToCheckoutBtn().click();
    cy.get("div.step-one h2.heading")
      .contains("Address Details")
      .should("exist");
    cy.get("ul.address.item.box li").should(($lis) => {
      expect($lis).to.have.length(8);
      expect($lis[0]).to.have.attr("class", "address_title");
      expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
      expect($lis[2]).to.have.text("");
      expect($lis[3]).to.have.text(address);
      expect($lis[4]).to.have.text("");
      expect($lis[5]).to.have.text(fullAddress);
      expect($lis[6]).to.have.text(country);
      expect($lis[7]).to.have.text(randomPhoneNumber);
    });
    cy.get("ul.address.alternate_item.box li").should(($lis) => {
      expect($lis).to.have.length(8);
      expect($lis[0]).to.have.attr("class", "address_title");
      expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
      expect($lis[2]).to.have.text("");
      expect($lis[3]).to.have.text(address);
      expect($lis[4]).to.have.text("");
      expect($lis[5]).to.have.text(fullAddress);
      expect($lis[6]).to.have.text(country);
      expect($lis[7]).to.have.text(randomPhoneNumber);
    });
    cy.get("div.step-one h2.heading")
      .contains("Review Your Order")
      .should("exist");
    cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
    cy.get('a[href="/product_details/2"]')
      .contains("Men Tshirt")
      .should("exist");
    cy.get('tr[id="product-1"] td.cart_price p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_price p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('tr[id="product-1"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-2"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-1"] td.cart_total p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_total p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('td[colspan="2"] h4')
      .children("b")
      .should("have.text", "Total Amount");
    cy.get("td p.cart_total_price")
      .contains(`Rs. ${totalPrice}`)
      .should("be.visible");
    CheckoutPage.getMessageField().type(additionalComment, { delay: 0 });
    CheckoutPage.getPlaceOrderBtn().click();
    PaymentPage.getNameField().type(fullName, { delay: 0 });
    PaymentPage.getCardCVC().type(cardCVC, { delay: 0 });
    PaymentPage.getExpirationMonth().type(randomMonthNumber, { delay: 0 });
    PaymentPage.getExpirationYear().type(randomYearNumber, { delay: 0 });
    PaymentPage.getConfirmOrderBtn().click();
    cy.get('div.col-sm-12.form-group input[data-qa="card-number"]')
    .invoke("prop", "validationMessage")
    .should("exist");
    HeaderPage.getDeleteAccount().click();
    cy.get("div.col-sm-9.col-sm-offset-1 p:nth-child(2)")
      .contains("Your account has been permanently deleted!")
      .should("be.visible");
  });

  it("Try to place order with no CVC inserted in CVC field test", () => {
    HeaderPage.getProductsLink().click();
    AllProductsPage.getAddFirstProduct().click();
    AllProductsPage.getContinueShoppingBtn().click();
    AllProductsPage.getAddSecondProduct().click();
    AllProductsPage.getViewCartBtn().click();
    cy.get("tr.cart_menu td").should(($tds) => {
      expect($tds).to.have.length(6);
      expect($tds[0]).to.have.text("Item");
      expect($tds[1]).to.have.text("Description");
      expect($tds[2]).to.have.text("Price");
      expect($tds[3]).to.have.text("Quantity");
      expect($tds[4]).to.have.text("Total");
      expect($tds[5]).to.have.text("");
    });
    cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
    cy.get('a[href="/product_details/2"]')
      .contains("Men Tshirt")
      .should("exist");
    cy.get('tr[id="product-1"] td.cart_price p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_price p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('tr[id="product-1"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-2"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-1"] td.cart_total p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_total p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    CartPage.getProceedToCheckoutBtn().click();
    CartPage.getRegisterLoginLink().click();
    AuthPage.login(loginEmail, loginPassword);
    cy.get("ul.nav.navbar-nav li:nth-child(10) a")
      .contains(` Logged in as `)
      .should("be.visible");
    HeaderPage.getCartLink().click();
    CartPage.getProceedToCheckoutBtn().click();
    cy.get("div.step-one h2.heading")
      .contains("Address Details")
      .should("exist");
    cy.get("ul.address.item.box li").should(($lis) => {
      expect($lis).to.have.length(8);
      expect($lis[0]).to.have.attr("class", "address_title");
      expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
      expect($lis[2]).to.have.text("");
      expect($lis[3]).to.have.text(address);
      expect($lis[4]).to.have.text("");
      expect($lis[5]).to.have.text(fullAddress);
      expect($lis[6]).to.have.text(country);
      expect($lis[7]).to.have.text(randomPhoneNumber);
    });
    cy.get("ul.address.alternate_item.box li").should(($lis) => {
      expect($lis).to.have.length(8);
      expect($lis[0]).to.have.attr("class", "address_title");
      expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
      expect($lis[2]).to.have.text("");
      expect($lis[3]).to.have.text(address);
      expect($lis[4]).to.have.text("");
      expect($lis[5]).to.have.text(fullAddress);
      expect($lis[6]).to.have.text(country);
      expect($lis[7]).to.have.text(randomPhoneNumber);
    });
    cy.get("div.step-one h2.heading")
      .contains("Review Your Order")
      .should("exist");
    cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
    cy.get('a[href="/product_details/2"]')
      .contains("Men Tshirt")
      .should("exist");
    cy.get('tr[id="product-1"] td.cart_price p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_price p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('tr[id="product-1"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-2"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-1"] td.cart_total p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_total p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('td[colspan="2"] h4')
      .children("b")
      .should("have.text", "Total Amount");
    cy.get("td p.cart_total_price")
      .contains(`Rs. ${totalPrice}`)
      .should("be.visible");
    CheckoutPage.getMessageField().type(additionalComment, { delay: 0 });
    CheckoutPage.getPlaceOrderBtn().click();
    PaymentPage.getNameField().type(fullName, { delay: 0 });
    PaymentPage.getCardNumberField().type(cardNumber, { delay: 0 });
    PaymentPage.getExpirationMonth().type(randomMonthNumber, { delay: 0 });
    PaymentPage.getExpirationYear().type(randomYearNumber, { delay: 0 });
    PaymentPage.getConfirmOrderBtn().click();
    cy.get('div.col-sm-4.form-group.cvc input[data-qa="cvc"]')
    .invoke("prop", "validationMessage")
    .should("exist");
    HeaderPage.getDeleteAccount().click();
    cy.get("div.col-sm-9.col-sm-offset-1 p:nth-child(2)")
      .contains("Your account has been permanently deleted!")
      .should("be.visible");
  });
  it("Place order with month inserted in expiration month field test", () => {
      HeaderPage.getProductsLink().click();
      AllProductsPage.getAddFirstProduct().click();
      AllProductsPage.getContinueShoppingBtn().click();
      AllProductsPage.getAddSecondProduct().click();
      AllProductsPage.getViewCartBtn().click();
      cy.get("tr.cart_menu td").should(($tds) => {
        expect($tds).to.have.length(6);
        expect($tds[0]).to.have.text("Item");
        expect($tds[1]).to.have.text("Description");
        expect($tds[2]).to.have.text("Price");
        expect($tds[3]).to.have.text("Quantity");
        expect($tds[4]).to.have.text("Total");
        expect($tds[5]).to.have.text("");
      });
      cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
      cy.get('a[href="/product_details/2"]')
        .contains("Men Tshirt")
        .should("exist");
      cy.get('tr[id="product-1"] td.cart_price p')
        .contains(`Rs. ${priceFirstItem}`)
        .should("be.visible");
      cy.get('tr[id="product-2"] td.cart_price p')
        .contains(`Rs. ${priceSecondItem}`)
        .should("be.visible");
      cy.get('tr[id="product-1"] button.disabled')
        .contains("1")
        .should("be.visible");
      cy.get('tr[id="product-2"] button.disabled')
        .contains("1")
        .should("be.visible");
      cy.get('tr[id="product-1"] td.cart_total p')
        .contains(`Rs. ${priceFirstItem}`)
        .should("be.visible");
      cy.get('tr[id="product-2"] td.cart_total p')
        .contains(`Rs. ${priceSecondItem}`)
        .should("be.visible");
      CartPage.getProceedToCheckoutBtn().click();
      CartPage.getRegisterLoginLink().click();
      AuthPage.login(loginEmail, loginPassword);
      cy.get("ul.nav.navbar-nav li:nth-child(10) a")
        .contains(` Logged in as `)
        .should("be.visible");
      HeaderPage.getCartLink().click();
      CartPage.getProceedToCheckoutBtn().click();
      cy.get("div.step-one h2.heading")
        .contains("Address Details")
        .should("exist");
      cy.get("ul.address.item.box li").should(($lis) => {
        expect($lis).to.have.length(8);
        expect($lis[0]).to.have.attr("class", "address_title");
        expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
        expect($lis[2]).to.have.text("");
        expect($lis[3]).to.have.text(address);
        expect($lis[4]).to.have.text("");
        expect($lis[5]).to.have.text(fullAddress);
        expect($lis[6]).to.have.text(country);
        expect($lis[7]).to.have.text(randomPhoneNumber);
      });
      cy.get("ul.address.alternate_item.box li").should(($lis) => {
        expect($lis).to.have.length(8);
        expect($lis[0]).to.have.attr("class", "address_title");
        expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
        expect($lis[2]).to.have.text("");
        expect($lis[3]).to.have.text(address);
        expect($lis[4]).to.have.text("");
        expect($lis[5]).to.have.text(fullAddress);
        expect($lis[6]).to.have.text(country);
        expect($lis[7]).to.have.text(randomPhoneNumber);
      });
      cy.get("div.step-one h2.heading")
        .contains("Review Your Order")
        .should("exist");
      cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
      cy.get('a[href="/product_details/2"]')
        .contains("Men Tshirt")
        .should("exist");
      cy.get('tr[id="product-1"] td.cart_price p')
        .contains(`Rs. ${priceFirstItem}`)
        .should("be.visible");
      cy.get('tr[id="product-2"] td.cart_price p')
        .contains(`Rs. ${priceSecondItem}`)
        .should("be.visible");
      cy.get('tr[id="product-1"] button.disabled')
        .contains("1")
        .should("be.visible");
      cy.get('tr[id="product-2"] button.disabled')
        .contains("1")
        .should("be.visible");
      cy.get('tr[id="product-1"] td.cart_total p')
        .contains(`Rs. ${priceFirstItem}`)
        .should("be.visible");
      cy.get('tr[id="product-2"] td.cart_total p')
        .contains(`Rs. ${priceSecondItem}`)
        .should("be.visible");
      cy.get('td[colspan="2"] h4')
        .children("b")
        .should("have.text", "Total Amount");
      cy.get("td p.cart_total_price")
        .contains(`Rs. ${totalPrice}`)
        .should("be.visible");
      CheckoutPage.getMessageField().type(additionalComment, { delay: 0 });
      CheckoutPage.getPlaceOrderBtn().click();
      PaymentPage.getNameField().type(fullName, { delay: 0 });
      PaymentPage.getCardNumberField().type(cardNumber, { delay: 0 });
      PaymentPage.getCardCVC().type(cardCVC, { delay: 0 });
      PaymentPage.getExpirationYear().type(randomYearNumber, { delay: 0 });
      PaymentPage.getConfirmOrderBtn().click();
      cy.get('div.col-sm-4.form-group.expiration input[data-qa="expiry-month"]')
      .invoke("prop", "validationMessage")
      .should("exist");
      HeaderPage.getDeleteAccount().click();
      cy.get("div.col-sm-9.col-sm-offset-1 p:nth-child(2)")
        .contains("Your account has been permanently deleted!")
        .should("be.visible");
    });

  it("Try to place order with no year inserted in expiration year field test", () => {
    HeaderPage.getProductsLink().click();
    AllProductsPage.getAddFirstProduct().click();
    AllProductsPage.getContinueShoppingBtn().click();
    AllProductsPage.getAddSecondProduct().click();
    AllProductsPage.getViewCartBtn().click();
    cy.get("tr.cart_menu td").should(($tds) => {
      expect($tds).to.have.length(6);
      expect($tds[0]).to.have.text("Item");
      expect($tds[1]).to.have.text("Description");
      expect($tds[2]).to.have.text("Price");
      expect($tds[3]).to.have.text("Quantity");
      expect($tds[4]).to.have.text("Total");
      expect($tds[5]).to.have.text("");
    });
    cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
    cy.get('a[href="/product_details/2"]')
      .contains("Men Tshirt")
      .should("exist");
    cy.get('tr[id="product-1"] td.cart_price p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_price p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('tr[id="product-1"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-2"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-1"] td.cart_total p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_total p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    CartPage.getProceedToCheckoutBtn().click();
    CartPage.getRegisterLoginLink().click();
    AuthPage.login(loginEmail, loginPassword);
    cy.get("ul.nav.navbar-nav li:nth-child(10) a")
      .contains(` Logged in as `)
      .should("be.visible");
    HeaderPage.getCartLink().click();
    CartPage.getProceedToCheckoutBtn().click();
    cy.get("div.step-one h2.heading")
      .contains("Address Details")
      .should("exist");
    cy.get("ul.address.item.box li").should(($lis) => {
      expect($lis).to.have.length(8);
      expect($lis[0]).to.have.attr("class", "address_title");
      expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
      expect($lis[2]).to.have.text("");
      expect($lis[3]).to.have.text(address);
      expect($lis[4]).to.have.text("");
      expect($lis[5]).to.have.text(fullAddress);
      expect($lis[6]).to.have.text(country);
      expect($lis[7]).to.have.text(randomPhoneNumber);
    });
    cy.get("ul.address.alternate_item.box li").should(($lis) => {
      expect($lis).to.have.length(8);
      expect($lis[0]).to.have.attr("class", "address_title");
      expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
      expect($lis[2]).to.have.text("");
      expect($lis[3]).to.have.text(address);
      expect($lis[4]).to.have.text("");
      expect($lis[5]).to.have.text(fullAddress);
      expect($lis[6]).to.have.text(country);
      expect($lis[7]).to.have.text(randomPhoneNumber);
    });
    cy.get("div.step-one h2.heading")
      .contains("Review Your Order")
      .should("exist");
    cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
    cy.get('a[href="/product_details/2"]')
      .contains("Men Tshirt")
      .should("exist");
    cy.get('tr[id="product-1"] td.cart_price p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_price p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('tr[id="product-1"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-2"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-1"] td.cart_total p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_total p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('td[colspan="2"] h4')
      .children("b")
      .should("have.text", "Total Amount");
    cy.get("td p.cart_total_price")
      .contains(`Rs. ${totalPrice}`)
      .should("be.visible");
    CheckoutPage.getMessageField().type(additionalComment, { delay: 0 });
    CheckoutPage.getPlaceOrderBtn().click();
    PaymentPage.getNameField().type(fullName, { delay: 0 });
    PaymentPage.getCardNumberField().type(cardNumber, { delay: 0 });
    PaymentPage.getCardCVC().type(cardCVC, { delay: 0 });
    PaymentPage.getExpirationMonth().type(randomMonthNumber, { delay: 0 });
    PaymentPage.getConfirmOrderBtn().click();
    cy.get('div.col-sm-4.form-group.expiration input[data-qa="expiry-year"]')
    .invoke("prop", "validationMessage")
    .should("exist");
    HeaderPage.getDeleteAccount().click();
    cy.get("div.col-sm-9.col-sm-offset-1 p:nth-child(2)")
      .contains("Your account has been permanently deleted!")
      .should("be.visible");
  });

  it.only("Try to place order with no required field filled in payment page test", () => {
    HeaderPage.getProductsLink().click();
    AllProductsPage.getAddFirstProduct().click();
    AllProductsPage.getContinueShoppingBtn().click();
    AllProductsPage.getAddSecondProduct().click();
    AllProductsPage.getViewCartBtn().click();
    cy.get("tr.cart_menu td").should(($tds) => {
      expect($tds).to.have.length(6);
      expect($tds[0]).to.have.text("Item");
      expect($tds[1]).to.have.text("Description");
      expect($tds[2]).to.have.text("Price");
      expect($tds[3]).to.have.text("Quantity");
      expect($tds[4]).to.have.text("Total");
      expect($tds[5]).to.have.text("");
    });
    cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
    cy.get('a[href="/product_details/2"]')
      .contains("Men Tshirt")
      .should("exist");
    cy.get('tr[id="product-1"] td.cart_price p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_price p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('tr[id="product-1"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-2"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-1"] td.cart_total p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_total p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    CartPage.getProceedToCheckoutBtn().click();
    CartPage.getRegisterLoginLink().click();
    AuthPage.login(loginEmail, loginPassword);
    cy.get("ul.nav.navbar-nav li:nth-child(10) a")
      .contains(` Logged in as `)
      .should("be.visible");
    HeaderPage.getCartLink().click();
    CartPage.getProceedToCheckoutBtn().click();
    cy.get("div.step-one h2.heading")
      .contains("Address Details")
      .should("exist");
    cy.get("ul.address.item.box li").should(($lis) => {
      expect($lis).to.have.length(8);
      expect($lis[0]).to.have.attr("class", "address_title");
      expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
      expect($lis[2]).to.have.text("");
      expect($lis[3]).to.have.text(address);
      expect($lis[4]).to.have.text("");
      expect($lis[5]).to.have.text(fullAddress);
      expect($lis[6]).to.have.text(country);
      expect($lis[7]).to.have.text(randomPhoneNumber);
    });
    cy.get("ul.address.alternate_item.box li").should(($lis) => {
      expect($lis).to.have.length(8);
      expect($lis[0]).to.have.attr("class", "address_title");
      expect($lis[1]).to.have.text(`Mrs. ${fullName}`);
      expect($lis[2]).to.have.text("");
      expect($lis[3]).to.have.text(address);
      expect($lis[4]).to.have.text("");
      expect($lis[5]).to.have.text(fullAddress);
      expect($lis[6]).to.have.text(country);
      expect($lis[7]).to.have.text(randomPhoneNumber);
    });
    cy.get("div.step-one h2.heading")
      .contains("Review Your Order")
      .should("exist");
    cy.get('a[href="/product_details/1"]').contains("Blue Top").should("exist");
    cy.get('a[href="/product_details/2"]')
      .contains("Men Tshirt")
      .should("exist");
    cy.get('tr[id="product-1"] td.cart_price p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_price p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('tr[id="product-1"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-2"] button.disabled')
      .contains("1")
      .should("be.visible");
    cy.get('tr[id="product-1"] td.cart_total p')
      .contains(`Rs. ${priceFirstItem}`)
      .should("be.visible");
    cy.get('tr[id="product-2"] td.cart_total p')
      .contains(`Rs. ${priceSecondItem}`)
      .should("be.visible");
    cy.get('td[colspan="2"] h4')
      .children("b")
      .should("have.text", "Total Amount");
    cy.get("td p.cart_total_price")
      .contains(`Rs. ${totalPrice}`)
      .should("be.visible");
    CheckoutPage.getMessageField().type(additionalComment, { delay: 0 });
    CheckoutPage.getPlaceOrderBtn().click();
    PaymentPage.getConfirmOrderBtn().click();
    cy.get('div.col-sm-12.form-group input[data-qa="name-on-card"]')
    .invoke("prop", "validationMessage")
    .should("exist");
    HeaderPage.getDeleteAccount().click();
    cy.get("div.col-sm-9.col-sm-offset-1 p:nth-child(2)")
      .contains("Your account has been permanently deleted!")
      .should("be.visible");
  });
});
