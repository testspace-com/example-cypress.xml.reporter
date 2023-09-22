# Example Cypress XML Reporter
Example using Cypress XML Reporter capturing results in Testspace

## Usage

Terminal:
```
npx cypress run [--spec /to/path] [--headed]
```

Publish:
```
testspace results/**/*.xml{cypress/e2e}
```


## Repo Setup
The following steps are required to setup from scratch.

`.gitignore`
```
node_modules
cypress/screenshots
cypress/videos
cypress/results
cypress/logs
```
### Packages

Create initial `package.json` file.
```
npm init -y
```

```
npm install --save-dev cypress
npm install --save-dev cypress-terminal-report
npm install --save-dev cypress-xml-reporter
```

### Example Code

To run this example:

Using the Cypress [Launchpad](https://docs.cypress.io/guides/getting-started/opening-the-app#The-Launchpad):
```
npx cypress open
```

Using the **Scaffold example specs** provided by the Cypress Launchpad.

### Configuration

For `cypress.config.js`
```
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
        printLogsToConsole: "always", // onFail or always
        printLogsToFile: "always",    // onFail or always
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
```

To enable logging `cypress/support/e2e.js`:
```
// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
require('cypress-terminal-report/src/installLogsCollector')();
```