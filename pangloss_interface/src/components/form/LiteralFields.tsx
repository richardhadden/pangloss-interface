type TTextFieldProps = {
  value: any;
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

const TextAreaField = (props: TTextFieldProps) => {
  return (
    <textarea
      class="col-span-10  caret-indigo-800 resize-none field-sizing-content outline-0 bg-zinc-200 rounded-sm py-4 px-4 focus:bg-zinc-300 focus:border-slate-200 focus:drop-shadow-xs"
      rows="1"
      placeholder="Label..."
      oninput={(e) => props.onInput(e.currentTarget.value)}
    >
      {props.value}
    </textarea>
  );
};

export { TextField, TextAreaField };
