import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { JSXElement, Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import { UserProvider } from "./contexts/users";
import { MetaProvider } from "@solidjs/meta";

export default function App() {
  return (
    <MetaProvider>
      <UserProvider isLoggedIn={false}>
        <Router
          root={(props) => (
            <>
              <Nav />
              <div class="w-screen flex justify-center h-24">
                <div
                  id="controlBar"
                  class="fixed border-white/40 border-b-[px] border-x-[0.5px] w-9/12 shadow-2xl  bg-slate-300 shadow-slate-500  rounded-b-sm  select-none  duration-500 animate-fade "
                />
              </div>
              <div class="ml-16 p-8">
                <Suspense>{props.children}</Suspense>
              </div>
            </>
          )}
        >
          <FileRoutes />
        </Router>
      </UserProvider>
    </MetaProvider>
  );
}
