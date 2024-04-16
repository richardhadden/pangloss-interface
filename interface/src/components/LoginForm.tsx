import { A } from "@solidjs/router";
import Counter from "~/components/Counter";
import * as api from "../../newSchema";

import type { JSX } from "solid-js";
import { Show, createSignal } from "solid-js";
import { EventHandler } from "vinxi/http";
import { ApiError } from "../../newSchema";
import { redirect, useNavigate } from "@solidjs/router";
import { useUserLogin, logInUser } from "~/contexts/users";
import { t } from "~/contexts/translation";

type LoginFormProps = { onLoginCallback?: () => void };
export default function LoginForm(props: LoginFormProps) {
  const [user, { setLoggedIn, logOut: setLoggedOut }] = useUserLogin();

  const handleInput:
    | JSX.EventHandlerUnion<HTMLFormElement, Event & { submitter: HTMLElement }>
    | undefined = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData.get("username") || !formData.get("password")) {
      setLoginErrorMessage(t("interface.username_or_password_missing"));
      return false;
    }

    const loginResponse = await logInUser(formData);
    if (loginResponse === 200) {
      setLoggedIn();
      if (props.onLoginCallback) {
        props.onLoginCallback();
      }
    } else if (loginResponse === 401) {
      setLoginErrorMessage(t("interface.incorrect_username_or_password"));
    } else {
      setLoginErrorMessage(t("interface.something_went_wrong_try_again"));
    }
    return false;
  };

  const [loginErrorMessage, setLoginErrorMessage] = createSignal("");

  return (
    <div>
      <div class="w-full uppercase text-sm font-semibold bg-slate-700 text-slate-50 p-3 rounded-t-sm select-none">
        {t("interface.log_in_required")}
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
            //class="block w-full bg-slate-100 hover:border-b-indigo-400 hover:rounded-b-none outline-none p-3 rounded-sm border-b-[1.5px] border-b-transparent focus:duration-100 focus:border-b-indigo-700 focus:rounded-b-none transition-all focus:bg-slate-200 duration-75 focus:shadow-sm"
            class="col-span-3 font-mono block w-10/12 bg-slate-300 outline-none p-3 rounded-sm border-transparent border transition-all duration-75 focus:border-white  focus:shadow-2xl focus:bg-slate-50 group-hover:scale-y-110 focus:scale-y-110"
            name="username"
            id="username"
            type="text"
            //placeholder="user name"
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
            //placeholder="password"
          />
        </div>

        <input
          class="inline w-fit px-6 py-4 text-md uppercase font-semibold text-white bg-green-700 rounded-sm hover:bg-green-800 active:bg-green-600 cursor-pointer transition-all hover:shadow-2xl hover:shadow-green-900/50 hover:scale-105 duration-75 active:scale-95 outline-none focus:scale-105 focus:shadow-2xl focus:shadow-green-900/50"
          type="submit"
          value={t("interface.log_in")}
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
