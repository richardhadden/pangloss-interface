import { A } from "@solidjs/router";
import ControlBar from "~/components/ControlBar";

export default function Home() {
  return (
    <>
      <ControlBar
        centreContent={
          <div class="flex items-center h-full">
            <span class="text-sm uppercase font-semibold bg-slate-800 text-slate-200 px-4 rounded-bl-xs h-full flex items-center">
              Pangloss ☀️
            </span>
            <span class="px-10 font-light  text-xl text-slate-800">
              Managing Maximilian
            </span>
          </div>
        }
      ></ControlBar>
      <main class="pt-30 pl-20 flex justify-center items-center">
        <div class="prose lg:prose-xl prose-slate">
          <h2 class="font-light">
            Welcome to Managing Maximilian, an enormous project that has really
            put us through the wringer
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            commodi nihil facilis, vel officiis sed suscipit. Perferendis facere
            commodi pariatur fugit consequuntur sequi molestiae quibusdam, quia
            quas recusandae ea dolore.
          </p>
        </div>
      </main>
    </>
  );
}
