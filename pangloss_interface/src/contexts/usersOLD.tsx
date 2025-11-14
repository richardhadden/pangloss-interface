import { cookieStorage } from "@solid-primitives/storage";
import { useNavigate, query } from "@solidjs/router";
import {
  createContext,
  useContext,
  type ParentComponent,
  Show,
  createSignal,
  JSXElement,
} from "solid-js";
import { createStore } from "solid-js/store";

import { LoginOverlay, type TLogInFormProps } from "~/components/LogInForm";

export type UserStatusState = {
  readonly isLoggedIn: boolean;
  readonly loggedInUserName: string | null;
  readonly accessingAuthorisedRoute: boolean;
};
export type UserStatusContextValue = [
  state: UserStatusState,
  actions: {
    setLoggedIn: () => void;
    logOut: () => void;
    setAccessingAuthorisedRoute: (status: boolean) => void;
    LoggedIn: (props: TLogInFormProps & { children: JSXElement }) => JSXElement;
  },
];

const cookie = cookieStorage;

const defaultState = {
  isLoggedIn: !!cookie.getItem("logged_in_user_name"),
  loggedInUserName: "Not Logged In",
  accessingAuthorisedRoute: cookie.getItem("logged_in_user_name") || null,
};

const UserContext = createContext<UserStatusContextValue>([
  defaultState,
  {
    setLoggedIn: () => undefined,
    logOut: async () => undefined,
    setAccessingAuthorisedRoute: (accessing_authorised: boolean) => undefined,
    LoggedIn: () => undefined,
  },
]);

export const UserProvider: ParentComponent<{
  isLoggedIn: boolean;
}> = (props) => {
  const [state, setState] = createStore({
    isLoggedIn: !!cookie.getItem("logged_in_user_name"),
    loggedInUserName: cookie.getItem("logged_in_user_name") || null,
    accessingAuthorisedRoute: false,
  });

  const [loginErrorMessage, setLoginErrorMessage] = createSignal<string | null>(
    null,
  );

  const setLoggedIn = () => {
    console.log("setting logged in");
    setState({
      isLoggedIn: true,
      loggedInUserName: cookie.getItem("logged_in_user_name") || null,
    });
  };
  const logOut = async () => {
    alert("logout called");
    query.clear();
    setState({ isLoggedIn: false, loggedInUserName: null });
    await fetch("http://localhost:8000/api/users/session", {
      method: "DELETE",
      credentials: "include",
    });
    cookie.removeItem("logged_in_user_name");
    cookie.removeItem("csrf_access_token");
  };
  const setAccessingAuthorisedRoute = (status: boolean) => {
    setState({ accessingAuthorisedRoute: status });
  };

  const handleInput = async (form: HTMLFormElement) => {
    const formData = new FormData(form);
    console.log(formData);
    if (!formData.get("username") || !formData.get("password")) {
      alert("notformdata");
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

  const RequireLogIn = () => (
    <>
      <Show when={!state.isLoggedIn && state.accessingAuthorisedRoute}>
        <LoginOverlay
          onSubmit={(e) => {
            handleInput(e);
          }}
        />
      </Show>
      {props.children}
    </>
  );

  return (
    <UserContext.Provider
      value={[
        state,
        { setLoggedIn, logOut, setAccessingAuthorisedRoute, RequireLogIn },
      ]}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserLogin = () => useContext(UserContext);

export const logInUser = async (formData: FormData) => {
  console.log("called loginuser");
  const response = await fetch("http://localhost:8000/api/users/session", {
    method: "post",
    body: formData,
    credentials: "include",
  });
  return response.status;
};
