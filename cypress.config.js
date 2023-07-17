const { defineConfig } = require("cypress");
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')
const { verifyDownloadTasks } = require('cy-verify-downloads');


module.exports = defineConfig({
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 25000,
  requestTimeout: 15000,
  video: false,
  projectId: "votm1q",
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {downloadFile})
      on('task', verifyDownloadTasks);
    },
  },
});
