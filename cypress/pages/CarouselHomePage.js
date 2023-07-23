class CarouselHomePage {
  getFirstTestCaseBtn() {
    return cy
      .get("div.col-sm-6:nth-child(1) a[href='/test_cases']")
      .contains("Test Cases");
  }

  getSecondTestCaseBtn() {
    return cy
      .get('div.carousel-inner:nth-child(2) a[href="/test_cases"]')
      .contains("Test Cases");
  }

  getThirdTestCaseBtn() {
    return cy
      .get('div.carousel-inner div.item:nth-child(3) div.col-sm-6 a[href="/test_cases"]')
      .contains("Test Cases");
  }

  getFirstAPIsBtn() {
    return cy
      .get('div.carousel-inner div.item:nth-child(1) div.col-sm-6 a[href="/api_list"]')
      .contains("APIs list for practice");
  }
}

export default new CarouselHomePage();