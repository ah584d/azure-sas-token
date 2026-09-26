import { createSignal, Show } from "solid-js";

type Props = {
  token: string | null;
  error: string | null;
  onReset: () => void;
};

const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export function TokenOutput(props: Props) {
  const [copied, setCopied] = createSignal(false);

  const copy = async () => {
    if (!props.token) return;
    try {
      await navigator.clipboard.writeText(props.token);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API may be blocked (e.g. insecure context); fail silently.
    }
  };

  const highlighted = (): string => {
    if (!props.token) return "";
    // Escape first to neutralize any user-controlled characters in the policy name.
    return escapeHtml(props.token).replace(
      /(sr|sig|se|skn)=([^&\s]*)/g,
      '<span class="k">$1</span>=<span class="v">$2</span>',
    );
  };

  return (
    <Show when={props.token || props.error}>
      <section class="card output" aria-live="polite">
        <header>
          <h2>{props.error ? "Error" : "Your SAS Token"}</h2>
          <div class="actions">
            <Show when={props.token}>
              <button type="button" class="btn" onClick={copy}>
                {copied() ? "✓ Copied" : "📋 Copy"}
              </button>
            </Show>
            <button type="button" class="btn ghost" onClick={props.onReset}>
              ⟲ Reset
            </button>
          </div>
        </header>
        <Show
          when={props.token}
          fallback={<pre class="error-block">{props.error}</pre>}
        >
          <pre class="token" innerHTML={highlighted()} />
        </Show>
      </section>
    </Show>
  );
}
