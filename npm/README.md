<img src="pictures/icon.svg" align="right" />

## Azure SAS token generator
> A simple JavaScript Azure SAS token generator


The current project is about how to programmatically generate a Shared Access Signature (SAS) token to use with <a href="https://github.com/ah584d/azure-send-message-to-service-bus-with-postman">Postman in order to post messages to Azure Service Bus Topic/Queue.</a>

![NPM](https://img.shields.io/npm/l/azure-sas-token) ![GitHub issues](https://img.shields.io/github/issues-raw/ah584d/azure-sas-token) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/azure-sas-token) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/azure-sas-token) ![npm bundle size](https://img.shields.io/bundlephobia/min/azure-sas-token) ![npm](https://img.shields.io/npm/dt/azure-sas-token)

## Motivation
After googling for a while in order to generate the necessary token, to post messages to Azure service bus, i noticed that there is no clear explanations, how to achieve it in JavaScript!!
I'm proud to offer you a simple JS way to generate Azure SAS token - using node - or angular.

Don't forget to let me a Star &#11088; :-)
 
## How to use?
Only by adding the dependency to your code, see example section

## Installation
```sh
npm install azure-sas-token
```

## Code Example
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
```javascript
const azureSasToken = require('azure-sas-token');

// default token validity is 7 days
let sasToken = azureSasToken.createSharedAccessToken('https://<service namespace>.servicebus.windows.net/<topic name or queue>',
								'<signature key name>',
								'<signature hash>');
console.log(`sasToken: ${sasToken}`);

// Specify your own validity in secs, two hours in this example
sasToken = azureSasToken.createSharedAccessToken('https://<service namespace>.servicebus.windows.net/<topic name or queue>',
								'<signature key name>',
								'<signature hash>', 
								60 * 60 * 2);
console.log(`sasToken: ${sasToken}`);
```

## Posting messages in Azure service-bus queue - tutorial
https://github.com/ah584d/azure-send-message-to-service-bus-with-postman

## Tests
On going...

## Build status [under construction]

## Contribute
Feel free to open PR.

## Credits
Icon from: http://www.kameleon.pics

## License
A short snippet describing the license (MIT, Apache etc)

MIT © [Avraham Hamu]()
