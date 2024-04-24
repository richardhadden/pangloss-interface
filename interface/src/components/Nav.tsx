import { Show, For, JSXElement, createSignal } from "solid-js";
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
import { IoLogOutSharp, IoCreateSharp } from "solid-icons/io";

import {
  TopLevelModels,
  ModelHierarchies,
  ModelConfigs,
  type EntityTypes,
} from "../../ProjectConfig";

const [showNavBar, setShowNavBar] = createSignal(false);

export default function Nav() {
  const location = useLocation();
  const nagivate = useNavigate();

  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";

  const [user, { logOut }] = useUserLogin();

  return (
    <div classList={{ "group navbar-open": showNavBar() }}>
      <nav
        onMouseEnter={() => setShowNavBar(true)}
        onMouseLeave={() => setShowNavBar(false)}
        class="overflow-y-scroll select-none rounded-r-sm  bg-slate-500   shadow-2xl shadow-slate-950 flex flex-col h-screen w-96 -left-80  group-[.navbar-open]:-left-0 fixed transition-all duration-200 z-20 "
      >
        <div class="flex justify-center text-white bg-slate-950 h-14 items-center transition-all duration-200 select-none min-h-14">
          <IoMenuSharp
            size={32}
            class="text-slate-300 group-[.navbar-open]:opacity-30 group-[.navbar-open]:rotate-90 transition-all duration-200 absolute right-4 group-[.navbar-open]:right-3 top-3 "
          />
          <span class="uppercase font-semibold text-xs mr-4 relative top-[0px]">
            Pangloss
          </span>{" "}
          <span class="font-extralight">Managing Maximilian</span>
        </div>
        <div class="flex justify-center text-white group-[.navbar-open]:bg-slate-900 h-14 min-h-14  items-center relative">
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
                class="bg-green-900 hover:shadow-xl hover:bg-green-800 active:scale-95 active:shadow-none p-2 aspect-square absolute right-0 h-14 group-[.navbar-open]:flex opacity-0 group-[.navbar-open]:opacity-100 justify-center items-center hidden"
              >
                <IoLogInSharp size={28} class="block mr-1" />
              </a>
            }
          >
            <button
              onClick={logOut}
              class="bg-red-900 hover:shadow-xl hover:bg-red-800 active:scale-95 active:shadow-none p-2 aspect-square absolute right-0 h-full group-[.navbar-open]:flex opacity-0 group-[.navbar-open]:opacity-100 justify-center items-center hidden"
            >
              <IoLogOutSharp size={28} class="block" />
            </button>
          </Show>
        </div>
        <div class="flex justify-center h-14 group-[.navbar-open]:bg-slate-800 min-h-14">
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

        <ul class="group-[.navbar-open]:block hidden">
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
        <div class="flex justify-center text-white bg-slate-950 h-14 min-h-14 items-center transition-all duration-200 select-none mt-0 opacity-0 group-[.navbar-open]:opacity-100 border-b-[0.25px] border-slate-400/50">
          <span class="uppercase font-semibold text-xs mr-4 relative top-[0px]">
            {t("interface.models")}
          </span>{" "}
        </div>
        <ul class="group-[.navbar-open]:block hidden ">
          <For each={TopLevelModels}>
            {(modelName) => (
              <ModelMenuObject
                modelName={modelName as EntityTypes}
                indent={0}
                gapBelow={true}
              />
            )}
          </For>
        </ul>
      </nav>
    </div>
  );
}

type ModelMenuObjectProps = {
  modelName: EntityTypes;
  indent: number;
  gapBelow?: boolean;
};
function ModelMenuObject<Component>(props: ModelMenuObjectProps) {
  const showItem = () => ModelConfigs[props.modelName].search;

  return (
    <>
      <Show when={showItem()}>
        <li
          class="flex group/button"

          //style={`padding-left: ${props.indent}rem;`}
        >
          <a
            onClick={() => setShowNavBar(false)}
            class="bg-slate-700 group-hover/button:hover:bg-slate-900 group-hover/button:bg-slate-800 group-hover/button:active:bg-slate-600 h-10 w-full text-xs  active:scale-x-[98.5%] active:scale-y-[95%] text-white uppercase flex items-center font-semibold first:mt-none transition-colors duration-75"
            href={`/objects/${props.modelName}`}
            style={`padding-left: ${props.indent + 1}rem`}
          >
            {t(`${props.modelName}.__model.verbose_name_plural`)}
          </a>
          <Show
            when={
              !ModelConfigs[props.modelName].abstract &&
              ModelConfigs[props.modelName].create
            }
          >
            <a
              href={`/objects/${props.modelName}/new`}
              class="bg-green-700 group-hover/button:hover:bg-green-900 group-hover/button:bg-green-800 group-hover/hutton:active:bg-green-600  h-10 aspect-square active:scale-[92%] cursor-pointer flex items-center justify-center text-green-50 transition-colors duration-75"
            >
              <IoCreateSharp />
            </a>
          </Show>
        </li>
      </Show>

      <For each={Object.entries(ModelHierarchies[props.modelName])}>
        {([modelName, modelSubclassDict]) => (
          <ModelMenuObject
            modelName={modelName as EntityTypes}
            indent={props.indent + 1}
          />
        )}
      </For>
    </>
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
      } w-full bg-slate-700 text-sm hover:bg-slate-800 active:bg-slate-600 active:scale-x-[98.5%] active:scale-y-[95%] text-white uppercase flex pl-4 items-center font-semibold first:mt-none mt-[0.5px]`}
      href={props.href}
      onClick={() => setShowNavBar(false)}
    >
      {props.children}
    </a>
  );
}
