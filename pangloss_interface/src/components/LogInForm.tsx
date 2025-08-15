import { createShortcut } from "@solid-primitives/keyboard";
import { ImCross } from "solid-icons/im";
import type { JSX } from "solid-js";
import { Show, createSignal, onMount } from "solid-js";
import { useTranslation } from "~/contexts/translation";
import { useUserLogin, logInUser } from "~/contexts/users";

export function LoginOverlay(props: TLogInFormProps) {
  return (
    <div class="absolute w-screen h-screen bg-slate-400/50 top-0 left-0 z-10 flex justify-center items-center backdrop-blur-sm">
      <div class="bg-slate-200 rounded-sm shadow-2xl w-4/12">
        <LogInForm
          onLoginCallback={props.onLoginCallback}
          onCancel={props.onCancel}
        />
      </div>
    </div>
  );
}

export type TLogInFormProps = {
  onLoginCallback?: () => void;
  onCancel?: () => void;
};
export function LogInForm(props: TLogInFormProps) {
  //const [t] = useTranslation();

  const [user, { setLoggedIn }] = useUserLogin();

  createShortcut(
    ["Escape"],
    () => {
      if (props.onCancel) {
        props.onCancel();
      }
    },
    { preventDefault: true, requireReset: false },
  );

  const handleInput = async (event: SubmitEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    if (!formData.get("username") || !formData.get("password")) {
      setLoginErrorMessage("Username or Password Missing");
      return false;
    }

    const loginResponse = await logInUser(formData);
    if (loginResponse === 200) {
      setLoggedIn();
      if (props.onLoginCallback) {
        props.onLoginCallback();
      }
    } else if (loginResponse === 401) {
      setLoginErrorMessage("Incorrect Username or Password");
    } else {
      setLoginErrorMessage("Something went wrong");
    }
    return false;
  };

  const [loginErrorMessage, setLoginErrorMessage] = createSignal("");
  let usernameInput!: HTMLInputElement;

  onMount(() => usernameInput.focus());

  return (
    <div>
      <div class=" bg-slate-700 flex h-10 rounded-t-xs shadow-xl mb-6">
        <div class="w-full uppercase text-sm font-semibold text-slate-50 p-3 rounded-t-sm select-none flex items-center">
          {"Log in required"}
        </div>
        <Show when={props.onCancel}>
          <div class="grow" />{" "}
          <button
            class="h-10 aspect-square shadow-2xl shadow-amber-600/90 bg-amber-700 text-white flex justify-center items-center rounded-tr-xs active:bg-amber-600 active:scale-[92%]"
            onClick={props.onCancel}
          >
            <ImCross size={12} />
          </button>
        </Show>
      </div>
      <form
        method="post"
        class="flex flex-col gap-y-12 p-12 items-center"
        onSubmit={(e) => {
          handleInput(e);
          return false;
        }}
      >
        <div class="w-full group grid grid-cols-4 space-x-6">
          <label
            class="font-semibold text-sm text-slate-700 uppercase select-none col-span-1 flex flex-col justify-center"
            for="username"
          >
            Username
          </label>
          <input
            ref={usernameInput}
            class="col-span-3 font-mono block w-10/12 bg-slate-300 outline-none p-3 rounded-sm border-transparent border transition-all duration-75 focus:border-white  focus:shadow-2xl focus:bg-slate-50 group-hover:scale-y-110 focus:scale-y-110"
            name="username"
            id="username"
            type="text"
          />
        </div>
        <div class="w-full group  items-center space-x-6 grid grid-cols-4">
          <label
            class="col-span-1  font-semibold text-sm text-slate-700 uppercase select-none flex flex-col justify-center"
            for="password"
          >
            Password
          </label>
          <input
            class="col-span-3 font-mono block w-10/12 bg-slate-300 outline-none p-3 rounded-xs border-transparent border transition-all duration-75 focus:border-white  focus:shadow-2xl focus:bg-slate-50 group-hover:scale-y-110 focus:scale-y-110"
            name="password"
            id="password"
            type="password"
          />
        </div>

        <input
          class="inline w-fit px-6 py-4 text-md uppercase font-semibold text-white bg-green-700 rounded-xs hover:bg-green-800 active:bg-green-600 cursor-pointer  hover:shadow-2xl hover:shadow-green-900/50 outline-none  focus:shadow-green-900/50"
          type="submit"
          value="Log In"
        />
      </form>

      <Show when={loginErrorMessage()}>
        <div class="bg-red-700 text-red-50 p-3 text-sm uppercase font-semibold rounded-b-xs transition-all select-none">
          {loginErrorMessage()}
        </div>
      </Show>
    </div>
  );
}
