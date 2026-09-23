import { createHmac } from 'crypto';

const DEFAULT_VALIDITY_SECONDS = 60 * 60 * 24 * 7;

export function createSharedAccessToken(
  resourceUri: string,
  saPolicyName: string,
  saKey: string,
  saValidity = DEFAULT_VALIDITY_SECONDS,
): string {
  if (!resourceUri || !saPolicyName || !saKey) {
    throw new TypeError('Missing required parameter');
  }

  if (!Number.isSafeInteger(saValidity) || saValidity <= 0) {
    throw new RangeError('saValidity must be a positive number of seconds');
  }

  const urlEncoded = encodeURIComponent(resourceUri);

  // Set expiration in seconds
  const ttl = Math.floor(Date.now() / 1000) + saValidity;

  const signature = urlEncoded + '\n' + ttl;

  const hash = createHmac('sha256', saKey).update(signature, 'utf8').digest('base64');

  return `SharedAccessSignature sr=${urlEncoded}&sig=${encodeURIComponent(hash)}&se=${ttl}&skn=${saPolicyName}`;
}
