import { createShortcut } from "@solid-primitives/keyboard";
import { ImCross } from "solid-icons/im";
import type { JSX } from "solid-js";
import { Show, createSignal, onMount } from "solid-js";
import { useTranslation } from "~/contexts/translation";

export function LoginOverlay(props: TLogInFormProps) {
  return (
    <div class="absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-slate-400/50 backdrop-blur-sm">
      <div class="w-4/12 rounded-sm bg-slate-200 shadow-2xl">
        <LogInForm
          onLoginCallback={props.onLoginCallback}
          onCancel={props.onCancel}
          onSubmit={props.onSubmit}
        />
      </div>
    </div>
  );
}

export type TLogInFormProps = {
  onLoginCallback?: () => void;
  onCancel?: () => void;
  onSubmit: (form: HTMLFormElement) => void;
};
export function LogInForm(props: TLogInFormProps) {
  //const [t] = useTranslation();

  createShortcut(
    ["Escape"],
    () => {
      if (props.onCancel) {
        props.onCancel();
      }
    },
    { preventDefault: true, requireReset: false },
  );

  const [loginErrorMessage, setLoginErrorMessage] = createSignal("");
  let usernameInput!: HTMLInputElement;

  onMount(() => usernameInput.focus());

  let formRef!: HTMLFormElement;

  return (
    <div>
      <div class="mb-6 flex h-10 rounded-t-xs bg-slate-700 shadow-xl">
        <div class="flex w-full items-center rounded-t-sm p-3 text-sm font-semibold text-slate-50 uppercase select-none">
          {"Log in required"}
        </div>
        <Show when={props.onCancel}>
          <div class="grow" />{" "}
          <button
            class="flex aspect-square h-10 items-center justify-center rounded-tr-xs bg-amber-700 text-white shadow-2xl shadow-amber-600/90 active:scale-[92%] active:bg-amber-600"
            onClick={props.onCancel}
          >
            <ImCross size={12} />
          </button>
        </Show>
      </div>

      <form class="flex flex-col items-center gap-y-12 p-12" ref={formRef}>
        <div class="group grid w-full grid-cols-4 space-x-6">
          <label
            class="col-span-1 flex flex-col justify-center text-sm font-semibold text-slate-700 uppercase select-none"
            for="username"
          >
            Username
          </label>
          <input
            ref={usernameInput}
            class="col-span-3 block w-10/12 rounded-sm border border-transparent bg-slate-300 p-3 font-mono transition-all duration-75 outline-none group-hover:scale-y-110 focus:scale-y-110 focus:border-white focus:bg-slate-50 focus:shadow-2xl"
            name="username"
            id="username"
            type="text"
          />
        </div>
        <div class="group grid w-full grid-cols-4 items-center space-x-6">
          <label
            class="col-span-1 flex flex-col justify-center text-sm font-semibold text-slate-700 uppercase select-none"
            for="password"
          >
            Password
          </label>
          <input
            class="col-span-3 block w-10/12 rounded-xs border border-transparent bg-slate-300 p-3 font-mono transition-all duration-75 outline-none group-hover:scale-y-110 focus:scale-y-110 focus:border-white focus:bg-slate-50 focus:shadow-2xl"
            name="password"
            id="password"
            type="password"
          />
        </div>

        <input
          class="text-md inline w-fit cursor-pointer rounded-xs bg-green-700 px-6 py-4 font-semibold text-white uppercase outline-none hover:bg-green-800 hover:shadow-2xl hover:shadow-green-900/50 focus:shadow-green-900/50 active:bg-green-600"
          type="submit"
          value="Log In"
          onclick={() => props.onSubmit(formRef)}
        />
      </form>
      <Show when={loginErrorMessage()}>
        <div class="rounded-b-xs bg-red-700 p-3 text-sm font-semibold text-red-50 uppercase transition-all select-none">
          {loginErrorMessage()}
        </div>
      </Show>
    </div>
  );
}
