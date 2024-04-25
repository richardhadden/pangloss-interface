import {
  RouteDefinition,
  cache,
  useParams,
  useLocation,
  useSearchParams,
  type Location,
  useIsRouting,
} from "@solidjs/router";
import {
  createRefetchableAsync,
  fetchDataCache,
} from "../../../utils/createRefetchableAsync";
import { Suspense, For, onMount, Show } from "solid-js";
import { Title } from "@solidjs/meta";

import { apiClient, type APIError } from "~/apiClient";
import type { ListReturnTypes, EntityTypes } from "../../../../ProjectConfig";
import { useUserLogin } from "~/contexts/users";
import { LoginOverlay } from "~/components/LoginForm";
import { ControlBar } from "~/components/ControlBar";
import { t } from "~/contexts/translation";

const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};

const BASE_URL = "http://localhost:8000";

async function fetchData<K extends keyof ListReturnTypes>(
  entityType: K,
  location: Location
): Promise<ListReturnTypes[K] | undefined> {
  const data = await apiClient.list(entityType, location.search);
  return data;
}

export const route = {
  load: ({ params, location }) =>
    fetchDataCache(
      fetchData,
      params.EntityType as EntityTypes,
      location as Location
    ),
} satisfies RouteDefinition;

export default function EntityList() {
  const [user, { setAccessingAuthorisedRoute, logOut }] = useUserLogin();
  const params: { EntityType: EntityTypes } = useParams();
  const location = useLocation();
  const isRouting = useIsRouting();

  const [data, { refetch, mutate }] = createRefetchableAsync(() =>
    fetchData(params.EntityType as EntityTypes, location)
  );

  async function doRefetch() {
    await refetch();
  }

  onMount(() => {
    setAccessingAuthorisedRoute(false);
    if ((data() as APIError)?.statusCode === 401) {
      logOut();
      setAccessingAuthorisedRoute(true);
    }
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (value: string) => {
    setSearchParams({ q: value });
  };

  const getNextPage = async () => {
    if (data() !== undefined) {
      const next = (data() as ListReturnTypes[EntityTypes])?.nextUrl;

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
          ...(data() as ListReturnTypes[EntityTypes]).results,
          ...newData.results,
        ],
      });
    }
  };

  return (
    <>
      <Title>
        {t(`${params.EntityType}.__model.verbose_name_plural`)} | Pangloss
      </Title>
      <ControlBar
        entityType={t(`${params.EntityType}.__model.verbose_name_plural`)}
        newEntityUrl={`/objects/${params.EntityType}/new`}
        controlBarCentre={
          <Suspense>
            <Show when={data()}>
              {(data) => (
                <>
                  <input
                    type="text"
                    oninput={(e) => updateSearchParams(e.currentTarget.value)}
                    value={searchParams.q || ""}
                    placeholder={`${t("interface.search")}...`}
                    class="min-w-96 outline-none p-3 h-14 bg-slate-200 border-x-[0.5px] border-x-white focus:bg-slate-100 focus:shadow-2xl shadow-2xl shadow-slate-200/90 focus:shadow-slate-400/90"
                  />
                  <Show
                    when={data() && data().count && data().count > 0}
                    fallback={
                      <div class="text-red-800/90 text-sm uppercase font-semibold select-none ml-4 min-w-20">
                        0
                      </div>
                    }
                  >
                    <div class="text-slate-600 text-sm uppercase font-semibold select-none ml-4 min-w-20">
                      {data().count}
                    </div>
                  </Show>
                </>
              )}
            </Show>
          </Suspense>
        }
      />
      <section class="pl-16 pr-32 mt-10">
        <Suspense fallback={<h1>Loading!</h1>}>
          <Show when={data()}>
            {(data) => (
              <>
                <For each={data().results}>
                  {(item) => (
                    <a
                      href={`/objects/${item.realType}/${item.uid}`}
                      onMouseLeave={(e) => e.currentTarget.blur()}
                      class="truncate line-clamp-1 text-ellipsis w-full m-2 mb-4 h-10 flex rounded-sm group cursor-pointer  outline-non transition-none duration-75 active:scale-y-[99.5%] active:scale-x-[99.5%] hover:shadow-md active:shadow-inner hover:shadow-neutral-300"
                    >
                      <div class="bg-slate-600 rounded-l-sm border-r-white border-r-[0.5px] uppercase font-semibold text-slate-50 text-xs flex flex-col justify-center items-start p-3 group-hover:bg-slate-700 group-focus:bg-slate-700 group-active:bg-slate-500">
                        {t(`${item.realType}.__model.verbose_name`)}
                      </div>
                      <div class="w-full truncate line-clamp-1 text-ellipsis pl-6 pr-6 p-2 block text-left text-base bg-neutral-300 text-pretty font-normal text-neutral-950 rounded-r-sm group-hover:bg-neutral-400 transition-all duration-75 group-focus:bg-neutral-400 group-active:bg-neutral-200 group-active:text-neutral-600">
                        {item.label}
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
                      class="inline w-fit px-6 py-4 text-md uppercase font-semibold text-white bg-green-700 rounded-sm hover:bg-green-800 active:bg-green-600 cursor-pointer transition-all hover:shadow-2xl hover:shadow-green-900/50 hover:scale-105 duration-75 active:scale-95 outline-none focus:scale-105 focus:shadow-2xl focus:shadow-green-900/50"
                    >
                      {t("interface.getMoreResults")}
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
