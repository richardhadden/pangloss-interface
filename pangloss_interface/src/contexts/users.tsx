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

const defaultState = {
  isLoggedIn: false,
  loggedInUserName: "Not Logged In",
  accessingAuthorisedRoute: false,
};

const UserContext = createContext<UserStatusContextValue>([
  defaultState,
  {
    setLoggedIn: () => undefined,
    logOut: () => undefined,
    setAccessingAuthorisedRoute: (boolean) => undefined,
    LoggedIn: () => undefined,
  },
]);

const cookie = cookieStorage;

export const UserProvider: ParentComponent<{
  isLoggedIn: boolean;
}> = (props) => {
  const [state, setState] = createStore({
    isLoggedIn: !!cookie.getItem("logged_in_user_name"),
    loggedInUserName: cookie.getItem("logged_in_user_name") || null,
    accessingAuthorisedRoute: false,
  });

  const setLoggedIn = () => {
    console.log("setting logged in");
    setState({
      isLoggedIn: true,
      loggedInUserName: cookie.getItem("logged_in_user_name") || null,
    });
  };
  const logOut = async () => {
    query.clear();
    setState({ isLoggedIn: false, loggedInUserName: null });
    await fetch("http://localhost:8000/api/users/session", {
      method: "DELETE",
      credentials: "include",
    });
    //cookie.removeItem("logged_in_user_name");
  };
  const setAccessingAuthorisedRoute = (status: boolean) => {
    setState({ accessingAuthorisedRoute: status });
  };

  const LoggedIn = (props: TLogInFormProps & { children: JSXElement }) => {
    return (
      <>
        <Show when={!state.isLoggedIn && state.accessingAuthorisedRoute}>
          <LoginOverlay
            onCancel={() => {
              if (props.onCancel) {
                props.onCancel();
              }
            }}
            onLoginCallback={() => {
              if (props.onLoginCallback) {
                props.onLoginCallback();
              }
            }}
          />
        </Show>
        {props.children}
      </>
    );
  };

  return (
    <UserContext.Provider
      value={[
        state,
        { setLoggedIn, logOut, setAccessingAuthorisedRoute, LoggedIn },
      ]}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserLogin = () => useContext(UserContext);

export const logInUser = async (formData: FormData) => {
  const response = await fetch("http://localhost:8000/api/users/session", {
    method: "post",
    body: formData,
    credentials: "include",
  });
  return response.status;
};
