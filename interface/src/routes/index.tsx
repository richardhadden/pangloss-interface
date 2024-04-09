import { A } from "@solidjs/router";
import Counter from "~/components/Counter";
import { apiClient } from "~/apiClient";
import { useUserLogin } from "~/contexts/users";
import { Show, onMount } from "solid-js";

export default function Home() {
  const [user, { setAccessingAuthorisedRoute }] = useUserLogin();
  onMount(() => setAccessingAuthorisedRoute(false));

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-semibold uppercase my-16">
        Pangloss <br /> the totally unfinished framework for building
        prosopographcial networks
      </h1>
      <span>Hi!</span>
    </main>
  );
}
