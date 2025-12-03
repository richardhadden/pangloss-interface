import { TranslationKey, useTranslation } from "~/contexts/translation";
import {
  BaseNodeTypes,
  ReifiedRelationTypes,
} from "../../../.model-configs/model-typescript";
import {
  createSelector,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { createStore } from "solid-js/store";
import { interfaceApiClient } from "~/apiClient";
import {
  BiRegularPlus,
  BiSolidInfoCircle,
  BiSolidXCircle,
} from "solid-icons/bi";
import colors from "tailwindcss/colors";
import { IoCheckmarkCircleSharp } from "solid-icons/io";
import { TextField } from "./LiteralFields";
import { ModelDefinitions } from "../../../.model-configs/model-definitions";
import { Portal } from "solid-js/web";
import { CreateInlineForm } from "./CreateInlineForm";

type TSelectionOptions = {
  results: Array<{ type: BaseNodeTypes; id: string; label: string }>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
  nextUrl: string | null;
  previousUrl: string | null;
};

type TAutocompleteSelectorProps = {
  selectionTypes: BaseNodeTypes[];
  selectedItems: (BaseNodeTypes | ReifiedRelationTypes)[];
  selectedIds: Set<string>;
  onSelect: (item: TSelectionOptions["results"][number]) => void;
  searchBoxVisible?: boolean;
  size?: "small" | "medium" | "large";
  shouldHideWhenNotFocused?: boolean;
  alternativeCreateTypes: ReifiedRelationTypes[];
  onClickAlternativeCreateType: (
    type: keyof BaseNodeTypes | keyof ReifiedRelationTypes,
  ) => void;
};

function AutocompleteSelector(props: TAutocompleteSelectorProps) {
  const [lang, { t }] = useTranslation();
  const [inputValue, setInputValue] = createSignal("");
  const [creatingNewItemOfType, setCreatingNewItemOfType] =
    createSignal<BaseNodeTypes | null>(null);
  const [inputIsFocused, setInputIsFocused] = createSignal(false);
  const [selectedIndex, setSelectedIndex] = createSignal<number>(0);
  const [selectionOptions, setSelectionOptions] =
    createSignal<TSelectionOptions>();

  const isSelected = createSelector(selectedIndex);
  const [selectionTypes, setSelectionTypes] = createStore<{
    [key in BaseNodeTypes]: boolean;
  }>(
    Object.fromEntries(props.selectionTypes.map((t) => [t, true])) as {
      [key in BaseNodeTypes]: boolean;
    },
  );

  const searchBoxVisible = props.searchBoxVisible === false ? false : true;

  let inputAreaRef!: HTMLDivElement;
  let inputRef!: HTMLInputElement;
  let menuPortalContainer!: HTMLDivElement;
  let typeSelectContainer!: HTMLDivElement;
  let createPortalContainer!: HTMLDivElement;

  const inputLocation = () => inputRef.getBoundingClientRect();

  const handleClick = (event: MouseEvent) => {
    if (!inputAreaRef.contains(event.target as Node)) {
      event.stopPropagation();
      event.preventDefault();
      setInputIsFocused(false);
      return;
    }
  };

  onMount(() => {
    if (selectionOptions() === undefined) {
      const st = Object.entries(selectionTypes)
        .filter(([t, v]) => v)
        .map(([t, v]) => t);
      const data = interfaceApiClient
        .autocomplete(st, null)
        .then(setSelectionOptions);
    }
    document.addEventListener("click", handleClick);
    onCleanup(() => {
      document.removeEventListener("click", handleClick);
    });
  });

  const onFocus = async () => {
    setInputIsFocused(true);
  };

  const onInputKeyPress = (e: KeyboardEvent, key: KeyboardEvent["key"]) => {
    if (key === "ArrowUp" && selectedIndex() > 0) {
      e.preventDefault();
      setSelectedIndex(selectedIndex() - 1);
      const el = document.querySelector("#menu > [data-selected=true]");
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
    if (
      key === "ArrowDown" &&
      selectionOptions() !== undefined &&
      (selectionOptions() as TSelectionOptions).results.length > 0 &&
      selectedIndex() <
        (selectionOptions() as TSelectionOptions)?.results?.length - 1
    ) {
      e.preventDefault();
      setSelectedIndex(selectedIndex() + 1);

      const el = document.querySelector("#menu > [data-selected=true]");
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
    if (key === "Escape") {
      e.preventDefault();
      setInputIsFocused(false);
    } else if (key === "Enter") {
      e.preventDefault();
      setInputValue("");
      setInputIsFocused(false);
      const item = selectionOptions()!.results![selectedIndex()];
      props.onSelect(item);
    } else {
      setInputIsFocused(true);
    }
  };

  async function onInputChange(value: string) {
    setInputValue(value);
    const st = Object.entries(selectionTypes)
      .filter(([t, v]) => v)
      .map(([t, v]) => t);
    const data = await interfaceApiClient.autocomplete(st, value);
    setSelectionOptions(data as TSelectionOptions);
    setSelectedIndex(0);
  }

  async function onSetSelectionTypes(e: MouseEvent, type: any, value: any) {
    e.stopPropagation();
    e.preventDefault();
    setSelectionTypes(type, value);
    const st = Object.entries(selectionTypes)
      .filter(([t, v]) => v)
      .map(([t, v]) => t);
    const data = await interfaceApiClient.autocomplete(st, inputValue());
    setSelectionOptions(data as TSelectionOptions);
    setSelectedIndex(0);
  }

  return (
    <>
      <div ref={createPortalContainer}></div>
      <Show
        when={
          inputIsFocused() ||
          props.shouldHideWhenNotFocused === undefined ||
          props.shouldHideWhenNotFocused === true
        }
      >
        <div ref={inputAreaRef!}>
          <div class="mb-2 flex w-full" ref={typeSelectContainer}>
            <Show when={inputIsFocused()}>
              <span class="mr-4 flex items-center text-xs font-semibold text-slate-700 uppercase select-none">
                Filter by types
              </span>
              <For each={Object.entries(selectionTypes)}>
                {([type, selected]) => (
                  <button
                    class="group mr-2 flex cursor-pointer items-center justify-center rounded-xs text-xs font-semibold uppercase"
                    classList={{
                      "bg-slate-600 text-slate-100 hover:bg-slate-700 hover:shadow-inner ":
                        selected,
                      "bg-slate-500 text-slate-400 opacity-60": !selected,
                    }}
                    onMouseDown={(e) => onSetSelectionTypes(e, type, !selected)}
                  >
                    <span class="px-3 py-2 group-hover:scale-[98%]">
                      {t[type as TranslationKey]._model.verboseName()}
                    </span>
                    <Show
                      when={selected}
                      fallback={
                        <div class="flex h-8 w-8 items-center justify-center rounded-r-xs bg-slate-400 group-active:scale-95">
                          <BiSolidXCircle
                            class="block h-8"
                            color={colors.slate[500]}
                          />
                        </div>
                      }
                    >
                      <div class="flex h-8 w-8 items-center justify-center rounded-r-xs bg-slate-500 group-active:scale-95">
                        <IoCheckmarkCircleSharp
                          class="block"
                          color={colors.slate[100]}
                        />
                      </div>
                    </Show>
                  </button>
                )}
              </For>
            </Show>
          </div>
          <Show when={searchBoxVisible}>
            <TextField
              ref={inputRef!}
              value={inputValue()}
              onInput={(value) => onInputChange(value)}
              placeholder="Type to search..."
              onFocusIn={() => onFocus()}
              onKeyPress={(e) => onInputKeyPress(e, e.key)}
              class="bg-red-500"
            />

            <div ref={menuPortalContainer}></div>

            <Show
              when={
                typeof props.alternativeCreateTypes !== "undefined" &&
                props.alternativeCreateTypes.length > 0
              }
            >
              <div class="mt-2 flex w-full flex-wrap items-center">
                <For each={props.alternativeCreateTypes}>
                  {(altType) => (
                    <Show
                      when={
                        ModelDefinitions[altType]?.meta?.metatype ===
                          "ReifiedRelation" ||
                        ModelDefinitions[altType]?.meta?.metatype ===
                          "ReifiedRelationNode" ||
                        ModelDefinitions[altType]?.meta?.create
                      }
                    >
                      <button
                        class="group mr-2 flex cursor-pointer flex-row items-center rounded-xs bg-slate-500 text-xs font-semibold text-slate-50 uppercase hover:bg-slate-600"
                        onclick={() =>
                          ModelDefinitions[altType]?.meta?.metatype ===
                            "ReifiedRelation" ||
                          ModelDefinitions[altType]?.meta?.metatype ===
                            "ReifiedRelationNode"
                            ? props.onClickAlternativeCreateType(
                                altType as
                                  | keyof ReifiedRelationTypes
                                  | keyof BaseNodeTypes,
                              )
                            : setCreatingNewItemOfType(altType as BaseNodeTypes)
                        }
                      >
                        <span class="ml-1 group-active:scale-95">
                          <BiRegularPlus />
                        </span>
                        <span class="p-1 pr-2 group-active:scale-95">
                          {t[altType as TranslationKey]._model.verboseName()}
                        </span>
                      </button>
                    </Show>
                  )}
                </For>
              </div>
            </Show>
            <Show when={inputIsFocused() && selectionOptions()}>
              <Portal mount={menuPortalContainer}>
                <Show
                  when={
                    selectionOptions()?.results?.filter(
                      (item) => !props.selectedIds.has(item.id),
                    ).length > 0
                  }
                  fallback={
                    <div class="group mt-3 mb-4 flex h-8 w-full items-center justify-start rounded-xs">
                      <div class="flex aspect-square h-full items-center justify-center rounded-l-xs bg-amber-600 shadow-md">
                        <BiSolidInfoCircle color="white" size={18} />
                      </div>
                      <div class="flex h-full cursor-default items-center rounded-r-xs bg-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 uppercase shadow-md select-none">
                        No results found
                      </div>
                    </div>
                  }
                >
                  <div
                    id="menu"
                    class="absolute z-50 mt-1 max-h-1/2 overflow-y-scroll rounded-xs bg-zinc-900/20 p-2 shadow-2xl shadow-zinc-900/20 backdrop-blur-3xl"
                    style={`top: ${inputLocation().bottom}; left: ${inputLocation().left.toString()}; width: ${inputLocation().width.toString()}px;`}
                  >
                    <For each={selectionOptions()?.results}>
                      {(item, index) => (
                        <Show when={!props.selectedIds.has(item.id)}>
                          <button
                            data-selected={isSelected(index())}
                            class="flex w-full cursor-pointer rounded-xs bg-blend-normal backdrop-blur-none not-first:mt-2"
                            classList={{
                              "bg-zinc-400": isSelected(index()),
                              "bg-zinc-300": !isSelected(index()),
                            }}
                            onmouseenter={() => setSelectedIndex(index())}
                            onClick={() => props.onSelect(item)}
                          >
                            <div
                              class="border-right-slate-500 flex items-center justify-center rounded-l-xs border-r-[0.5px] px-3 py-2 text-xs font-semibold text-nowrap text-slate-100 uppercase"
                              classList={{
                                "bg-slate-700": isSelected(index()),
                                "bg-slate-600": !isSelected(index()),
                              }}
                            >
                              {t[
                                item.type as TranslationKey
                              ]._model.verboseName()}
                            </div>
                            <div class="p-2 pl-3 text-sm">{item.label}</div>
                          </button>
                        </Show>
                      )}
                    </For>
                  </div>
                </Show>
              </Portal>
            </Show>
          </Show>
        </div>
      </Show>
      <Show when={creatingNewItemOfType()}>
        <Portal mount={createPortalContainer}>
          <CreateInlineForm
            itemType={creatingNewItemOfType()!}
            onClose={() => setCreatingNewItemOfType(null)}
            onSuccessfulCreate={props.onSelect}
          />
        </Portal>
      </Show>
    </>
  );
}

export { AutocompleteSelector, type TSelectionOptions };
