class CartPage{
  getFirstCartPorduct(){
    return cy.get('a[href="/product_details/1"]').contains('Blue Top');
  }
}

export default new CartPage();