import { Show, createEffect, For, JSXElement } from "solid-js";
import { useLocation } from "@solidjs/router";
import { useUserLogin } from "~/contexts/users";
import { useNavigate, A } from "@solidjs/router";
import {
  t,
  locale,
  setLocale,
  dictionaries,
  type Locale,
} from "~/contexts/translation";
import { OcPersonfill3 } from "solid-icons/oc";
import { IoLogInSharp, IoMenuSharp } from "solid-icons/io";
import { IoLogOutSharp } from "solid-icons/io";

export default function Nav() {
  const location = useLocation();
  const nagivate = useNavigate();

  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";

  const [user, { logOut }] = useUserLogin();

  return (
    <nav class="select-none rounded-r-sm  bg-slate-600 drop-shadow-2xl  shadow-2xl shadow-slate-950 flex flex-col h-screen w-96 -left-80  hover:-left-0 fixed transition-all duration-200 z-20 group ">
      <div class="flex justify-center text-white bg-slate-950 h-14 items-center transition-all duration-200 select-none">
        <IoMenuSharp
          size={32}
          class="text-slate-300 group-hover:opacity-30 group-hover:rotate-90 transition-all duration-200 absolute right-4 group-hover:right-3 top-3 "
        />
        <span class="uppercase font-semibold text-xs mr-4 relative top-[0px]">
          Pangloss
        </span>{" "}
        <span class="font-extralight">Managing Maximilian</span>
      </div>
      <div class="flex justify-center text-white group-hover:bg-slate-900 h-14  items-center relative">
        <OcPersonfill3 color="white" class="mr-5" />{" "}
        <span class="font-extralight mr-8">
          <Show
            when={user.isLoggedIn && user.loggedInUserName}
            fallback={t("interface.not_logged_in")}
          >
            {user.loggedInUserName}
          </Show>
        </span>
        <Show
          when={user.isLoggedIn}
          fallback={
            <a
              href="/login"
              class="bg-green-900 hover:shadow-xl hover:bg-green-800 active:scale-95 active:shadow-none p-2 aspect-square absolute right-0 h-14 group-hover:flex opacity-0 group-hover:opacity-100 justify-center items-center hidden"
            >
              <IoLogInSharp size={28} class="block mr-1" />
            </a>
          }
        >
          <button
            onClick={logOut}
            class="bg-red-900 hover:shadow-xl hover:bg-red-800 active:scale-95 active:shadow-none p-2 aspect-square absolute right-0 h-14 group-hover:flex opacity-0 group-hover:opacity-100 justify-center items-center hidden"
          >
            <IoLogOutSharp size={28} class="block" />
          </button>
        </Show>
      </div>
      <div class="flex justify-center h-14 group-hover:bg-slate-800">
        <div class="flex items-center">
          <span class="text-white uppercase text-xs font-semibold mr-4">
            {t("interface.language")}
          </span>
          <For each={Object.entries(dictionaries)}>
            {([localeId, dictionaryObject]) => (
              <span
                class={`text-3xl ml-2 mr-2 hover:grayscale-0 cursor-pointer ${
                  locale() !== localeId ? "grayscale" : ""
                }`}
                onClick={() => setLocale(localeId as Locale)}
              >
                {dictionaryObject["interface"]["icon"]}
              </span>
            )}
          </For>
        </div>
      </div>

      <div class=""></div>

      <ul class="group-hover:block hidden">
        <li>
          <MarginLink href="/" small>
            {t("interface.home_page")}
          </MarginLink>
        </li>
        <li>
          <MarginLink href="/about" small>
            {t("interface.about_page")}
          </MarginLink>
        </li>
      </ul>
      <ul class="group-hover:block hidden mt-10">
        <li>
          <MarginLink href="/objects/ZoteroEntry" small={true}>
            {t("ZoteroEntry.__model.verbose_name_plural")}
          </MarginLink>
        </li>
        <li>
          <MarginLink href="/objects/Person" small={true}>
            {t("Person.__model.verbose_name_plural")}
          </MarginLink>
        </li>
        <li>
          <MarginLink href="/objects/Something" small={true}>
            Something
          </MarginLink>
        </li>
      </ul>
    </nav>
  );
}

type MarginLinkProps = {
  href: string;
  children: HTMLElement | JSXElement | string;
  small?: boolean;
};
function MarginLink<Component>(props: MarginLinkProps) {
  return (
    <a
      class={`${
        props.small ? "h-10" : "h-14"
      } w-full bg-slate-900 text-sm hover:bg-slate-950 active:bg-slate-800 active:scale-x-[98.5%] active:scale-y-[95%] text-white uppercase flex justify-center items-center font-semibold first:mt-none mt-[0.5px]`}
      href={props.href}
    >
      {props.children}
    </a>
  );
}
