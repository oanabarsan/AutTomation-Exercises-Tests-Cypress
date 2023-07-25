class BrandsCategoryPage{
  getPoloBrandLink(){
    return cy.get("ul.nav.nav-pills.nav-stacked li a[href='/brand_products/Polo']");
  }

  getHnMBrandLink(){
    return cy.get("ul.nav.nav-pills.nav-stacked li a[href='/brand_products/H&M']");
  }

  getMadameBrandLink(){
    return cy.get("ul.nav.nav-pills.nav-stacked li a[href='/brand_products/Madame']");
  }

  getMastAndHarbourBrandLink(){
    return cy.get("ul.nav.nav-pills.nav-stacked li a[href='/brand_products/Mast & Harbour']");
  }
}

export default new BrandsCategoryPage();