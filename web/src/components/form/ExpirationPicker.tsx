import { For, Show } from "solid-js";
import type { ExpireMode } from "../../lib/types";

type Option = { label: string; hours: number };

const OPTIONS: readonly Option[] = [
  { label: "1 hour", hours: 1 },
  { label: "2 hours", hours: 2 },
  { label: "1 day", hours: 24 },
  { label: "1 week", hours: 168 },
  { label: "1 month", hours: 720 },
];

type Props = {
  mode: ExpireMode;
  hours: number;
  customDate: string;
  customError?: string;
  onModeChange: (mode: ExpireMode) => void;
  onHoursChange: (hours: number) => void;
  onCustomDateChange: (value: string) => void;
};

export function ExpirationPicker(props: Props) {
  const isPresetActive = (hours: number) =>
    props.mode === "preset" && props.hours === hours;

  return (
    <div class="expiration">
      <div class="chips" role="radiogroup" aria-label="Token expiration">
        <For each={OPTIONS}>
          {(option) => (
            <button
              type="button"
              role="radio"
              aria-checked={isPresetActive(option.hours)}
              class="chip"
              classList={{ active: isPresetActive(option.hours) }}
              onClick={() => {
                props.onModeChange("preset");
                props.onHoursChange(option.hours);
              }}
            >
              {option.label}
            </button>
          )}
        </For>
        <button
          type="button"
          role="radio"
          aria-checked={props.mode === "custom"}
          class="chip"
          classList={{ active: props.mode === "custom" }}
          onClick={() => props.onModeChange("custom")}
        >
          Custom…
        </button>
      </div>

      <Show when={props.mode === "custom"}>
        <div class="custom-date" classList={{ invalid: !!props.customError }}>
          <input
            type="text"
            value={props.customDate}
            onInput={(e) => props.onCustomDateChange(e.currentTarget.value)}
            placeholder="2026-10-04T12:00:00Z"
            spellcheck={false}
            autocomplete="off"
            aria-label="Custom expiration date"
          />
          <p class="hint">
            ISO 8601 date. Example: <code>2026-10-04T12:00:00Z</code> (UTC).
          </p>
          <Show when={props.customError}>
            <p class="error">{props.customError}</p>
          </Show>
        </div>
      </Show>
    </div>
  );
}
