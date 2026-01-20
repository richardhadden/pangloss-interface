import { A } from "@solidjs/router";
import Counter from "~/components/Counter";

import TestThing from "@core/TestThing";

import Stuff from "../../../../../../pangloss_demo_app_two/demo_app/interface/components/Stuff";

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <TestThing />
      <h1 class="max-6-xs text-6xl bg-amber-800 text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>
      <Stuff />
    </main>
  );
}
