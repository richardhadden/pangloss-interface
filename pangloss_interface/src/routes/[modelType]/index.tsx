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
import { BiSolidInfoCircle } from "solid-icons/bi";
import {
  Suspense,
  For,
  onMount,
  onCleanup,
  Show,
  createEffect,
} from "solid-js";
import { apiClient, type APIError, getRequest } from "~/apiClient";
import ControlBar from "~/components/ControlBar";
import { LoginOverlay } from "~/components/LogInForm";
import { Switch, SwitchControl, SwitchThumb } from "~/components/ui/switch";
import { useTranslation } from "~/contexts/translation";
import { useUserLogin } from "~/contexts/users";
import {
  createRefetchableAsync,
  fetchDataCache,
} from "~/utils/createRefetchableAsync";
import { prefetch } from "~/utils/prefetch";

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
  const [user, { setAccessingAuthorisedRoute, logOut }] = useUserLogin();
  const params: {
    modelType: keyof { modelType: BaseNodeTypes };
  } = useParams();
  const modelDefinition =
    BaseNodeDefinitionMap[params.modelType as BaseNodeTypes];

  const location = useLocation();
  const isRouting = useIsRouting();
  const [_, { t }] = useTranslation();

  const [data, { refetch, mutate }] = createRefetchableAsync(() =>
    fetchData(params.modelType as BaseNodeTypes, location),
  );

  async function doRefetch() {
    await refetch();
  }

  const keydownList = useKeyDownList();

  onMount(() => {
    setAccessingAuthorisedRoute(false);
  });

  let searchInputRef!: HTMLInputElement;

  const [searchParams, setSearchParams] = useSearchParams<TSearchParams>();

  const updateSearchString = (value: string) => {
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

  const setDeepSearch = (value: boolean) => {
    setSearchParams({ deepSearch: value });
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
        setAccessingAuthorisedRoute(true);
        logOut();
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

  return (
    <>
      <Title>{params.modelType} | Pangloss</Title>
      <ControlBar
        modelType={params.modelType as BaseNodeTypes}
        modelTypeNumber="plural"
        //addFunction={() => navigate(`/${params.modelType}/new`)}
        centreContent={
          <div class="mx-10 flex justify-center items-center pt-3">
            <input
              ref={searchInputRef}
              class="h-10  min-w-3/6 block px-2 rounded-sm focus:outline-none bg-slate-100 hover:bg-slate-200 focus:bg-slate-200"
              classList={{
                "bg-slate-100/50": searchParams.q === undefined,
                "bg-slate-200/50": searchParams.q !== undefined,
              }}
              type="text"
              placeholder="Search..."
              value={searchParams.q || ""}
              oninput={(e) => updateSearchString(e.currentTarget?.value)}
            />

            <div
              class="ml-3 text-xs uppercase h-full w-6 font-semibold select-none "
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
      <section class="pl-16 pr-16 pt-6">
        <Suspense fallback={<h1>Loading!</h1>}>
          <Show when={data() && data()?.results.length === 0 && searchParams.q}>
            <div class="w-full m-2 mb-4 h-12 flex rounded-xs group cursor-pointer items-center justify-center ">
              <div class="bg-amber-600 h-full rounded-l-xs aspect-square flex justify-center items-center shadow-md">
                <BiSolidInfoCircle color="white" size={18} />
              </div>
              <div class="bg-slate-300 text-slate-600 h-full rounded-r-xs py-2 px-4 text-sm uppercase font-semibold flex items-center shadow-md">
                No results matching &ldquo;
                <span class="normal-case font-normal">{searchParams.q}</span>
                &rdquo;
              </div>
            </div>
          </Show>
          <Switch aria-label="Hello">
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
          </Switch>
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
                      class=" truncate line-clamp-1 text-ellipsis w-full m-2 mb-4 h-10 flex rounded-xs group cursor-pointer  outline-none transition-none duration-75 hover:shadow-xs active:shadow-inner"
                    >
                      <div class="bg-slate-600 rounded-l-xs border-r-white border-r-[0.5px] uppercase font-semibold text-slate-50 text-xs flex flex-col justify-center items-start p-3 group-hover:bg-slate-700 group-focus:bg-slate-700 group-active:bg-slate-500">
                        <span class=" group-active:scale-x-[99%] group-active:scale-y-[99.5%]  group-active:block group-active:mt-[1px]">
                          {t[item.type as BaseNodeTypes]._model.verboseName()}
                        </span>
                      </div>
                      <div class="w-full truncate line-clamp-1 text-ellipsis pl-6 pr-6 p-2  text-left text-sm  bg-neutral-300 flex items-center text-pretty font-normal text-neutral-950 rounded-r-xs group-hover:bg-neutral-400 group-focus:bg-zinc-400 group-active:bg-zinc-200 group-active:text-zinc-600">
                        <span class="group-hover:text-black group-active:scale-x-[99.5%] group-active:scale-y-[99.5%] group-active:text-black/80 group-active:block group-active:mt-[1px]">
                          <Show
                            when={typeof modelDefinition.meta.labelField}
                            fallback={item.label}
                          >
                            <div
                              innerHTML={
                                item[
                                  modelDefinition.meta
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
                  <div class="flex justify-center mt-12 mb-6">
                    <button
                      onMouseLeave={(e) => e.currentTarget.blur()}
                      onClick={getNextPage}
                      class="inline w-fit px-6 py-4 text-md uppercase font-semibold text-white bg-green-700 rounded-xs hover:bg-green-800 active:bg-green-600 cursor-pointer transition-all hover:shadow-2xl hover:shadow-green-900/50 outline-none focus:shadow-green-900/50"
                    >
                      {"t(interface.getMoreResults)"}
                    </button>
                  </div>
                </Show>
              </>
            )}
          </Show>
          <Show when={!user.isLoggedIn && user.accessingAuthorisedRoute}>
            <LoginOverlay onLoginCallback={doRefetch} />
          </Show>
        </Suspense>
      </section>
    </>
  );
}
