class MadameBrandPage{
  getPoloBrandLink(){
    return cy.get("ul.nav.nav-pills.nav-stacked li a[href='/brand_products/Polo']");
  }
}

export default new MadameBrandPage();