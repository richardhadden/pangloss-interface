import { Show } from "solid-js";
import { maxLength } from "valibot";

type TTextFieldProps = {
  value: string;
  minLen?: number;
  maxLen?: number;
  onInput: (value: any) => void;
  placeholder?: string;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
  onKeyPress?: (e: KeyboardEvent) => void;
  ref: HTMLInputElement;
};

const TextField = (props: TTextFieldProps) => {
  return (
    <input
      ref={props.ref}
      class="w-full outline-0 bg-zinc-800/20 rounded-xs py-4 px-4 focus:bg-zinc-900/20 focus:border-slate-200 focus:drop-shadow-xs"
      type="text"
      placeholder={props.placeholder || ""}
      value={props.value}
      oninput={(e) => props.onInput(e.currentTarget.value)}
      aria-placeholder={props.placeholder || ""}
      maxLength={props.maxLen || undefined}
      onFocusIn={props.onFocusIn ? props.onFocusIn : () => null}
      onFocusOut={props.onFocusOut ? props.onFocusOut : () => null}
      onKeyDown={props.onKeyPress ? props.onKeyPress : (e) => null}
    />
  );
};

const MultiLineTextField = (props: TTextFieldProps) => {
  return (
    <div class="col-span-10">
      <textarea
        class=" w-full caret-indigo-800 resize-none field-sizing-content outline-0 bg-zinc-800/20 rounded-xs py-4 px-4 focus:bg-zinc-900/20 focus:border-slate-200 focus:drop-shadow-xs"
        rows="1"
        placeholder={props.placeholder || ""}
        oninput={(e) => props.onInput(e.currentTarget.value)}
        onkeypress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
          if (props.maxLen && e.currentTarget.value.length >= props.maxLen) {
            e.preventDefault();
          }
        }}
        onPaste={(e) => {
          if (props.maxLen && e.currentTarget.value.length >= props.maxLen) {
            e.preventDefault();
          }
        }}
      >
        {props.value}
      </textarea>
      <Show when={props.maxLen}>
        <div
          class="text-xs uppercase  w-full flex justify-start mt-1"
          classList={{
            "text-slate-400 font-normal":
              props.maxLen && props.value.length < props.maxLen,
            "text-red-800 font-semibold":
              props.maxLen && props.value.length === props.maxLen,
          }}
        >
          {props.value.length} / {props.maxLen}
        </div>
      </Show>
    </div>
  );
};

export { TextField, MultiLineTextField as TextAreaField };
