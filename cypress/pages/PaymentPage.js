class PaymentPage{
  getNameField(){
    return cy.get('input[data-qa="name-on-card"]');
  }

  getCardNumberField(){
    return cy.get('input[data-qa="card-number"]');
  }

  getCardCVC(){
    return cy.get('input[data-qa="cvc"]');
  }

  getExpirationMonth(){
    return cy.get('input[data-qa="expiry-month"]');
  }

  getExpirationYear(){
    return cy.get('input[data-qa="expiry-year"]');
  }

  getConfirmOrderBtn(){
    return cy.get('button[data-qa="pay-button"]')
  }
}

export default new PaymentPage();