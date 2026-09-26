import { createSignal } from "solid-js";
import { TokenForm } from "./components/form";
import { TokenOutput } from "./components/output";
import { ThemePicker } from "./components/theme";
import { createSharedAccessToken } from "./lib/sasToken";
import {
  applyTheme,
  readThemeCookie,
  writeThemeCookie,
  type ThemeName,
} from "./lib/theme";
import type { FormValues } from "./lib/types";

export function App() {
  const [token, setToken] = createSignal<string | null>(null);
  const [error, setError] = createSignal<string | null>(null);
  const [theme, setThemeState] = createSignal<ThemeName>(readThemeCookie());

  const setTheme = (next: ThemeName) => {
    setThemeState(next);
    applyTheme(next);
    writeThemeCookie(next);
  };

  const handleGenerate = async (values: FormValues) => {
    try {
      const expireInSeconds =
        values.expireMode === "custom"
          ? Math.floor(
              (new Date(values.customExpireDate.trim()).getTime() -
                Date.now()) /
                1000,
            )
          : values.expireHours * 3600;
      const result = await createSharedAccessToken(
        values.resourceUri.trim(),
        values.saPolicyName.trim(),
        values.saKey.trim(),
        expireInSeconds,
      );
      setToken(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setToken(null);
    }
  };

  const handleReset = () => {
    setToken(null);
    setError(null);
  };

  return (
    <div class="app">
      <header class="hero">
        <h1>
          <img
            src="./sas-token-logo.svg"
            alt=""
            class="logo"
            width="56"
            height="56"
            aria-hidden="true"
          />
          Azure SAS Token Generator
        </h1>
        <p class="tagline">
          Generate signed access tokens for any Azure service — Service Bus,
          Event Hubs, Storage, IoT Hub, Relay. Your key never leaves your
          browser.
        </p>
        <ThemePicker value={theme()} onChange={setTheme} />
      </header>

      <main>
        <TokenForm onGenerate={handleGenerate} />
        <TokenOutput token={token()} error={error()} onReset={handleReset} />
      </main>

      <footer class="footer">
        <a
          href="https://github.com/ah584d/azure-sas-token"
          target="_blank"
          rel="noopener noreferrer"
        >
          ★ Star on GitHub
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="https://www.npmjs.com/package/azure-sas-token"
          target="_blank"
          rel="noopener noreferrer"
        >
          azure-sas-token on npm
        </a>
        <span aria-hidden="true">·</span>
        <span>MIT © Avraham Hamu</span>
      </footer>
    </div>
  );
}
