import { For } from "solid-js";
import { THEMES, type ThemeName } from "../../lib/theme";

type Props = {
  value: ThemeName;
  onChange: (theme: ThemeName) => void;
};

export function ThemePicker(props: Props) {
  return (
    <div class="theme-picker" role="radiogroup" aria-label="Color theme">
      <For each={THEMES}>
        {(theme) => (
          <button
            type="button"
            role="radio"
            aria-checked={props.value === theme.name}
            aria-label={`${theme.label} theme — ${theme.description}`}
            title={`${theme.label} — ${theme.description}`}
            class="theme-swatch"
            classList={{ active: props.value === theme.name }}
            style={{ "--swatch": theme.swatch }}
            onClick={() => props.onChange(theme.name)}
          >
            <span class="theme-swatch-check" aria-hidden="true">
              ✓
            </span>
          </button>
        )}
      </For>
    </div>
  );
}
