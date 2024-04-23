import { IoCreateSharp, IoPencilSharp, IoPersonSharp } from "solid-icons/io";
import { EntityViewTypes } from "../../ProjectConfig";
import { AiOutlineClockCircle } from "solid-icons/ai";
import { relativeDate } from "~/contexts/translation";
import { Show } from "solid-js";

type ViewModifiedDetailsProps<K extends keyof EntityViewTypes> = {
  data: EntityViewTypes[K];
};

export function ViewModifiedDetails<K extends keyof EntityViewTypes>(
  props: ViewModifiedDetailsProps<K>
) {
  return (
    <div class=" mr-8 text-xs text-slate-500 gap-y-1 gap-x-3 grid grid-cols-[auto_auto_auto] -mt-[1.75px] min-w-fit ml-4">
      <div>
        <IoCreateSharp class="inline relative -top-[1px] mr-3" />
      </div>
      <div class="col-span-1">
        <IoPersonSharp class="inline mr-2 relative -top-[1px] text-slate-400" />
        <span class="hover:text-slate-800 cursor-pointer text-slate-500">
          {props.data.createdBy}
        </span>
      </div>
      <div class=" col-span-1 ">
        <AiOutlineClockCircle class="inline relative -top-[1px] mr-1 text-slate-400" />
        <span class="text-slate-500">
          {relativeDate(props.data.createdWhen)}
        </span>
      </div>
      <Show when={props.data.modifiedBy}>
        <div class="col-span-3 border-t-slate-400 border-t-[0.25px] h-0" />
        <div>
          <IoPencilSharp class="inline relative -top-[1px]" />
        </div>
        <div class="col-span-1">
          <IoPersonSharp class="inline mr-2 relative -top-[1px] text-slate-400" />
          <span class="hover:text-slate-800 cursor-pointer text-slate-500">
            {props.data.modifiedBy}
          </span>
        </div>
        <div class="col-span-1">
          <AiOutlineClockCircle class="inline relative -top-[1px] mr-1 text-slate-400" />
          <span class="text-slate-500">
            {relativeDate(props.data.createdWhen)}
          </span>
        </div>
      </Show>
    </div>
  );
}
