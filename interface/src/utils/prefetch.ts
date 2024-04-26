import { getRequest } from "~/apiClient";

declare module "solid-js" {
    namespace JSX {
      interface Directives {
        prefetch: boolean; // Corresponds to `use:prefetch`
      }
    }
  }

export class PrefetchCache {
    private cache = new Map();
    public static instance: PrefetchCache = new this();

    public get(key: URL): any {
        //console.log("Getting from cache", key.href)
        return this.cache.get(key.href)
    };
    public has(key: URL): any {
        //console.log("Checking cache has", key.href)
        return this.cache.has(key.href)
    };
    public set(key: URL, value: any): void {
        //console.log("Adding to cache", key.href);
        this.cache.set(key.href, value);
        setTimeout(() => {
        //console.log("Deleting from cache", key.href);
        this.cache.delete(key.href);
        }, 15000);
    };
}

export const prefetch = (
    element: HTMLAnchorElement,
    accessor: () => any
  ): void => {
    let timeout!: ReturnType<typeof setTimeout>;
    element.addEventListener("mouseenter", (e) => {
        timeout = setTimeout(async () => {
            const url: URL = new URL(
                element.href.replace(
                    "http://localhost:3000/objects",
                    "http://localhost:8000/api"
                )
            );
                await getRequest(url, true);
            }, 300);
        });
        element.addEventListener("mouseleave", (e) => {
            clearTimeout(timeout);
        });
    };