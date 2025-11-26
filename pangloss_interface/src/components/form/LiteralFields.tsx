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
  ref?: HTMLInputElement;
  class?: string;
};

const TextField = (props: TTextFieldProps) => {
  return (
    <input
      ref={props.ref}
      class={
        "w-full rounded-xs bg-zinc-800/20 px-4 py-4 outline-0 focus:border-slate-200 focus:bg-zinc-900/20 focus:drop-shadow-xs " +
        props.class
      }
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
        class="field-sizing-content w-full resize-none rounded-xs bg-zinc-800/20 px-4 py-4 caret-indigo-800 outline-0 focus:border-slate-200 focus:bg-zinc-900/20 focus:drop-shadow-xs"
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
        value={props.value}
      ></textarea>
      <Show when={props.maxLen}>
        <div
          class="mt-1 flex w-full justify-start text-xs uppercase"
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

type TNumberFieldProps = { value: number; onInput: (value: number) => void };

const NumberField = (props: TNumberFieldProps) => {
  return (
    <input
      type="number"
      class="max-w-12 rounded-sm bg-zinc-200/20 p-2 outline-0 focus:bg-zinc-200/20"
      value={props.value}
      oninput={(e) => props.onInput(Number(e.currentTarget.value))}
    />
  );
};

export { TextField, NumberField, MultiLineTextField as TextAreaField };
