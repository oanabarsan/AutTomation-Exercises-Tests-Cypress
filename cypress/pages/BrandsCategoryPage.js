class BrandsCategoryPage{
  getPoloBrandLink(){
    return cy.get("ul.nav.nav-pills.nav-stacked li a[href='/brand_products/Polo']");
  }

  getHnMBrandLink(){
    return cy.get("ul.nav.nav-pills.nav-stacked li a[href='/brand_products/H&M']");
  }
}

export default new BrandsCategoryPage();