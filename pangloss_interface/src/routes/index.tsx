import ControlBar from "~/components/ControlBar";

export default function Home() {
  return (
    <>
      <ControlBar
        centreContent={
          <div class="flex h-full items-center">
            <span class="flex h-full items-center rounded-bl-xs bg-slate-800 px-4 text-sm font-semibold text-slate-200 uppercase">
              Pangloss
            </span>
            <span class="px-10 text-xl font-light text-slate-800">
              Managing Maximilian
            </span>
          </div>
        }
      ></ControlBar>

      <main class="flex items-center justify-center pt-30 pl-20">
        <div class="prose prose-slate lg:prose-xl">
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
