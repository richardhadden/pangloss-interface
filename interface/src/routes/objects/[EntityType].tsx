import {
  RouteDefinition,
  cache,
  useParams,
  useLocation,
  useSearchParams,
  type Location,
  type CachedFunction,
  createAsync,
  redirect,
  useBeforeLeave,
} from "@solidjs/router";

import { Portal } from "solid-js/web";
import { getRequestEvent } from "solid-js/web";
import {
  Suspense,
  For,
  createSignal,
  createResource,
  onMount,
  Show,
  createEffect,
} from "solid-js";

import { apiClient, type EntityTypes, type ListReturnTypes } from "~/testTypes";
import { useUserLogin } from "~/contexts/users";
import LoginForm from "~/components/LoginForm";
import { ControlBar } from "~/components/ControlBar";
import { useWindowScrollPosition } from "@solid-primitives/scroll";

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

const throttle = <R, A extends any[]>(
  fn: (...args: A) => R,
  delay: number
): [(...args: A) => R | undefined, () => void] => {
  let wait = false;
  let timeout: undefined | number;
  let cancelled = false;

  return [
    (...args: A) => {
      if (cancelled) return undefined;
      if (wait) return undefined;

      const val = fn(...args);

      wait = true;

      timeout = window.setTimeout(() => {
        wait = false;
      }, delay);

      return val;
    },
    () => {
      cancelled = true;
      clearTimeout(timeout);
    },
  ];
};

/* function fetchDataCache(entityType: EntityTypes, location: Location) {
  return cache(async () => {
    fetchData(entityType, location);
  }, entityType + location.search)();
} */

const fetchDataCache = <A extends any[], R>(
  f: (...args: A) => R,
  ...args: A
): ((...args: never[]) => Promise<void>) & {
  keyFor: () => string;
  key: string;
} => {
  return cache(async () => {
    f(...args);
  }, args.map((arg) => JSON.stringify(arg)).join(""));
};

function refetchableData<A extends any[], R>(
  func: () => Promise<R>
): [() => Awaited<R>, () => void, () => void, () => void, (val: any) => void] {
  const [refetched, setRefetched] = createSignal(false);
  const [refetchedData, setRefetchedData] = createSignal();
  const asyncData = createAsync(func);
  const refetch = async () => {
    const data = (await func()) as Awaited<typeof func>;
    if (data) {
      setRefetchedData(data);
      setRefetched(true);
    }
  };
  return [
    () => (refetched() ? refetchedData() : asyncData()) as Awaited<R>,
    refetch,
    () => setRefetched(false),
    () => setRefetched(true),
    (val: any) => setRefetchedData(val),
  ];
}

async function fetchData<K extends keyof ListReturnTypes>(
  entityType: K,
  location: Location
): Promise<ListReturnTypes[K]> {
  //"use server";
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

  const [data, refetch, revert, useRefetch, update] = refetchableData(() =>
    fetchData(params.EntityType as EntityTypes, location)
  );
  const scroll = useWindowScrollPosition();
  onMount(() => {
    console.log(data());
    if (data()?.detail === "Not authenticated") {
      logOut();
      setAccessingAuthorisedRoute(true);
    }
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentSearchParams, setCurrentSearchParams] = createSignal(
    searchParams?.q || "arse"
  );

  const [throttledSetSearchParams] = throttle((value) => {
    setSearchParams({ q: value });
    revert();
  }, 0);

  const updateSearchParams = (value: string) => {
    setCurrentSearchParams(value);
    throttledSetSearchParams(value);
    setGotPages([]);
  };

  createEffect(() => {
    const eol = document.getElementById("endOfList");
    if (eol) {
      //
      //console.log(scroll.y, eol.offsetTop);
      if (scroll.y + 1200 > eol.offsetTop) {
        //const [t] = throttle(getNextPage, 3000);
        //t();
      }
    }
  });

  //createEffect(() => console.log("data", data()));

  const [nextUrl, setNextUrl] = createSignal();
  const [gotPages, setGotPages] = createSignal([]);

  const extraItemsArrayLength = () => {
    const l = data()?.count - data()?.results.length;
    if (l <= 0) {
      return 0;
    }
    return l;
  };

  useBeforeLeave((e) => revert());

  const getNextPage = async () => {
    if (data()) {
      const searchParams = new URLSearchParams(location.search);
      const Q = searchParams.get("q") || "";

      const next = nextUrl() || data().nextUrl;
      //console.log(next, gotPages());
      if (!gotPages().includes(next)) {
        console.log(next);
        setGotPages([...gotPages(), next]);
        //console.log("getting", next);
        const response = await fetch(next, {
          method: "get",
          credentials: "include",
        });
        const newData = await response.json();

        update({ ...data(), results: [...data().results, ...newData.results] });
        useRefetch();
        setNextUrl(newData.nextUrl);
      }
    }
  };
  return (
    <>
      <ControlBar
        entityType={params.EntityType}
        controlBarCentre={
          <>
            <input
              type="text"
              oninput={(e) => updateSearchParams(e.currentTarget.value)}
              value={searchParams.q || ""}
              placeholder="Search..."
              class="min-w-96 outline-none p-3 h-14 bg-slate-200 border-x-[0.5px] border-x-white"
            ></input>
            <Show
              when={data() && data().count && data().count > 0}
              fallback={
                <div class="text-red-800/90 text-sm uppercase font-semibold select-none ml-4 min-w-20">
                  0
                </div>
              }
            >
              <div class="text-slate-600 text-sm uppercase font-semibold select-none ml-4 min-w-20">
                {data()?.count}
              </div>
            </Show>
          </>
        }
      />
      <section>
        <Suspense fallback={<h1>Loading!</h1>}>
          <Show when={data()?.results}>
            <For each={data()?.results}>
              {(item) => (
                <button class="w-full m-2 mb-4 bg-slate-300  flex rounded-sm group hover:scale-y-105 cursor-pointer focus:scale-y-105 outline-none">
                  <div class="bg-blue-700/20 uppercase font-semibold text-slate-50 text-xs flex flex-col justify-center items-start p-3 rounded-l-sm group-hover:bg-slate-800 group-focus:bg-slate-800">
                    {item.realType}
                  </div>
                  <div class="w-full truncate pl-6 pr-6 p-2 flex flex-col justify-center items-start bg-blue-500 text-white rounded-r-sm group-hover:bg-indigo-800 transition-all duration-75 group-focus:bg-indigo-600">
                    {item.label} {item.uid}
                  </div>
                </button>
              )}
            </For>
            <div id="endOfList" />
            <Show when={data()?.nextUrl}>
              <div class="flex justify-center mt-12 mb-6">
                <button
                  onClick={getNextPage}
                  class="inline w-fit px-6 py-4 text-md uppercase font-semibold text-white bg-green-700 rounded-sm hover:bg-green-800 active:bg-green-600 cursor-pointer transition-all hover:shadow-2xl hover:shadow-green-900/50 hover:scale-105 duration-75 active:scale-95 outline-none focus:scale-105 focus:shadow-2xl focus:shadow-green-900/50"
                >
                  Get more results
                </button>
              </div>
            </Show>
          </Show>
          <Show when={!user.isLoggedIn && user.accessingAuthorisedRoute}>
            <div class="absolute w-screen h-screen bg-slate-400/50 top-0 left-0 z-10 flex justify-center items-center backdrop-blur-sm">
              <div class="bg-slate-200 rounded-sm shadow-2xl w-4/12">
                <LoginForm onLoginCallback={refetch} />
              </div>
            </div>
          </Show>
        </Suspense>
      </section>
    </>
  );
}
