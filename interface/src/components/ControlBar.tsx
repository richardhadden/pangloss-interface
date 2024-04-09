import { Show, JSXElement, type Component } from "solid-js";
import { Portal } from "solid-js/web";
import { EntityTypes } from "~/testTypes";

export type ControlBarProps = {
  entityType?: string;
  controlBarCentre?: JSXElement | HTMLElement;
};
export function ControlBar<Component>(props: ControlBarProps) {
  return (
    <Portal mount={document.getElementById("controlBar") as HTMLDivElement}>
      <div class="h-full w-full flex">
        <Show when={props.entityType}>
          <div class="h-14 uppercase font-semibold py-1 px-6 bg-slate-700 text-emerald-50 rounded-bl-sm flex flex-col justify-center  border-r-[0.5px] border-r-white">
            {props.entityType}
          </div>
        </Show>
        <Show
          when={props.controlBarCentre}
          fallback={<div class="flex-grow"></div>}
        >
          <div class="flex-grow flex items-center justify-center">
            {props.controlBarCentre}
          </div>
        </Show>

        <button class="aspect-square bg-green-600 text-orange-50 w-14 last-of-type:rounded-br-sm hover:bg-orange-800 active:bg-orange-700 hover:scale-105 hover:shadow-2xl active:scale-95">
          X
        </button>
      </div>
    </Portal>
  );
}
