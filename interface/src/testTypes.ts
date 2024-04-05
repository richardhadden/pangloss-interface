import { getRequestEvent, isServer } from "solid-js/web";
import { useUserLogin } from "./contexts/users";

type GenericListReturnType<T> = {
  results: T[];
  count: number;
  page: number;
  totalPages: number;
  nextPage: number;
  previousPage: number;
  nextUrl: string;
  previousUrl: string;
};

type BaseReference = {
  uid: string;
  label: string;
};
type BaseReturnType = GenericListReturnType<BaseReference>;

type ZoteroEntryReference = BaseReference & {
  citation: string;
  realType: "ZoteroEntry";
};
type ZoteroEntryListReturnType = GenericListReturnType<ZoteroEntryReference>;

type PersonReference = BaseReference & {
  realType: "Person";
};
type PersonListReturnType = GenericListReturnType<PersonReference>;

export type EntityTypes = string & ("ZoteroEntry" | "Person");

export type ListReturnTypes = {
  Person: PersonListReturnType;
  ZoteroEntry: ZoteroEntryListReturnType;
};

/* method: "post" | "get" | "patch" | "delete",
    entityType: SchemaTypeStrings,
    queryParams:
      | string
      | URLSearchParams
      | Record<string, string>
      | string[][]
      | undefined
  ): Promise<GenericListItem> {
    const url = new URL(`${BASE_URL}/api/${entityType}`);
    url.search = new URLSearchParams(queryParams).toString();
  
    if (isServer) {
      const requestEvent = getRequestEvent();
      const access_token = getCookieValue(
        requestEvent?.request.headers.get("cookie"),
        "access_token"
      );
  
      const response = await fetch(url, {
        method: method,
        headers: {
          Cookie: `access_token=${access_token}`,
        },
      });
      const data = await response.json();
      return data;
    } else {
      const response = await fetch(url, {
        method: method,
        credentials: "include",
      });
      const data = await response.json();
      return data;
    } */

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

async function getRequest(url: URL) {
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
      setAccessingAuthorisedRoute(true);
      logOut();

      return "failed";
    }

    const data = await response.json();
    return data;
  }
}

function createApiClient(BASE_URL: string) {
  async function list<K extends keyof ListReturnTypes>(
    entityType: K,
    searchParamsString: string
  ): Promise<ListReturnTypes[K]> {
    const url = new URL(`${BASE_URL}/${entityType}`);
    url.search = new URLSearchParams(searchParamsString).toString();
    const data = await getRequest(url);
    return data as ListReturnTypes[K];
  }

  return {
    list,
  };
}

export const apiClient = createApiClient("http://localhost:8000/api");
