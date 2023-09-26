const { defineConfig } = require("cypress");
module.exports = defineConfig({
  video: true,
  reporter: 'cypress-xml-reporter',
  reporterOptions: {
    resultsFolder: './results'
  },
  e2e: {
    setupNodeEvents(on, config) {
      const logsOptions = {
        printLogsToFile: "always",    // "onFail"(default), "always", or "never"
        outputRoot: config.projectRoot + '/cypress/',
        outputTarget: {
          'logs|txt': 'txt',
        }
      };
      require('cypress-terminal-report/src/installLogsPrinter')(on, logsOptions);
      require('cypress-xml-reporter/src/plugin') (on, logsOptions);
    },
  },
});
