import type { JSX } from "solid-js";
import { Show, createSignal, onMount } from "solid-js";

import { useUserLogin, logInUser } from "~/contexts/users";
import { t } from "~/contexts/translation";
import { ImCross } from "solid-icons/im";

export function LoginOverlay(props: LoginFormProps) {
  return (
    <div class="absolute w-screen h-screen bg-slate-400/50 top-0 left-0 z-10 flex justify-center items-center backdrop-blur-sm">
      <div class="bg-slate-200 rounded-sm shadow-2xl w-4/12">
        <LoginForm
          onLoginCallback={props.onLoginCallback}
          onCancel={props.onCancel}
        />
      </div>
    </div>
  );
}

type LoginFormProps = { onLoginCallback?: () => void; onCancel?: () => void };
export function LoginForm(props: LoginFormProps) {
  const [user, { setLoggedIn, logOut: setLoggedOut }] = useUserLogin();

  const handleInput:
    | JSX.EventHandlerUnion<HTMLFormElement, Event & { submitter: HTMLElement }>
    | undefined = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData.get("username") || !formData.get("password")) {
      setLoginErrorMessage(t("interface.usernameOrPasswordMissing"));
      return false;
    }

    const loginResponse = await logInUser(formData);
    if (loginResponse === 200) {
      setLoggedIn();
      if (props.onLoginCallback) {
        props.onLoginCallback();
      }
    } else if (loginResponse === 401) {
      setLoginErrorMessage(t("interface.incorrectUsernameOrPassword"));
    } else {
      setLoginErrorMessage(t("interface.somethingWentWrongTryAgain"));
    }
    return false;
  };

  const [loginErrorMessage, setLoginErrorMessage] = createSignal("");
  let usernameInput!: HTMLInputElement;

  onMount(() => usernameInput.focus());

  return (
    <div>
      <div class=" bg-slate-700 flex h-10 rounded-t-sm shadow-xl mb-6">
        <div class="w-full uppercase text-sm font-semibold text-slate-50 p-3 rounded-t-sm select-none flex items-center">
          {t("interface.logInRequired")}
        </div>
        <Show when={props.onCancel}>
          <div class="grow" />{" "}
          <button
            class="h-10 aspect-square shadow-2xl shadow-amber-600/90 bg-amber-700 text-white flex justify-center items-center rounded-tr-sm active:bg-amber-600 active:scale-[92%]"
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
            {t("interface.username")}
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
            {t("interface.password")}
          </label>
          <input
            class="col-span-3 font-mono block w-10/12 bg-slate-300 outline-none p-3 rounded-sm border-transparent border transition-all duration-75 focus:border-white  focus:shadow-2xl focus:bg-slate-50 group-hover:scale-y-110 focus:scale-y-110"
            name="password"
            id="password"
            type="password"
          />
        </div>

        <input
          class="inline w-fit px-6 py-4 text-md uppercase font-semibold text-white bg-green-700 rounded-sm hover:bg-green-800 active:bg-green-600 cursor-pointer transition-all hover:shadow-2xl hover:shadow-green-900/50 hover:scale-105 duration-75 active:scale-95 outline-none focus:scale-105 focus:shadow-2xl focus:shadow-green-900/50"
          type="submit"
          value={t("interface.logIn")}
        />
      </form>

      <Show when={loginErrorMessage()}>
        <div class="bg-red-700 text-red-50 p-3 text-sm uppercase font-semibold rounded-b-sm transition-all select-none">
          {loginErrorMessage()}
        </div>
      </Show>
    </div>
  );
}
