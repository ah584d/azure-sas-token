/**
 * Browser-native Azure SAS token generator.
 *
 * Produces the exact same output as the `azure-sas-token` npm package, but uses
 * the Web Crypto API (`crypto.subtle`) instead of Node's `crypto` module — so it
 * runs in any modern browser without polyfills.
 *
 * The npm library ships a Node-only implementation today; see `web/README.md` for
 * the isomorphic upgrade plan.
 */
export async function createSharedAccessToken(
  resourceUri: string,
  saPolicyName: string,
  saKey: string,
  saValidity: number,
): Promise<string> {
  if (!resourceUri || !saPolicyName || !saKey) {
    throw new TypeError("Missing required parameter");
  }
  if (!Number.isFinite(saValidity) || saValidity <= 0) {
    throw new RangeError("saValidity must be a positive number of seconds");
  }

  const urlEncoded = encodeURIComponent(resourceUri);
  const ttl = Math.floor(Date.now() / 1000) + Math.floor(saValidity);
  const signature = `${urlEncoded}\n${ttl}`;

  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(saKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signatureBytes = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    encoder.encode(signature),
  );
  const hashBase64 = bytesToBase64(new Uint8Array(signatureBytes));

  return `SharedAccessSignature sr=${urlEncoded}&sig=${encodeURIComponent(hashBase64)}&se=${ttl}&skn=${saPolicyName}`;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
