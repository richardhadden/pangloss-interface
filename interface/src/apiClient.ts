import { getRequestEvent, isServer } from "solid-js/web";
import { useUserLogin } from "./contexts/users";

import { EntityViewTypes, ListReturnTypes } from "../ProjectConfig";



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

async function getRequest(url: URL): Promise<object | undefined> {
  console.log("Data fetch...")
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
    const response = await fetch(url, {
      method: "get",
      credentials: "include",
    });
    if (response.status === 401) {
      console.log("not authed")
      setAccessingAuthorisedRoute(true);
      logOut();

      return undefined; //{error: true, message: "Not Authorised", statusCode: 401}
    }

    const data = await response.json();
    return data;
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
    return data as EntityViewTypes[K] | undefined;

  }

  return {
    list, view
  };
}

export const apiClient = createApiClient("http://localhost:8000/api");
