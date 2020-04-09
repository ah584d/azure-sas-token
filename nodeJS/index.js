const crypto = require('crypto');
const utf8 = require('utf8');

function createSharedAccessToken(resourceUri, saPolicyName, saKey) { 
	if (!resourceUri || !saPolicyName || !saKey) { 
			throw 'Missing required parameter'; 
	}

	const urlEncoded = encodeURIComponent(resourceUri);

	// Set expiration in seconds
	const now = new Date(); 
	const week = 60*60*24*7;
	const ttl = Math.round(now.getTime() / 1000) + week;

	const signature = urlEncoded + '\n' + ttl;

	const signatureUTF8 = utf8.encode(signature); 

	// Use crypto
	// 1. Creates an Hmac object that uses the given sha256 algorithm and key provided
	// 2. binds data
	// 3. encode in base64
	const hash = crypto.createHmac('sha256', saKey)
					.update(signatureUTF8)
					.digest('base64'); 

	return `SharedAccessSignature sr=${urlEncoded}&sig=${encodeURIComponent(hash)}&se=${ttl}&skn=${saPolicyName}`; 
}



const sasToken = createSharedAccessToken('https://<service namespace>.servicebus.windows.net/<topic name or queue>',
								'<signature key name>',
								'<signature hash>');

console.log(`sasToken: ${sasToken}`);