import { Injectable } from '@angular/core';
import * as utf8 from 'utf8'; 
import * as cryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TokenGeneratorService {

	constructor() { }

	createSharedAccessToken(resourceUri: string, saPolicyName: string, saKey:string, expireTimeInHours: number) { 
		if (!resourceUri || !saPolicyName || !saKey) { 
			throw 'Missing required parameter'; 
		} 
		const urlEncoded = encodeURIComponent(resourceUri);

		// Set expiration in seconds
		const ttl = this.getExpirationTime(expireTimeInHours);

		const signature = urlEncoded + '\n' + ttl;

		// Use crypto
		const signatureUTF8 = utf8.encode(signature); 
		const hash = cryptoJS.HmacSHA256(signatureUTF8, saKey);
		const hashInBase64 = cryptoJS.enc.Base64.stringify(hash);

		return `SharedAccessSignature sr=${urlEncoded}&sig=${encodeURIComponent(hashInBase64)}&se=${ttl}&skn=${saPolicyName}`; 
	}

	private getExpirationTime(expireTimeInHours?: number): number {
		expireTimeInHours = expireTimeInHours || 24 *7;
		const now = new Date(); 
		const expirationDelay = 60 * 60 * expireTimeInHours;
		const ttl = Math.round(now.getTime() / 1000) + expirationDelay;
		return ttl;
	}
}
