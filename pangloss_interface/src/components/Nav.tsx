import {
  BaseNodeDefinitionMap,
  type TModelDefinitionMap,
  TSubtypeHierarchy,
  type TBaseNode,
} from "../../.model-configs/model-definitions";
import { type BaseNodeTypes } from "../../.model-configs/model-typescript";
import { config } from "../../.model-configs/project-config";
import { LoginOverlay } from "./LogInForm";
import { createShortcut } from "@solid-primitives/keyboard";
import { A, useLocation, useNavigate } from "@solidjs/router";
import {
  BiRegularMenu,
  BiSolidLogIn,
  BiSolidUser,
  BiSolidUserX,
  BiSolidPlusCircle,
  BiSolidLogOut,
} from "solid-icons/bi";
import { createEffect, createSignal, For, Show } from "solid-js";
import { JSX } from "solid-js";
import colors from "tailwindcss/colors";
import {
  useTranslation,
  LocaleOptions,
  TranslationKey,
} from "~/contexts/translation";
import { useUserLogin } from "~/contexts/users";

function getTopLevelModels(): TModelDefinitionMap {
  const filtered = Object.entries(BaseNodeDefinitionMap).filter(
    ([modelName, model]) =>
      model.meta.supertypes.length === 0 && model.meta.view,
  );
  return Object.fromEntries(filtered) as TModelDefinitionMap;
}

const topLevelModels = getTopLevelModels();

type NavButtonProps = {
  deactivate?: boolean;
  class?: string;
  icon?: JSX.Element;
  onClick?: () => void;
};

const [navHovered, setNavHovered] = createSignal(false);

function NavButton(props: NavButtonProps) {
  return (
    <button
      onClick={props.onClick}
      class={`aspect-square active:shadow-inner box-border  h-12 flex justify-center items-center group ${props.class}`}
      disabled={props.deactivate}
    >
      <div
        classList={{
          "group-active:scale-90 group-hover:scale-105 cursor-pointer":
            !props.deactivate,
        }}
      >
        {props.icon}
      </div>
    </button>
  );
}

type ModelMenuItemPropsType = {
  subtypeHierarchy: TSubtypeHierarchy<BaseNodeTypes>;
  indent: number;
};

const modelMenuItemStyle =
  "group hover:bg-slate-700 cursor-pointer h-8 bg-slate-600 items-center uppercase text-xs text-slate-200  not-last-of-type:border-b-[0.25px] not-last-of-type:border-slate-500 flex justify-between";

const modelMenuButtonStyle =
  "flex-1 flex justify-start uppercase cursor-pointer h-full items-center group-hover:bg-slate-700 hover:bg-slate-800 active:bg-slate-500 group/mButton";

const modelMenuAddButtonStyle =
  "aspect-square h-8 bg-green-700/90 flex items-center justify-center hover:bg-green-600/90 group-hover:bg-green-800/90 cursor-pointer active:bg-green-500/90 active:shadow-inner  group/button";

function ModelMenuItem(props: ModelMenuItemPropsType) {
  const [_, { t }] = useTranslation();
  const [user] = useUserLogin();

  return (
    <>
      <For each={Object.entries(props.subtypeHierarchy)}>
        {([modelName, subtypeHierarchy]) => (
          <>
            <div class={modelMenuItemStyle}>
              <A
                onclick={() => setNavHovered(false)}
                class={modelMenuButtonStyle}
                style={`padding-left: calc(${(props.indent + 1) * 1}rem + 0.75rem);`}
                href={`/${modelName}`}
              >
                <span class="group-active/mButton:scale-95">
                  {t[modelName as TranslationKey]._model.verboseNamePlural()}
                </span>
              </A>
              <Show
                when={
                  BaseNodeDefinitionMap[modelName as BaseNodeTypes].meta
                    .create &&
                  !BaseNodeDefinitionMap[modelName as BaseNodeTypes].meta
                    .abstract
                }
              >
                <A
                  onclick={() => setNavHovered(false)}
                  class={modelMenuAddButtonStyle}
                  href={`/${modelName}/new`}
                >
                  <BiSolidPlusCircle class="group-active/button:scale-90" />
                </A>
              </Show>
            </div>
            <ModelMenuItem
              subtypeHierarchy={subtypeHierarchy}
              indent={props.indent + 1}
            />
          </>
        )}
      </For>
    </>
  );
}

function ModelMenu() {
  const [user] = useUserLogin();
  const [lang, { t }] = useTranslation();
  return (
    <For each={Object.entries(topLevelModels)}>
      {([modelName, model]) => (
        <>
          <div class={modelMenuItemStyle}>
            <A
              onclick={() => setNavHovered(false)}
              style="padding-left: 0.75rem;"
              class={modelMenuButtonStyle}
              href={`/${modelName}`}
            >
              <span class="group-active/mButton:scale-95">
                {t[modelName as BaseNodeTypes]._model.verboseNamePlural()}
              </span>
            </A>
            <Show
              when={
                BaseNodeDefinitionMap[modelName as BaseNodeTypes].meta.create &&
                !BaseNodeDefinitionMap[modelName as BaseNodeTypes].meta.abstract
              }
            >
              <A
                class={modelMenuAddButtonStyle}
                href={`/${modelName}/new`}
                onclick={() => setNavHovered(false)}
              >
                <BiSolidPlusCircle class="group-active/button:scale-90" />
              </A>
            </Show>
          </div>
          <ModelMenuItem
            subtypeHierarchy={model.meta.subtypeHierarchy}
            indent={0}
          />
        </>
      )}
    </For>
  );
}

type FlagButtonProps = { lang: LocaleOptions; flag: string };

function FlagButton(props: FlagButtonProps) {
  const [locale, { t, setLocale }] = useTranslation();
  return (
    <NavButton
      onClick={() => setLocale(props.lang)}
      class="bg-slate-600/90 hover:bg-slate-500/90 active:bg-slate-700/90 not-last:border-r-[0.25px] not-last:border-r-slate-900 active:rounded-sm"
      icon={
        <img
          src={`https://flagsapi.com/${props.flag.toUpperCase()}/flat/64.png`}
          class="m-2 w-7.5 rounded-xl overflow-hidden group-hover:opacity-100"
        />
      }
    />
  );
}

export default function Nav() {
  const [user, { logOut }] = useUserLogin();
  const [currentLanguage] = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  const [showLoginOverlay, setShowLoginOverlay] = createSignal(false);

  createShortcut(
    ["`"],
    () => {
      if (document.activeElement?.tagName !== "INPUT") {
        setNavHovered(!navHovered());
      }
    },
    { preventDefault: false, requireReset: true },
  );

  createEffect(() =>
    console.log("user logged in", user.isLoggedIn, user.loggedInUserName),
  );

  return (
    <>
      <Show when={showLoginOverlay()}>
        <LoginOverlay
          onLoginCallback={() => setShowLoginOverlay(false)}
          onCancel={() => setShowLoginOverlay(false)}
        />
      </Show>
      <nav
        class="fixed top-0 h-full w-80 text-sm font-semibold transition-all border-l border-slate-800 will-change-transforms"
        classList={{
          "-left-68 shadow-xl shadow-slate-300 bg-slate-400": !navHovered(),
          "left-0 shadow-2xl shadow-slate-800 drop-shadow-2xl bg-slate-400":
            navHovered(),
        }}
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
      >
        <div
          class=" w-full bg-slate-800 transition-all flex justify-between items-center "
          classList={{
            " h-12": !navHovered(),
            "h-16": navHovered(),
          }}
        >
          <header
            class="transition-none flex items-center text-slate-100 text-lg tracking-wider font-extralight h-full pl-3 select-none"
            classList={{
              "opacity-0": !navHovered(),
              "opacity-100 w-[calc(100%-48px)] justify-center": navHovered(),
            }}
          >
            <A href="/">{config.projectName}</A>
          </header>
          <BiRegularMenu
            color="white"
            size={navHovered() ? 36 : 28}
            class="transition-all mr-2.5"
            classList={{
              "rotate-90  mr-2 relative left-[3px]": navHovered(),
            }}
          />
        </div>

        <div class="bg-slate-900  uppercase text-xs text-slate-300 flex justify-between">
          <Show
            when={user.isLoggedIn}
            fallback={
              <>
                <div class="p-3 flex items-center select-none">
                  <BiSolidUser class="mr-2" /> Not Logged In
                </div>
                <div class="flex">
                  <NavButton
                    class="bg-slate-700/90 hover:bg-slate-600/90 active:bg-slate-800/90 not-last:border-r-[0.25px] not-last:border-r-slate-900"
                    icon={<BiSolidLogIn size={28} color="white" />}
                    onClick={() => {
                      setShowLoginOverlay(true);
                      setNavHovered(false);
                    }}
                  />
                  <NavButton
                    deactivate={true}
                    icon={
                      <BiSolidUserX
                        size={26}
                        color={colors.slate[400]}
                        class="relative left-0.5"
                      />
                    }
                  />
                </div>
              </>
            }
          >
            <>
              <div class="p-3 flex items-center select-none">
                <BiSolidUser class="mr-2" /> {user.loggedInUserName}
              </div>
              <div class="flex">
                <NavButton
                  class="bg-slate-700/90 hover:bg-slate-600/90 active:bg-slate-800/90 not-last:border-r-[0.25px] not-last:border-r-slate-900"
                  icon={<BiSolidLogOut size={28} color="white" />}
                  onClick={() => {
                    logOut();
                    if (user.accessingAuthorisedRoute) {
                      navigate("/");
                    }
                  }}
                />
                <NavButton
                  deactivate={true}
                  icon={
                    <BiSolidUser
                      size={26}
                      color={colors.slate[200]}
                      class="relative left-0.5"
                    />
                  }
                />
              </div>
            </>
          </Show>
        </div>
        <div class="bg-slate-700  uppercase text-xs text-slate-300 flex justify-between h-12">
          <div class="p-3 flex items-center select-none">Language</div>
          <div class="flex">
            <For
              each={config.langs.filter((l) => l.lang !== currentLanguage())}
            >
              {(lang) => (
                <FlagButton
                  lang={lang.lang as LocaleOptions}
                  flag={lang.flag}
                />
              )}
            </For>

            <div>
              <NavButton
                deactivate={true}
                class="bg-slate-700"
                icon={
                  <img
                    src={`https://flagsapi.com/${config.langs.filter((l) => l.lang === currentLanguage())[0].flag}/flat/64.png`}
                    class="m-2 w-7.5 overflow-hidden rounded-sm p-0"
                  />
                }
              />
            </div>
          </div>
        </div>
        <div
          class="mt-10"
          classList={{ hidden: !navHovered(), block: navHovered() }}
        >
          <div class="w-full bg-slate-900 flex items-center uppercase text-xs font-semibold text-slate-100 h-12 pl-3">
            Models
          </div>
          <ModelMenu />
        </div>
      </nav>
    </>
  );
}
