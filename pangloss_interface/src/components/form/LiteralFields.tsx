import { Show } from "solid-js";

type TTextFieldProps = {
  value: any;
  minLen?: number;
  maxLen?: number;
  onInput: (value: any) => void;
};

const TextField = (props: TTextFieldProps) => {
  return (
    <input
      class="w-full outline-0 bg-slate-200 rounded-xs py-2 px-4 focus:bg-slate-300 focus:border-slate-200 focus:drop-shadow-xs"
      type="text"
      placeholder="Label..."
      value={props.value}
      oninput={(e) => props.onInput(e.currentTarget.value)}
    />
  );
};

const MultiLineTextField = (props: TTextFieldProps) => {
  return (
    <div class="col-span-10">
      <textarea
        class=" w-full caret-indigo-800 resize-none field-sizing-content outline-0 bg-zinc-200 rounded-xs py-4 px-4 focus:bg-zinc-300 focus:border-slate-200 focus:drop-shadow-xs"
        rows="1"
        placeholder="Label..."
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
