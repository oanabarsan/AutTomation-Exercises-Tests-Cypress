class CartPage{

  getHereLink(){
    return cy.get('a[href="/products"]').children('u').should('have.text', "here");
  }

  getProceedToCheckoutBtn(){
    return cy.get('div.col-sm-6 a.btn.btn-default.check_out');
  }

  getRegisterLoginLink(){
    return cy.get('a[href="/login"]').children('u').should('have.text', "Register / Login");
  }
}

export default new CartPage();