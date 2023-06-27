class HomeCategoryLinksPage{
  getWomenCategoryLink(){
    return cy.get('h4 a[href="#Women"] span');
  }

  getDressCategory(){
    return cy.get('div[id="Women"] div.panel-body ul li a[href="/category_products/1"]');
  }

}

export default new HomeCategoryLinksPage();