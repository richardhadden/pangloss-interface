import { useNavigate, cache } from "@solidjs/router";
import {
  createContext,
  useContext,
  type ParentComponent,
  Show,
} from "solid-js";
import { createStore } from "solid-js/store";
import { cookieStorage } from "@solid-primitives/storage";
import { LoginForm } from "~/components/LoginForm";
import { t } from "~/contexts/translation";

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
  }
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

  const setLoggedIn = () =>
    setState({
      isLoggedIn: !!cookie.getItem("logged_in_user_name"),
      loggedInUserName: cookie.getItem("logged_in_user_name") || null,
    });
  const logOut = async () => {
    cache.clear();
    setState({ isLoggedIn: false, loggedInUserName: null });
    await fetch("http://localhost:8000/api/users/logout", {
      credentials: "include",
    });
    //cookie.removeItem("logged_in_user_name");
  };
  const setAccessingAuthorisedRoute = (status: boolean) => {
    setState({ accessingAuthorisedRoute: status });
  };

  return (
    <UserContext.Provider
      value={[state, { setLoggedIn, logOut, setAccessingAuthorisedRoute }]}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserLogin = () => useContext(UserContext);

export const logInUser = async (formData: FormData) => {
  const response = await fetch("http://localhost:8000/api/users/login", {
    method: "post",
    body: formData,
    credentials: "include",
  });
  return response.status;
};
