import { For, Show, Switch, Match } from "solid-js";
import {
  type EntityViewTypes,
  type EntityTypes,
  ModelConfigs,
  ListReturnTypes,
  FieldDefinition,
} from "../../ProjectConfig";

import { t } from "~/contexts/translation";
import { prefetch } from "~/utils/prefetch";

type ViewItemsProps = {
  item: EntityViewTypes[EntityTypes];
  itemType: EntityTypes;
  embedded?: boolean;
};

export function ViewItems(props: ViewItemsProps) {
  return (
    <div class="grid grid-cols-12 gap-x-6 gap-y-12 w-full">
      <For
        each={
          Object.entries(
            ModelConfigs[props.item.realType as keyof EntityViewTypes].fields
          ) as unknown as [
            keyof EntityViewTypes[typeof props.itemType],
            FieldDefinition,
          ][]
        }
      >
        {([fieldName, fieldConfig]) => (
          <Show when={fieldName in props.item && fieldName !== "uid"}>
            <Switch>
              <Match when={fieldConfig.value}>
                <div class="col-span-2 font-semibold uppercase text-sm flex items-center select-none">
                  {
                    // @ts-ignore
                    t(`${props.item.realType}.${fieldName}.verboseName`)
                  }
                </div>
                <div class="flex items-center col-span-10">
                  {props.item[fieldName]}
                </div>
              </Match>

              <Match when={fieldConfig.embeddedNode}>
                <div class="col-span-2 font-semibold uppercase text-sm flex items-center select-none">
                  {
                    // @ts-ignore
                    t(`${props.item.realType}.${fieldName}.verboseName`)
                  }
                </div>
                <div class="col-span-10 flex flex-col space-y-4">
                  <For
                    each={
                      props.item[
                        fieldName
                      ] as unknown as ListReturnTypes[typeof props.itemType]["results"]
                    }
                  >
                    {(fieldItem) => (
                      <div>
                        <div class="w-fit select-none bg-slate-600 rounded-t-sm border-r-white border-r-[0.5px] uppercase font-semibold text-slate-50 text-xs flex flex-col justify-center items-start p-3 group-hover:bg-slate-700 group-focus:bg-slate-700 group-active:bg-slate-500">
                          {t(`${fieldItem.realType}.__model.verboseName`)}
                        </div>

                        <div class=" px-6 py-8  overflow-hidden rounded-sm rounded-tl-none flex items-center bg-slate-200/80 z-20 shadow-sm">
                          <ViewItems
                            item={
                              fieldItem as unknown as EntityViewTypes[EntityTypes]
                            }
                            itemType={fieldItem.realType}
                            embedded={false}
                          />
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </Match>

              <Match
                when={fieldConfig.outgoingRelation && fieldConfig.createInline}
              >
                <div class="col-span-2 font-semibold uppercase text-sm flex items-center select-none">
                  {
                    // @ts-ignore
                    t(`${props.item.realType}.${fieldName}.verboseName`)
                  }
                </div>
                <div class="col-span-10 flex flex-col space-y-4">
                  <For
                    each={
                      props.item[
                        fieldName
                      ] as unknown as ListReturnTypes[typeof props.itemType]["results"]
                    }
                  >
                    {(fieldItem) => (
                      <div>
                        <a
                          href={`/objects/${fieldItem.realType}/${fieldItem.uid}`}
                          class="flex group cursor-pointer outline-non transition-none duration-75 active:scale-y-[99.5%] active:scale-x-[99.5%] hover:shadow-md active:shadow-inner hover:shadow-neutral-300 w-fit"
                        >
                          <span class="bg-slate-600 rounded-tl-sm border-r-white border-r-[0.5px] uppercase font-semibold text-slate-50 text-xs flex flex-col justify-center items-start p-3 group-hover:bg-slate-700 group-focus:bg-slate-700 group-active:bg-slate-500">
                            {t(`${fieldItem.realType}.__model.verboseName`)}
                          </span>
                          <span class="w-fit truncate rounded-tr-sm line-clamp-1 text-ellipsis pl-6 pr-6 p-2 block text-left text-base bg-neutral-300 text-pretty font-normal text-neutral-950 group-hover:bg-neutral-400 transition-all duration-75 group-focus:bg-neutral-400 group-active:bg-neutral-200 group-active:text-neutral-600">
                            {fieldItem.label}
                          </span>
                        </a>
                        <div class=" px-6 py-8  rounded-sm rounded-tl-none flex items-center bg-slate-200/80 z-20 shadow-xl">
                          <ViewItems
                            item={
                              fieldItem as unknown as EntityViewTypes[EntityTypes]
                            }
                            itemType={fieldItem.realType}
                            embedded={true}
                          />
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </Match>

              <Match
                when={
                  (fieldConfig.outgoingRelation ||
                    fieldConfig.incomingRelation) &&
                  props.item[fieldName]
                }
              >
                <div class="col-span-2 font-semibold uppercase text-sm flex items-center select-none">
                  <Show
                    when={
                      (
                        props.item[
                          fieldName
                        ] as unknown as ListReturnTypes[typeof props.itemType]["results"]
                      ).length > 1
                    }
                    fallback={
                      // @ts-ignore
                      t(`${props.item.realType}.${fieldName}.verboseName`)
                    }
                  >
                    {
                      // @ts-ignore
                      t(`${props.item.realType}.${fieldName}.verboseNamePlural`)
                    }
                  </Show>
                </div>
                <div class="col-span-10 flex items-center space-x-6">
                  <For
                    each={
                      props.item[
                        fieldName
                      ] as unknown as ListReturnTypes[typeof props.itemType]["results"]
                    }
                  >
                    {(fieldItem) => (
                      <a
                        use:prefetch
                        href={`/objects/${fieldItem.realType}/${fieldItem.uid}`}
                        class="flex max-w-full rounded-sm group cursor-pointer outline-non transition-none duration-75 active:scale-y-[99.5%] active:scale-x-[99.5%] hover:shadow-md active:shadow-inner hover:shadow-neutral-300"
                      >
                        <span class="bg-slate-600 w-fit min-w-fit rounded-l-sm border-r-white border-r-[0.5px] uppercase font-semibold text-slate-50 text-xs flex flex-col justify-center items-start p-3 group-hover:bg-slate-700 group-focus:bg-slate-700 group-active:bg-slate-500">
                          {t(`${fieldItem.realType}.__model.verboseName`)}
                        </span>
                        <span class="w-full truncate line-clamp-1 text-ellipsis pl-6 pr-6 p-2 block text-left text-base bg-neutral-300 text-pretty font-normal text-neutral-950 rounded-r-sm group-hover:bg-neutral-400 transition-all duration-75 group-focus:bg-neutral-400 group-active:bg-neutral-200 group-active:text-neutral-600">
                          {fieldItem.label}
                        </span>
                      </a>
                    )}
                  </For>
                </div>
              </Match>
            </Switch>
          </Show>
        )}
      </For>
    </div>
  );
}
