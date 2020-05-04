const createSharedAccessToken = require('azure-sas-token').default;

const sasToken = createSharedAccessToken('https://<service namespace>.servicebus.windows.net/<topic name or queue>',
								'<signature key name>',
								'<signature hash>');
console.log(`sasToken: ${sasToken}`);