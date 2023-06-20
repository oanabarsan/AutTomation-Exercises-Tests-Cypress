const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 25000,
  requestTimeout: 15000,
  video: false,
  projectId: "votm1q",
  e2e: {
    setupNodeEvents(on, config) {
      
    },
  },
});
