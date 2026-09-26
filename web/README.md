# Azure SAS Token Generator — Web

Client-only web app to generate Azure SAS tokens directly in the browser.

Built with **Solid.js** + **Vite** + **TypeScript**. Zero UI-framework runtime, zero CSS framework. Total shipped: ~7 KB JS + ~2 KB CSS (gzipped).

Your access key never leaves your device. HMAC-SHA256 signing happens locally via the browser's built-in Web Crypto API.

## Why not import the `azure-sas-token` npm package here?

The published `azure-sas-token` package uses Node's built-in `crypto` module, which does not exist in browsers. Rather than bundle a Node polyfill (adds tens of kilobytes), this app calls `crypto.subtle` — the standard Web Crypto API — directly from [src/lib/sasToken.ts](src/lib/sasToken.ts). It produces the exact same token format as the npm lib.

**Follow-up idea (not done here):** make the npm lib isomorphic by switching its implementation to `globalThis.crypto.subtle`, which exists on both browsers and Node 20+ (already required by the lib's `engines.node`). That would let this app `import { createSharedAccessToken } from 'azure-sas-token'` unchanged.

## Develop

```sh
npm install
npm run dev
```

Vite serves the app at http://localhost:5173.

## Build

```sh
npm run build
```

The production build is emitted straight into the sibling `../docs/` folder that GitHub Pages serves — no copying step needed. Vite fully empties `docs/` before writing the new build.

## Deploy to GitHub Pages

Your repo is already configured to publish from `main` /docs. Just:

```sh
npm run build
git add ../docs
git commit -m "chore: publish web build"
git push
```

GitHub Pages will pick up the new build automatically.
