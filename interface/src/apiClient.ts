import { getRequestEvent, isServer } from "solid-js/web";
import { useUserLogin } from "./contexts/users";

import { EntityViewTypes, ListReturnTypes } from "../ProjectConfig";

import { PrefetchCache } from "./utils/prefetch";


const getCookieValue = (
  cookieString: string | undefined | null,
  name: string
): string | undefined => {
  if (cookieString) {
    return (
      cookieString.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""
    );
  }
};




export async function getRequest(url: URL, withPrefetchCache?: boolean): Promise<object | undefined> {
  
  const [users, { setAccessingAuthorisedRoute, logOut }] = useUserLogin();


  if (isServer) {
    const requestEvent = getRequestEvent();
    const access_token = getCookieValue(
      requestEvent?.request.headers.get("cookie"),
      "access_token"
    );
    let headers = {};
    if (access_token) {
      headers = {
        Cookie: `access_token=${access_token}`,
      };
    }
    const response = await fetch(url, {
      method: "get",
      headers: headers,
    });

    if (response.status === 401) {
      setAccessingAuthorisedRoute(true);
      logOut();
    }

    const data = await response.json();
    return data;

  } else {

    if (PrefetchCache.instance.has(url)) {
      //console.log("Request already started on", url)
      const cached = PrefetchCache.instance.get(url);
      const data = await cached;
      //console.log("Finished request on", url)
      PrefetchCache.instance.delete(url);
      return data;
    }

    async function getData() {
      //console.log("Getting", url)
      const response = await fetch(url, {
        method: "get",
        credentials: "include",
      });
      
      if (response.status === 401) {
        console.log("Not Authorized");
        setAccessingAuthorisedRoute(true);
        logOut();
        return undefined;
      }
  
      const data = await response.json();
      return data;
    }

    if (withPrefetchCache) {
      const fetcher = getData();
      PrefetchCache.instance.set(url, fetcher);
    }
    else {
      const data = await getData();
      return data;
    }
  }
}

export type APIError = {
  error: true,
  message: string,
  statusCode: 400 | 401 | 404
}



function createApiClient(BASE_URL: string) {
  async function list<K extends keyof ListReturnTypes>(
    entityType: K,
    searchParamsString: string
  ): Promise<ListReturnTypes[K] | undefined> {
    const url = new URL(`${BASE_URL}/${entityType}`);
    url.search = new URLSearchParams(searchParamsString).toString();
    const data = await getRequest(url);
    
    return data as ListReturnTypes[K] | undefined;
  }

  async function view<K extends keyof EntityViewTypes>(
    entityType: K,
    uid: string
  ): Promise<EntityViewTypes[K] | undefined> {
    //console.log(v.string([v.uuid()])._parse(uid))
    const url = new URL(`${BASE_URL}/${entityType}/${uid}`)
    const data = await getRequest(url);
    console.log(data);
    return data as EntityViewTypes[K] | undefined;

  }

  return {
    list, view
  };
}

export const apiClient = createApiClient("http://localhost:8000/api");
