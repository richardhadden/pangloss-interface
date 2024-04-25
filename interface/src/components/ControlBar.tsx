import { IoCreateSharp, IoPencilSharp, IoSaveSharp } from "solid-icons/io";
import { RiDeviceSave3Fill } from "solid-icons/ri";
import { AiOutlineSave } from "solid-icons/ai";
import { Show, JSXElement, type Component } from "solid-js";
import { Portal } from "solid-js/web";
import NewEntity from "~/routes/objects/[EntityType]/new";

export type ControlBarProps = {
  entityType?: string;
  pageType?: "new" | "edit";
  controlBarCentre?: JSXElement | HTMLElement;
  newEntityUrl?: string;
  editUrl?: string;
  centralSectionPosition?: "left" | "center" | "right";
};
export function ControlBar<Component>(props: ControlBarProps) {
  return (
    <Portal mount={document.getElementById("controlBar") as HTMLDivElement}>
      <div class="h-full w-full flex max-h-14 ">
        <Show when={props.pageType === "new"}>
          <div class="aspect-square flex items-center justify-center bg-slate-500 text-orange-50 w-14 min-w-14 first-of-type:rounded-bl-sm  shadow-2xl  shadow-slate-500/90">
            <IoCreateSharp size={22} class="relative -top-[1px] -right-[2px]" />
          </div>
        </Show>
        <Show when={props.entityType}>
          <div
            classList={{
              "border-r-[0.5px] border-r-white": !(props.pageType === "new"),
              "text-nowrap pr-6":
                props.entityType !== undefined && props.entityType.length <= 20,
              "text-pretty bg-red-500 pr-6":
                props.entityType !== undefined && props.entityType.length > 20,
            }}
            class="h-14 shrink text-wrap text-sm uppercase font-semibold py-1 pl-6 shadow-2xl shadow-slate-700/90 bg-slate-700 text-emerald-50 first-of-type:rounded-bl-sm flex flex-col justify-center items-center "
          >
            {props.entityType}
          </div>
        </Show>
        <Show
          when={props.controlBarCentre}
          fallback={<div class="flex-grow"></div>}
        >
          <div
            classList={{
              "justify-start": props.centralSectionPosition === "left",
              "justify-end": props.centralSectionPosition === "right",
              "justify-center":
                props.centralSectionPosition === "center" ||
                props.centralSectionPosition === undefined,
            }}
            class="flex-grow flex items-center min-w-0 flex-nowrap"
          >
            {props.controlBarCentre}
          </div>
        </Show>
        <Show when={props.newEntityUrl}>
          <a
            href={props.newEntityUrl}
            class="aspect-square flex items-center justify-center bg-green-600 text-green-50 w-14 last-of-type:rounded-br-sm hover:bg-green-800 active:bg-green-700 hover:shadow-green-600/90 shadow-2xl active:shadow-green-300/90 shadow-green-600/90 hover:shadow-2xl active:scale-95 active:rounded-sm active:last-of-type:rounded-sm"
          >
            <IoCreateSharp size={22} class="relative -top-[1px] -right-[2px]" />
          </a>
        </Show>
        <Show when={props.editUrl}>
          <a
            href={props.editUrl}
            class="aspect-square  h-14 flex items-center justify-center bg-green-600 text-green-50 last-of-type:rounded-br-sm hover:bg-green-800 active:bg-green-700 hover:shadow-green-600/90 shadow-2xl active:shadow-green-300/90 shadow-green-600/90 hover:shadow-2xl active:scale-95 active:rounded-sm active:last-of-type:rounded-sm"
          >
            <IoPencilSharp size={22} class="relative -top-[1px] -right-[2px]" />
          </a>
        </Show>
        <Show when={props.pageType === "new"}>
          <button class="aspect-square  h-14 flex items-center justify-center bg-amber-600 text-amber-50  last-of-type:rounded-br-sm hover:bg-amber-700 active:bg-amber-500 hover:shadow-amber-600/90 shadow-2xl active:shadow-amber-300/90 shadow-amber-600/90 hover:shadow-2xl active:scale-95 active:rounded-sm active:last-of-type:rounded-sm">
            <RiDeviceSave3Fill size={23} class="relative " />
          </button>
        </Show>
      </div>
    </Portal>
  );
}
