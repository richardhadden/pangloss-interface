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
      <TranslationProvider>
        <UserProvider isLoggedIn={false}>
          <Router
            root={(props) => (
              <>
                <div class="fixed top-0 w-full flex justify-center">
                  <div
                    id="controlBar"
                    class="max-w-5/6 min-w-5/6 h-16 bg-slate-400/50 backdrop-blur-2xl rounded-b-sm relative left-6 shadow-md hover:shadow-xl transition-shadow"
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
        </UserProvider>
      </TranslationProvider>
    </MetaProvider>
  );
}
