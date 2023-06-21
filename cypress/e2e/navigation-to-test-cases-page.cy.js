/// <reference types = "cypress" />
import HeaderPage from "../pages/HeaderPage";

describe("Navigate to test case page test suite", () => {
  it("Navigate to test case page", () => {
    HeaderPage.getTestCaseLink().click();
    cy.get('div.col-sm-9 h2.title.text-center')
  .scrollIntoView()
  .within(() => {
    cy.window().then((win) => {
      cy.contains('Test Cases').then(($el) => {
        const before = win.getComputedStyle($el[0], '::before')
        const beforeContent = before.getPropertyValue('content')
        expect(beforeContent).to.equal('none');
      })
    })
  })
    cy.get("div.panel-group h5")
      .contains(
        "Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:"
      )
      .should("exist");
  });
});
