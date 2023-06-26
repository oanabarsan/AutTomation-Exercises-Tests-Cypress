/// <reference types = "cypress" />

import HeaderPage from "../pages/HeaderPage";
import AllProductsPage from "../pages/AllProductsPage";
import CartPage from "../pages/CartPage";
import AuthPage from "../pages/AuthPage";
import { faker } from "@faker-js/faker";
import CheckoutPage from "../pages/CheckoutPage";
import PaymentPage from "../pages/PaymentPage";

const loginEmail = "boana5762@gmail.com";
const loginPassword = "Suceava321!";
const firstName = "Oana-Maria";
const lastName = "Barsan";
const fullName = firstName + " " + lastName;
const address = "Piata Republicii Street, Bl.D4, Ap.7";
const country = "India"
const randomState = "Ilinois";
const randomCity = "Gura Humorului";
const randomZipCode = "725300";
const randomPhoneNumber = "0748648803";
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

describe("Place order and register while checkout test suite", () => {
  it("Place order and register while checkout test", () => {
    HeaderPage.getSignupLink().click();
    AuthPage.login(loginEmail, loginPassword);
    cy.get("ul.nav.navbar-nav li:nth-child(10) a")
      .contains(` Logged in as `)
      .should("be.visible");
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
});
