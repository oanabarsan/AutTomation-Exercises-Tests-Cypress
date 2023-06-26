class HeaderPage{
  getHomeLink(){
    return cy.get('<a[href="/"]');
  }

  getProductsLink(){
    return cy.get("ul.nav.navbar-nav li:nth-child(2) a");
  }

  getCartLink(){
    return cy.get("ul.nav.navbar-nav li:nth-child(3) a");
  }

  getSignupLink(){
    return cy.get("ul.nav.navbar-nav li:nth-child(4) a");
  }

  getTestCaseLink(){
    return cy.get("ul.nav.navbar-nav li:nth-child(5) a");
  }

  getDeleteAccount(){
    return cy.get("ul.nav.navbar-nav li:nth-child(5) a[href='/delete_account']");
  }

  getLogoutLink(){
    return cy.get("ul.nav.navbar-nav li:nth-child(4) a");
  }

  getContactUsLink(){
    return cy.get("ul.nav.navbar-nav li:nth-child(8) a");
  }

}

export default new HeaderPage();