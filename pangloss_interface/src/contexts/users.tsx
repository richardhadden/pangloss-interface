import { cookieStorage } from "@solid-primitives/storage";
import { query, useNavigate } from "@solidjs/router";

import { ImCross } from "solid-icons/im";
import {
  createContext,
  createSignal,
  JSXElement,
  onMount,
  ParentComponent,
  Show,
  Suspense,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Portal } from "solid-js/web";
import { Spinner, SpinnerType } from "solid-spinner";
import colors from "tailwindcss/colors";

export type TUserStatusContext = {
  isLoggedIn: Accessor<boolean>;
  loggedInUserName: Accessor<string | null>;
  setLoggedIn: () => void;
  logOutUser: () => Promise<void>;
};

const cookie = cookieStorage;
type Accessor<T> = () => T;

const UserContext = createContext<TUserStatusContext>({
  isLoggedIn: () => !!cookie.getItem("logged_in_user_name"),
  loggedInUserName: () => null,
  setLoggedIn: () => undefined,
  logOutUser: async () => undefined,
});

export const UserProvider = (props: { children: JSXElement }) => {
  const [userState, setUserState] = createStore({
    isLoggedIn: !!cookie.getItem("logged_in_user_name"),
    loggedInUserName: cookie.getItem("logged_in_user_name")
      ? cookie.getItem("logged_in_user_name")
      : null,
  });

  function setLoggedIn() {
    setUserState({
      isLoggedIn: true,
      loggedInUserName: cookie.getItem("logged_in_user_name") || null,
    });
  }

  async function logOutUser() {
    query.clear();
    await postLogOut();
    setUserState({ isLoggedIn: false, loggedInUserName: null });
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: () => userState.isLoggedIn,
        loggedInUserName: () => userState.loggedInUserName,
        setLoggedIn: setLoggedIn,
        logOutUser: logOutUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

const userState = () => useContext(UserContext);

export const postLoginFormData = async (formData: FormData) => {
  const response = await fetch("http://localhost:8000/api/users/session", {
    method: "post",
    body: formData,
    credentials: "include",
  });
  return response.status;
};

export const postRefresh = async () => {
  const response = await fetch(
    "http://localhost:8000/api/users/session/refresh",
    {
      method: "post",
      credentials: "include",
    },
  );
  return response.status;
};

export const postLogOut = async () => {
  await fetch("http://localhost:8000/api/users/session", {
    method: "DELETE",
    credentials: "include",
  });
  cookie.removeItem("logged_in_user_name");
  cookie.removeItem("csrf_access_token");
};

type TLoginFormProps = {
  onSuccessfulLoginCallback?: () => void;
  onCancelCallback?: () => void;
};

const LoginForm = (props: TLoginFormProps) => {
  const user = userState();

  const [loginErrorMessage, setLoginErrorMessage] = createSignal<string | null>(
    null,
  );
  const [submittingFormToServer, setSubmittingFormToServer] =
    createSignal<boolean>(false);

  let formRef!: HTMLFormElement;
  let usernameInputRef!: HTMLInputElement;

  onMount(() => usernameInputRef.focus());

  const onSubmitFormHandler = async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(formRef);

    if (!formData.get("username") || !formData.get("password")) {
      setLoginErrorMessage("Username or Password Missing");
      return false;
    }
    setSubmittingFormToServer(true);

    const loginResponse = await postLoginFormData(formData);

    if (loginResponse === 200) {
      user.setLoggedIn();
      if (props.onSuccessfulLoginCallback) {
        props.onSuccessfulLoginCallback();
      }
    } else if (loginResponse === 401) {
      user.logOutUser();
      setLoginErrorMessage("Incorrect Username or Password");
    } else {
      user.logOutUser();
      setLoginErrorMessage("Something went wrong");
    }
    setSubmittingFormToServer(false);
    return false;
  };
  return (
    <>
      <div class="fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-slate-400/60 backdrop-blur-sm">
        <div class="w-4/12 rounded-sm bg-slate-200/50 shadow-2xl backdrop-blur-2xl">
          <div class="mb-6 flex h-10 rounded-t-xs bg-slate-700 shadow-xl">
            <div class="flex w-full items-center rounded-t-sm p-3 text-sm font-semibold text-slate-50 uppercase select-none">
              {"Log in required"}
            </div>
            <Show when={props.onCancelCallback}>
              <div class="grow" />{" "}
              <button
                class="group flex aspect-square h-10 cursor-pointer items-center justify-center rounded-tr-xs bg-amber-700 text-white shadow-2xl shadow-amber-600/90 active:bg-amber-600 active:shadow-inner active:shadow-amber-900/50"
                onClick={props.onCancelCallback}
              >
                <ImCross size={12} class="group-active:scale-[92%]" />
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
                ref={usernameInputRef}
                class="col-span-3 block w-10/12 rounded-sm border border-transparent bg-zinc-800/20 p-3 font-mono transition-all duration-75 outline-none focus:bg-zinc-900/20"
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
                class="col-span-3 block w-10/12 rounded-sm border border-transparent bg-zinc-800/20 p-3 font-mono transition-all duration-75 outline-none focus:bg-zinc-900/20"
                name="password"
                id="password"
                type="password"
              />
            </div>

            <button
              class="group text-md box-border flex items-center justify-center rounded-xs bg-green-700/90 px-6 py-4 font-semibold text-white uppercase outline-none hover:bg-green-800 hover:shadow-xl hover:shadow-green-700/10 focus:shadow-green-700/10 active:bg-green-700 active:shadow-inner active:shadow-green-900 disabled:bg-slate-600/80"
              classList={{ "cursor-pointer": !submittingFormToServer() }}
              type="submit"
              value="Log In"
              onClick={onSubmitFormHandler}
              disabled={submittingFormToServer()}
            >
              <Show
                when={submittingFormToServer()}
                fallback={<span class="group-active:scale-[98%]">Log In</span>}
              >
                Loggin in
                <Spinner
                  type={SpinnerType.puff}
                  color={colors.slate[300]}
                  width={24}
                  height={24}
                  class="ml-4"
                />
              </Show>
            </button>
          </form>
          <Show when={loginErrorMessage()}>
            <div class="rounded-b-xs bg-red-700 p-3 text-sm font-semibold text-red-50 uppercase transition-all select-none">
              {loginErrorMessage()}
            </div>
          </Show>
        </div>
      </div>
    </>
  );
};

type TRequireLoginProps = {
  onCancelCallback?: () => void;
  onSuccessCallback?: () => void;
};

const RequireLogin = (props: TRequireLoginProps) => {
  const cookie = cookieStorage;

  const user = userState();
  const navigate = useNavigate();

  return (
    <Show when={!user.isLoggedIn()}>
      <LoginForm
        onSuccessfulLoginCallback={props.onSuccessCallback}
        onCancelCallback={
          props.onCancelCallback ? props.onCancelCallback : () => navigate("/")
        }
      />
    </Show>
  );
};

export { RequireLogin, userState, LoginForm };
