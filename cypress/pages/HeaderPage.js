class HeaderPage{
  getHomeLink(){
    return cy.get('<a[href="/"]');
  }

  getSignupLink(){
    return cy.get('ul.nav.navbar-nav li a[href="/login"]');
  }

  getLogoutLink(){
    return cy.get('a[href="/logout"]');
  }

}

export default new HeaderPage();