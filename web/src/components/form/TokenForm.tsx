import { createSignal, Show } from "solid-js";
import { ExpirationPicker } from "./ExpirationPicker";
import { KeyInput } from "./KeyInput";
import { validate } from "../../lib/validation";
import type { ExpireMode, FormValues } from "../../lib/types";

type Props = {
  onGenerate: (values: FormValues) => void | Promise<void>;
};

const defaultCustomDate = (): string => {
  const d = new Date(Date.now() + 7 * 24 * 3600 * 1000);
  return `${d.toISOString().slice(0, 19)}Z`;
};

export function TokenForm(props: Props) {
  const [resourceUri, setResourceUri] = createSignal("");
  const [saPolicyName, setSaPolicyName] = createSignal("");
  const [saKey, setSaKey] = createSignal("");
  const [expireMode, setExpireMode] = createSignal<ExpireMode>("preset");
  const [expireHours, setExpireHours] = createSignal(168); // 1 week
  const [customExpireDate, setCustomExpireDate] =
    createSignal(defaultCustomDate());
  const [submitted, setSubmitted] = createSignal(false);

  const values = (): FormValues => ({
    resourceUri: resourceUri(),
    saPolicyName: saPolicyName(),
    saKey: saKey(),
    expireMode: expireMode(),
    expireHours: expireHours(),
    customExpireDate: customExpireDate(),
  });

  const errors = () => validate(values());
  const shouldShow = (field: keyof FormValues) =>
    submitted() && !!errors()[field];

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors()).length > 0) return;
    props.onGenerate(values());
  };

  return (
    <form class="card form" onSubmit={handleSubmit} novalidate>
      <div class="field" classList={{ invalid: shouldShow("resourceUri") }}>
        <label for="resourceUri">
          <span class="step">1</span>
          Resource URI
        </label>
        <input
          id="resourceUri"
          type="text"
          value={resourceUri()}
          onInput={(e) => setResourceUri(e.currentTarget.value)}
          placeholder="https://<namespace>.servicebus.windows.net/<queue>"
          spellcheck={false}
          autocomplete="off"
          autocapitalize="off"
        />
        <p class="hint">Full URL of your queue, topic, container, hub…</p>
        <Show when={shouldShow("resourceUri")}>
          <p class="error">{errors().resourceUri}</p>
        </Show>
      </div>

      <div class="field" classList={{ invalid: shouldShow("saPolicyName") }}>
        <label for="saPolicyName">
          <span class="step">2</span>
          Shared Access Policy Name
        </label>
        <input
          id="saPolicyName"
          type="text"
          value={saPolicyName()}
          onInput={(e) => setSaPolicyName(e.currentTarget.value)}
          placeholder="RootManageSharedAccessKey"
          spellcheck={false}
          autocomplete="off"
          autocapitalize="off"
        />
        <Show when={shouldShow("saPolicyName")}>
          <p class="error">{errors().saPolicyName}</p>
        </Show>
      </div>

      <div class="field" classList={{ invalid: shouldShow("saKey") }}>
        <label for="saKey">
          <span class="step">3</span>
          Primary / Secondary Key
        </label>
        <KeyInput id="saKey" value={saKey()} onInput={setSaKey} />
        <p class="hint">
          Must be at least 44 characters. Stored only in memory.
        </p>
        <Show when={shouldShow("saKey")}>
          <p class="error">{errors().saKey}</p>
        </Show>
      </div>

      <div class="field">
        <span class="label-like">
          <span class="step">4</span>
          Expiration
        </span>
        <ExpirationPicker
          mode={expireMode()}
          hours={expireHours()}
          customDate={customExpireDate()}
          customError={
            shouldShow("customExpireDate")
              ? errors().customExpireDate
              : undefined
          }
          onModeChange={setExpireMode}
          onHoursChange={setExpireHours}
          onCustomDateChange={setCustomExpireDate}
        />
      </div>

      <button type="submit" class="generate">
        <span class="bolt" aria-hidden="true">
          ⚡
        </span>{" "}
        Generate SAS Token
      </button>
    </form>
  );
}
