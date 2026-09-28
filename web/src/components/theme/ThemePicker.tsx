import { THEMES, type ThemeName } from "../../lib/theme";

type Props = {
  value: ThemeName;
  onChange: (theme: ThemeName) => void;
};

export function ThemePicker(props: Props) {
  const themeIndex = () =>
    THEMES.findIndex((theme) => theme.name === props.value);

  return (
    <div class="theme-picker">
      <label class="sr-only" for="theme-slider">
        Theme
      </label>
      <input
        id="theme-slider"
        class="theme-slider"
        type="range"
        min="0"
        max={THEMES.length - 1}
        step="1"
        value={themeIndex()}
        aria-valuetext={`${THEMES[themeIndex()].label}: ${THEMES[themeIndex()].description}`}
        onInput={(event) => {
          const theme = THEMES[event.currentTarget.valueAsNumber];
          if (theme) props.onChange(theme.name);
        }}
      />
      <span class="theme-slider-label" aria-live="polite">
        {THEMES[themeIndex()].label}
      </span>
    </div>
  );
}
