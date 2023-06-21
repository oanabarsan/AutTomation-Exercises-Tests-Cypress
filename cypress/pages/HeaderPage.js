class HeaderPage{
  getHomeLink(){
    return cy.get('<a[href="/"]');
  }

  getSignupLink(){
    return cy.get("ul.nav.navbar-nav li:nth-child(4) a");
  }

  getTestCaseLink(){
    return cy.get("ul.nav.navbar-nav li:nth-child(5) a");
  }

  getLogoutLink(){
    return cy.get("ul.nav.navbar-nav li:nth-child(4) a");
  }

  getContactUsLink(){
    return cy.get("ul.nav.navbar-nav li:nth-child(8) a");
  }

}

export default new HeaderPage();