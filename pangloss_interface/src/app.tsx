import "./app.css";
import { TranslationProvider } from "./contexts/translation";
import { UserProvider } from "./contexts/users";
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";

export default function App() {
  return (
    <MetaProvider>
      <UserProvider>
        <TranslationProvider>
          <Router
            root={(props) => (
              <>
                <div class="fixed top-0 flex w-full justify-center pl-12">
                  <div
                    id="controlBar"
                    class="left-6 h-16 max-w-5/6 min-w-5/6 rounded-b-sm bg-slate-400/50 shadow-md backdrop-blur-2xl duration-500 empty:-top-16 hover:shadow-xl"
                  ></div>
                </div>
                <Nav />
                <div>
                  <Suspense>{props.children}</Suspense>
                </div>
              </>
            )}
          >
            <FileRoutes />
          </Router>
        </TranslationProvider>
      </UserProvider>
    </MetaProvider>
  );
}
