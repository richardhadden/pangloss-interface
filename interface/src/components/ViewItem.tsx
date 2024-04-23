import { For, Show } from "solid-js";
import { type EntityViewTypes, type EntityTypes } from "../../ProjectConfig";

import { t } from "~/contexts/translation";

type ViewItemProps = { item: EntityViewTypes[EntityTypes] };

export function ViewItem(props: ViewItemProps) {
  return (
    <div class="grid grid-cols-12 gap-x-2">
      <div class="col-span-2 font-semibold uppercase text-sm h-full flex items-center">
        Label
      </div>
      <div class="col-span-6 h-full flex items-center">{props.item.label}</div>
      <div class="col-span-4"></div>
      <For each={Object.entries(props.item)}>
        {([fieldName, field]) => (
          <Show when={field?.[0]?.label}>
            <div class="col-span-2 font-semibold uppercase text-sm h-full flex items-center mt-4">
              {fieldName}
            </div>
            <div class="col-span-6 h-full flex items-center mt-4">
              <a
                href={`/objects/${field?.[0]?.realType}/${field?.[0]?.uid}`}
                class="flex rounded-sm group cursor-pointer  outline-non transition-none duration-75 active:scale-y-[99.5%] active:scale-x-[99.5%] hover:shadow-md active:shadow-inner hover:shadow-neutral-300"
              >
                <span class="bg-slate-600 rounded-l-sm border-r-white border-r-[0.5px] uppercase font-semibold text-slate-50 text-xs flex flex-col justify-center items-start p-3 group-hover:bg-slate-700 group-focus:bg-slate-700 group-active:bg-slate-500">
                  {t(
                    `${field?.[0]?.realType as EntityTypes}.__model.verbose_name`
                  )}
                </span>
                <span class="w-full truncate line-clamp-1 text-ellipsis pl-6 pr-6 p-2 block text-left text-base bg-neutral-300 text-pretty font-normal text-neutral-950 rounded-r-sm group-hover:bg-neutral-400 transition-all duration-75 group-focus:bg-neutral-400 group-active:bg-neutral-200 group-active:text-neutral-600">
                  {field?.[0]?.label}
                </span>
              </a>
            </div>
            <div class="col-span-4"></div>
          </Show>
        )}
      </For>
    </div>
  );
}
