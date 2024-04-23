import { A } from "@solidjs/router";
import { onMount } from "solid-js";
import Counter from "~/components/Counter";
import { useUserLogin } from "~/contexts/users";

export default function About() {
  const [user, { setAccessingAuthorisedRoute }] = useUserLogin();
  onMount(() => setAccessingAuthorisedRoute(false));
  return (
    <main class="text-center mx-auto text-gray-700 p-4 font-thin text-xl space-y-5">
      <h1 class="max-6-xs text-5xl text-slate-950 font-semibold uppercase my-16">
        About
      </h1>
      <p>
        <span class="uppercase font-semibold text-slate-950 text-lg">
          Pangloss
        </span>{" "}
        is a Neo4J graph-based framework for building prosopographical
        databases.
      </p>
      <p>
        Here, it is being tested with for basic functionality using the Managing
        Maximilian project's requirements.
      </p>
    </main>
  );
}
