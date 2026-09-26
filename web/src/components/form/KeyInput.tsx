import { createSignal } from "solid-js";

type Props = {
  id?: string;
  value: string;
  onInput: (value: string) => void;
};

export function KeyInput(props: Props) {
  const [visible, setVisible] = createSignal(false);

  return (
    <div class="key-input">
      <input
        id={props.id}
        type={visible() ? "text" : "password"}
        value={props.value}
        onInput={(e) => props.onInput(e.currentTarget.value)}
        placeholder="Shared access primary or secondary key"
        spellcheck={false}
        autocomplete="off"
        autocapitalize="off"
      />
      <button
        type="button"
        class="eye"
        aria-label={visible() ? "Hide key" : "Show key"}
        aria-pressed={visible()}
        onClick={() => setVisible(!visible())}
      >
        {visible() ? "🙈" : "👁"}
      </button>
    </div>
  );
}
