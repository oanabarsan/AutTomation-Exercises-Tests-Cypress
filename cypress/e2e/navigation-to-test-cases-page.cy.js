/// <reference types = "cypress" />
import HeaderPage from "../pages/HeaderPage";

describe("Navigate to test case page test suite", () => {
  it("Navigate to test case page", () => {
    HeaderPage.getTestCaseLink().click();
    cy.get("div.panel-group h5")
      .contains(
        "Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:"
      )
      .should("exist");
  });
});
