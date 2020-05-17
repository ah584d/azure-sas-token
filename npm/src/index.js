import { createHmac } from 'crypto';
import { encode } from 'utf8';

export function createSharedAccessToken(resourceUri, saPolicyName, saKey, saValidity=60*60*24*7) { 
	if (!resourceUri || !saPolicyName || !saKey) { 
		throw 'Missing required parameter'; 
	}

	const urlEncoded = encodeURIComponent(resourceUri);

	// Set expiration in seconds
	const now = new Date();
	const ttl = Math.round(now.getTime() / 1000) + saValidity;

	const signature = urlEncoded + '\n' + ttl;

	const signatureUTF8 = encode(signature); 

	// Use crypto
	// 1. Creates an Hmac object that uses the given sha256 algorithm and key provided
	// 2. binds data
	// 3. encode in base64
	const hash = createHmac('sha256', saKey)
					.update(signatureUTF8)
					.digest('base64'); 

	return `SharedAccessSignature sr=${urlEncoded}&sig=${encodeURIComponent(hash)}&se=${ttl}&skn=${saPolicyName}`; 
}

//export {createSharedAccessToken}; 