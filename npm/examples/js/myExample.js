const azureSasToken = require('azure-sas-token');

// default token validity is 7 days
let sasToken = azureSasToken.createSharedAccessToken('https://<service namespace>.servicebus.windows.net/<topic name or queue>', '<signature key name>', '<signature hash>');
console.log(`sasToken: ${sasToken}`);

// Specify your own validity in secs, two hours in this example
sasToken = azureSasToken.createSharedAccessToken(
  'https://<service namespace>.servicebus.windows.net/<topic name or queue>',
  '<signature key name>',
  '<signature hash>',
  60 * 60 * 2
);
console.log(`sasToken: ${sasToken}`);
