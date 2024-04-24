import { A } from "@solidjs/router";
import Counter from "~/components/Counter";
import { apiClient } from "~/apiClient";
import { useUserLogin } from "~/contexts/users";
import { Show, onMount } from "solid-js";
import { Title } from "@solidjs/meta";

export default function Home() {
  const [user, { setAccessingAuthorisedRoute }] = useUserLogin();
  onMount(() => setAccessingAuthorisedRoute(false));

  return (
    <>
      <Title>ManMax | Pangloss</Title>
      <main class="text-center mx-auto text-gray-700 p-4">
        <h1 class="text-6xl text-slate-950 font-semibold uppercase mt-16 mb-4 tracking-widest">
          Pangloss
        </h1>
        <h3>
          Prosopography And Networks Graph-Labyrinth Orientation-System 🔆
        </h3>
        <h2 class="text-4xl text-slate-900 font-thin mt-16">
          Managing Maximilian
        </h2>
      </main>
    </>
  );
}
