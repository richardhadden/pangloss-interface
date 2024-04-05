import { createResource, sharedConfig, untrack, type Accessor } from "solid-js";
import { isServer } from "solid-js/web";

export function createAsync<T>(
  fn: (prev: T) => Promise<T>,
  options: {
    name?: string;
    initialValue: T;
    deferStream?: boolean;
  }
): Accessor<T>;
export function createAsync<T>(
  fn: (prev: T | undefined) => Promise<T>,
  options?: {
    name?: string;
    initialValue?: T;
    deferStream?: boolean;
  }
): Accessor<T | undefined>;
export function createAsync<T>(
  fn: (prev: T | undefined) => Promise<T>,
  options?: {
    name?: string;
    initialValue?: T;
    deferStream?: boolean;
  }
): Accessor<T | undefined> {
  let resource: () => T;
  let mutate;
  let refetch;
  let prev = () =>
    !resource || (resource as any).state === "unresolved"
      ? undefined
      : (resource as any).latest;
  [resource, { mutate, refetch }] = createResource(
    () => subFetch(fn, untrack(prev)),
    (v) => v,
    options as any
  );
  return [() => resource(), refetch];
}

class MockPromise {
  static all() {
    return new MockPromise();
  }
  static allSettled() {
    return new MockPromise();
  }
  static any() {
    return new MockPromise();
  }
  static race() {
    return new MockPromise();
  }
  static reject() {
    return new MockPromise();
  }
  static resolve() {
    return new MockPromise();
  }
  catch() {
    return new MockPromise();
  }
  then() {
    return new MockPromise();
  }
  finally() {
    return new MockPromise();
  }
}

function subFetch<T>(
  fn: (prev: T | undefined) => Promise<T>,
  prev: T | undefined
) {
  if (isServer || !sharedConfig.context) return fn(prev);
  const ogFetch = fetch;
  const ogPromise = Promise;
  try {
    window.fetch = () => new MockPromise() as any;
    Promise = MockPromise as any;
    return fn(prev);
  } finally {
    window.fetch = ogFetch;
    Promise = ogPromise;
  }
}
