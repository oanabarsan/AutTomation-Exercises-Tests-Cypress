class AllProductsPage{
  getFirstProduct(){
    return cy.get('a[href="/product_details/1"]').contains('View Product');
  }
}

export default new AllProductsPage();