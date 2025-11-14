import {
  BaseNodeDefinitionMap,
  type ListResponseType,
} from "../../../.model-configs/model-definitions";
import { BaseNodeTypes } from "../../../.model-configs/model-typescript";
import {
  useCurrentlyHeldKey,
  useKeyDownList,
} from "@solid-primitives/keyboard";
import { Title } from "@solidjs/meta";
import {
  RouteDefinition,
  useParams,
  useLocation,
  useSearchParams,
  type Location,
  useIsRouting,
} from "@solidjs/router";
import { useNavigate } from "@solidjs/router";
import { BiRegularSearch, BiSolidInfoCircle } from "solid-icons/bi";
import { TbBinaryTree } from "solid-icons/tb";
import {
  Suspense,
  For,
  onMount,
  onCleanup,
  Show,
  createMemo,
  createEffect,
} from "solid-js";
import { apiClient, type APIError, getRequest } from "~/apiClient";
import ControlBar from "~/components/ControlBar";
import { LoginOverlay } from "~/components/LogInForm";

import { TranslationKey, useTranslation } from "~/contexts/translation";

import {
  createRefetchableAsync,
  fetchDataCache,
} from "~/utils/createRefetchableAsync";
import { prefetch } from "~/utils/prefetch";
import { Spinner, SpinnerType } from "solid-spinner";
import colors from "tailwindcss/colors";
type TSearchParams = {
  q: string;
  deepSearch: string;
};

async function fetchData<K extends BaseNodeTypes>(
  entityType: K,
  location: Location,
): Promise<ListResponseType<K> | undefined> {
  const data = await apiClient.list(entityType, location.search);
  return data;
}

export const route = {
  preload: ({ params, location }) =>
    fetchDataCache(
      fetchData,
      params.modelType as BaseNodeTypes,
      location as Location,
    ),
} satisfies RouteDefinition;

export default function EntityList() {
  const params: {
    modelType: keyof { modelType: BaseNodeTypes };
  } = useParams();
  const modelDefinition = () =>
    BaseNodeDefinitionMap[params.modelType as BaseNodeTypes];

  const location = useLocation();
  const isRouting = useIsRouting();
  const navigate = useNavigate();
  const [_, { t }] = useTranslation();

  const [data, { refetch, mutate }] = createRefetchableAsync(() => {
    const data = fetchData(params.modelType as BaseNodeTypes, location);
    return data;
  });

  async function doRefetch() {
    await refetch();
  }

  const keydownList = useKeyDownList();

  let searchInputRef!: HTMLInputElement;

  const [searchParams, setSearchParams] = useSearchParams<TSearchParams>();

  const updateSearchString = (value: string) => {
    if (searchParams.deepSearch === "true") {
      return;
    }
    // If no search param, add search param and add to browser history
    // If already search param, user is typing so replace current history
    // so back button doesn't work through each typed character
    if (!searchParams.q) {
      setSearchParams({ q: value });
    } else {
      // TODO: Some slightly improved logic here to not duplicate identical pages
      setSearchParams({ q: value }, { replace: true });
    }
  };

  const toggleDeepSearch = () => {
    console.log(searchParams.deepSearch);
    if (
      searchParams.deepSearch === undefined ||
      searchParams.deepSearch === "false"
    ) {
      setSearchParams({ deepSearch: true });
    } else {
      setSearchParams(
        { deepSearch: null, q: searchInputRef.value || null },
        { replace: true },
      );
    }
  };

  const deepSearchOn = () => {
    if (
      searchParams.deepSearch === undefined ||
      searchParams.deepSearch === "false"
    ) {
      return false;
    } else if (
      searchParams.deepSearch !== undefined ||
      searchParams.deepSearch === "true"
    ) {
      return true;
    }
  };

  const startDeepSearch = () => {
    setSearchParams(
      { deepSearch: true, q: searchInputRef.value || null },
      { replace: true },
    );
  };

  const onSearchKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && searchParams.deepSearch) {
      startDeepSearch();
      searchInputRef.focus();
    }
  };

  onMount(() => {
    const onKeypressFunction = (event: KeyboardEvent) => {
      const isAlphaRegex = /^[a-z0-9]$/i;

      if (keydownList().length > 1) {
        return;
      }

      if (
        document.activeElement?.tagName !== "INPUT" &&
        isAlphaRegex.test(event.key)
      ) {
        updateSearchString(
          searchParams.q ? searchParams.q + event.key : event.key,
        );
        searchInputRef.focus();
      }
    };

    const onDeletePressFunction = (event: KeyboardEvent) => {
      if (
        document.activeElement?.tagName !== "INPUT" &&
        event.key === "Backspace"
      ) {
        updateSearchString(
          searchParams.q ? (searchParams.q.slice(0, -1) as string) : "",
        );
        searchInputRef.focus();
      }
    };

    document.addEventListener("keypress", onKeypressFunction);
    document.addEventListener("keydown", onDeletePressFunction);
    onCleanup(() => {
      (document.removeEventListener("keypress", onKeypressFunction),
        document.removeEventListener("keydown", onDeletePressFunction));
    });
  });

  const getNextPage = async () => {
    if (data() !== undefined) {
      const next = (data() as ListResponseType<BaseNodeTypes>)?.nextUrl;
      if (!next) return;
      const response = await fetch(next, {
        method: "get",
        credentials: "include",
      });
      if (response.status === 401) {
        //setAccessingAuthorisedRoute(true);
        //logOut();
        return;
      }
      const newData = await response.json();

      mutate({
        ...data(),
        ...newData,
        results: [
          ...(data() as ListResponseType<BaseNodeTypes>).results,
          ...newData.results,
        ],
      });
    }
  };

  //console.log(searchRegex());

  return (
    <>
      <Suspense>
        <Title>
          {t[params.modelType as TranslationKey]._model.verboseNamePlural()} |
          Pangloss
        </Title>
        <ControlBar
          modelType={params.modelType as BaseNodeTypes}
          modelTypeNumber="plural"
          addFunction={
            !modelDefinition().meta.abstract && modelDefinition().meta.create
              ? () => navigate(`/${params.modelType}/new`)
              : null
          }
          centreContent={
            <div class="mx-10 flex items-center justify-center pt-3">
              <input
                disabled={deepSearchOn() && isRouting()}
                ref={searchInputRef}
                class="block h-10 min-w-3/6 rounded-l-sm bg-slate-100 px-2 hover:bg-slate-200 focus:bg-slate-200 focus:outline-none disabled:bg-slate-300"
                classList={{
                  "bg-slate-100/50": searchParams.q === undefined,
                  "bg-slate-200/50": searchParams.q !== undefined,
                }}
                type="text"
                placeholder="Search..."
                value={searchParams.q || ""}
                oninput={(e) => updateSearchString(e.currentTarget?.value)}
                onKeyPress={(e) => onSearchKeyPress(e)}
              />
              <Show when={deepSearchOn()}>
                <button
                  class="group flex aspect-square h-10 cursor-pointer items-center justify-center bg-slate-400/40 px-2 hover:bg-slate-400/60"
                  onclick={startDeepSearch}
                  disabled={isRouting()}
                >
                  <Show
                    when={isRouting()}
                    fallback={
                      <BiRegularSearch class="relative top-[1px] group-active:scale-90" />
                    }
                  >
                    <Spinner
                      type={SpinnerType.puff}
                      color={colors.slate[700]}
                    />
                  </Show>
                </button>
              </Show>
              <button
                classList={{
                  "bg-slate-100": !deepSearchOn(),
                  "bg-slate-400/90  drop-shadow-xs": deepSearchOn(),
                }}
                onClick={() => toggleDeepSearch()}
                class="group mr-2 flex h-10 w-fit cursor-pointer items-center justify-center rounded-r-sm pr-4 pl-3 hover:bg-slate-400/80"
              >
                <TbBinaryTree
                  class="mr-2 group-active:scale-90"
                  color={
                    deepSearchOn()
                      ? "oklch(0.372 0.044 257.287)"
                      : "oklch(0.446 0.043 257.281)"
                  }
                />
                <span
                  class="text-xs text-wrap uppercase group-active:scale-95"
                  classList={{
                    "font-semibold text-slate-500 group-hover:text-slate-600":
                      !deepSearchOn(),
                    "font-semibold text-slate-700": deepSearchOn(),
                  }}
                >
                  Deep Search{" "}
                  <Show when={deepSearchOn()} fallback={<>off</>}>
                    on
                  </Show>
                </span>
              </button>

              <div
                class="ml-3 h-full w-6 text-xs font-semibold uppercase select-none"
                classList={{
                  "text-slate-500":
                    (data()?.count as number) > 0 ||
                    typeof searchParams.q === "undefined",
                  "text-orange-800":
                    (data()?.count as number) === 0 &&
                    typeof searchParams.q !== "undefined",
                }}
              >
                {data()?.count}
              </div>
            </div>
          }
        />
        <section class="mt-28 pt-6 pr-32 pl-32">
          <Suspense fallback={<h1>Loading!</h1>}>
            <Show
              when={data() && data()?.results.length === 0 && searchParams.q}
            >
              <div class="group m-2 mb-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-xs">
                <div class="flex aspect-square h-full items-center justify-center rounded-l-xs bg-amber-600 shadow-md">
                  <BiSolidInfoCircle color="white" size={18} />
                </div>
                <div class="flex h-full items-center rounded-r-xs bg-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 uppercase shadow-md">
                  No results matching &ldquo;
                  <span class="font-normal normal-case">{searchParams.q}</span>
                  &rdquo;
                </div>
              </div>
            </Show>

            <Show when={data()}>
              {(data) => (
                <>
                  <For each={data().results}>
                    {(item) => (
                      <a
                        id={item.id}
                        use:prefetch={1000}
                        href={`/${item.type}/${item.id}`}
                        onMouseLeave={(e) => e.currentTarget.blur()}
                        class="group m-2 mb-4 line-clamp-1 flex h-10 w-full cursor-pointer truncate rounded-xs text-ellipsis transition-none duration-75 outline-none hover:shadow-xs active:shadow-inner"
                      >
                        <div class="flex flex-col items-start justify-center rounded-l-xs border-r-[0.5px] border-r-white bg-slate-600 p-3 text-xs font-semibold text-slate-50 uppercase select-none group-hover:bg-slate-700 group-focus:bg-slate-700 group-active:bg-slate-500">
                          <span class="group-active:mt-[1px] group-active:block group-active:scale-x-[99%] group-active:scale-y-[99.5%]">
                            {t[item.type as BaseNodeTypes]._model.verboseName()}
                          </span>
                        </div>
                        <div class="line-clamp-1 flex w-full items-center truncate rounded-r-xs bg-neutral-300 p-2 pr-6 pl-6 text-left text-sm font-normal text-pretty text-ellipsis text-neutral-950 group-hover:bg-neutral-400 group-focus:bg-zinc-400 group-active:bg-zinc-200 group-active:text-zinc-600">
                          <span class="group-hover:text-black group-active:mt-[1px] group-active:block group-active:scale-x-[99.5%] group-active:scale-y-[99.5%] group-active:text-black/80">
                            <Show
                              when={modelDefinition().meta.labelField}
                              fallback={item.label}
                            >
                              <div
                                innerHTML={
                                  item[
                                    modelDefinition().meta
                                      .labelField as keyof typeof item
                                  ] as string
                                }
                              ></div>
                            </Show>
                          </span>
                        </div>
                      </a>
                    )}
                  </For>
                  <div id="endOfList" />
                  <Show when={data().nextUrl}>
                    <div class="mt-12 mb-6 flex justify-center">
                      <button
                        onMouseLeave={(e) => e.currentTarget.blur()}
                        onClick={getNextPage}
                        class="text-md inline w-fit cursor-pointer rounded-xs bg-green-700 px-6 py-4 font-semibold text-white uppercase transition-all outline-none hover:bg-green-800 hover:shadow-2xl hover:shadow-green-900/50 focus:shadow-green-900/50 active:bg-green-600"
                      >
                        {"t(interface.getMoreResults)"}
                      </button>
                    </div>
                  </Show>
                </>
              )}
            </Show>
          </Suspense>
        </section>
      </Suspense>
    </>
  );
}
