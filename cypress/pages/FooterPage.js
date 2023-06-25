class FooterPage{
  getFooter(){
    return cy.get("div.footer-widget");
  }
  
  getSubscribeField(){
    return cy.get("#susbscribe_email");
  }

  getSubscribeBtn(){
    return cy.get('#subscribe');
  }

}

export default new FooterPage();