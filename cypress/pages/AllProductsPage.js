class AllProductsPage{
  getFirstProduct(){
    return cy.get('a[href="/product_details/1"]').contains('View Product');
  }

  getSearchField(){
    return cy.get('#search_product');
  }

  getSearchBtn(){
    return cy.get('#submit_search');
  }
}

export default new AllProductsPage();