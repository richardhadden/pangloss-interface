import { Show, createEffect } from "solid-js";
import { useLocation } from "@solidjs/router";
import { useUserLogin } from "~/contexts/users";
import { useNavigate, A } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const nagivate = useNavigate();

  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";

  const [user, { logOut }] = useUserLogin();

  return (
    <nav class="bg-slate-600 shadow-2xl shadow-slate-900 flex flex-col h-screen w-96 -left-80 hover:-left-0 fixed transition-all duration-200 z-20">
      <div>{user.loggedInUserName}</div>
      <ul class="container flex flex-col items-center p-3 text-gray-200">
        <Show
          when={user.isLoggedIn}
          fallback={
            <li class={`border-b-2 ${active("/login")} mx-1.5 sm:mx-6`}>
              <a href="/login">Log In</a>
            </li>
          }
        >
          <li class={`border-b-2 ${active("/logout")} mx-1.5 sm:mx-6`}>
            <button onClick={logOut}>Log Out</button>
          </li>
        </Show>

        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/">Home</a>
        </li>
        <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
          <a href="/about">About</a>
        </li>
        <li
          class={`border-b-2 ${active("/objects/ZoteroEntry/")} mx-1.5 sm:mx-6`}
        >
          <A href="/objects/ZoteroEntry">Zotero Entries</A>
        </li>
        <li class={`border-b-2 ${active("/objects/Person/")} mx-1.5 sm:mx-6`}>
          <a href="/objects/Person">Persons</a>
        </li>
      </ul>
    </nav>
  );
}
