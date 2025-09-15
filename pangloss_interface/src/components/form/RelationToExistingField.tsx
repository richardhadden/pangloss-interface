import {
  BaseNodeDefinitionMap,
  ReifiedRelationsDefinitionMap,
  TRelationFieldDefinition,
} from "../../../.model-configs/model-definitions";
import {
  BaseNodeTypes,
  ReifiedRelationTypes,
} from "../../../.model-configs/model-typescript";
import { TextField, TextAreaField } from "./LiteralFields";
import { Button } from "@kobalte/core/button";
import { DropdownMenuSubTriggerProps } from "@kobalte/core/dropdown-menu";
import { BiSolidInfoCircle, BiSolidXCircle } from "solid-icons/bi";
import { IoCheckmarkCircleSharp, IoCloseSharp } from "solid-icons/io";
import {
  createSelector,
  createSignal,
  For,
  Match,
  onCleanup,
  onMount,
  Show,
  Switch,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Portal } from "solid-js/web";
import colors from "tailwindcss/colors";
import { interfaceApiClient, type APIError, getRequest } from "~/apiClient";
import { TranslationKey, useTranslation } from "~/contexts/translation";
import { createBlankObject } from "~/utils/createBlankObject";

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
  onSelect: (item: TSelectionOptions["results"][number]) => void;
};

function AutocompleteSelector(props: TAutocompleteSelectorProps) {
  const [lang, { t }] = useTranslation();
  const [inputValue, setInputValue] = createSignal("");
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

  let inputAreaRef!: HTMLDivElement;
  let inputRef!: HTMLInputElement;
  let portalContainer!: HTMLDivElement;
  let typeSelectContainer!: HTMLDivElement;

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
          block: "end",
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
          block: "end",
          inline: "nearest",
        });
      }
    }
    if (key === "Escape") {
      e.preventDefault();
      setInputIsFocused(false);
    } else if (key === "Enter") {
      e.preventDefault();
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

  async function onSetSelectionTypes(e: MouseEvent, type, value) {
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
    <div ref={inputAreaRef!}>
      <div class="w-full mb-2 flex" ref={typeSelectContainer}>
        <Show when={inputIsFocused()}>
          <span class="uppercase text-xs mr-4 font-semibold flex items-center text-slate-700 select-none">
            Filter by types
          </span>
          <For each={Object.entries(selectionTypes)}>
            {([type, selected]) => (
              <button
                class="uppercase text-xs  font-semibold  rounded-xs flex items-center justify-center mr-2 cursor-pointer group"
                classList={{
                  "bg-slate-600 text-slate-100 hover:bg-slate-700 hover:shadow-inner ":
                    selected,
                  "bg-slate-500 text-slate-400 opacity-60": !selected,
                }}
                onMouseDown={(e) => onSetSelectionTypes(e, type, !selected)}
              >
                <span class="group-hover:scale-[98%] py-2 px-3">
                  {t[type as TranslationKey]._model.verboseName()}
                </span>
                <Show
                  when={selected}
                  fallback={
                    <div class=" h-8 w-8 bg-slate-400 flex items-center justify-center rounded-r-xs group-active:scale-95">
                      <BiSolidXCircle
                        class=" h-8 block"
                        color={colors.slate[500]}
                      />
                    </div>
                  }
                >
                  <div class=" h-8 w-8 bg-slate-500 flex items-center justify-center rounded-r-xs group-active:scale-95">
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
      <TextField
        ref={inputRef!}
        value={inputValue()}
        onInput={(value) => onInputChange(value)}
        placeholder="Type to search..."
        onFocusIn={() => onFocus()}
        onKeyPress={(e) => onInputKeyPress(e, e.key)}
      />
      <div ref={portalContainer}></div>
      <Show when={inputIsFocused() && selectionOptions()}>
        <Portal mount={portalContainer}>
          <Show
            when={selectionOptions()?.results?.length > 0}
            fallback={
              <div class="w-full mt-3 mb-4 h-8 flex rounded-xs group  items-center justify-start ">
                <div class="bg-amber-600 h-full rounded-l-xs aspect-square flex justify-center items-center shadow-md">
                  <BiSolidInfoCircle color="white" size={18} />
                </div>
                <div class="bg-slate-300 text-slate-600 h-full rounded-r-xs py-2 px-4 text-xs uppercase font-semibold flex items-center shadow-md cursor-default select-none">
                  No results found
                </div>
              </div>
            }
          >
            <div
              id="menu"
              class="absolute z-50  max-h-1/2  bg-zinc-900/20 backdrop-blur-3xl rounded-xs shadow-2xl shadow-zinc-900/20 p-2 overflow-y-scroll mt-1"
              style={`top: ${inputLocation().bottom}; left: ${inputLocation().left.toString()}; width: ${inputLocation().width.toString()}px;`}
            >
              <For each={selectionOptions()?.results}>
                {(item, index) => (
                  <button
                    data-selected={isSelected(index())}
                    class="w-full flex  backdrop-blur-none bg-blend-normal not-first:mt-2 cursor-pointer "
                    classList={{
                      "bg-zinc-400": isSelected(index()),
                      "bg-zinc-300": !isSelected(index()),
                    }}
                    onmouseenter={() => setSelectedIndex(index())}
                    onClick={() => props.onSelect(item)}
                  >
                    <div
                      class="uppercase text-xs text-slate-100 font-semibold py-2 px-3 rounded-l-xs flex items-center justify-center border-r-[0.5px] border-right-slate-500 text-nowrap"
                      classList={{
                        "bg-slate-700": isSelected(index()),
                        "bg-slate-600": !isSelected(index()),
                      }}
                    >
                      {t[item.type as TranslationKey]._model.verboseName()}
                    </div>
                    <div class="p-2 pl-3 text-sm">{item.label}</div>
                  </button>
                )}
              </For>
            </div>
          </Show>
        </Portal>
      </Show>
    </div>
  );
}

type TRenderBaseSelectedItemProps = { item: any; onRemove: () => void };

export function RenderBaseSelectedItem(props: TRenderBaseSelectedItemProps) {
  const [lang, { t }] = useTranslation();
  return (
    <div class=" bg-zinc-300 rounded-xs flex flex-start w-fit h-fit relative ">
      <div class="bg-slate-600 uppercase text-slate-100 font-semibold rounded-l-xs text-xs flex items-center px-3 py-2 select-none text-nowrap">
        {t[props.item.type as TranslationKey]._model.verboseName()}
      </div>
      <div class="flex items-center pr-4 pl-4 text-sm">{props.item.label}</div>
      <button
        onClick={props.onRemove}
        class="group aspect-square  h-10  cursor-pointer bg-orange-500/70 rounded-r-xs flex items-center justify-center hover:bg-orange-500/80 active:bg-orange-500/80 active:shadow-inner active:shadow-slate-600/30"
      >
        <IoCloseSharp
          color={colors.slate["100"]}
          class="group-active:scale-95"
          size={18}
        />
      </button>
    </div>
  );
}

type TRenderReifiedRelationProps = { item: any; onRemove: () => void };

export function RenderReifiedRelation(props: TRenderReifiedRelationProps) {
  console.log(props.item.target);
  return (
    <div class="bg-slate-400/30 rounded-xs shadow-md">
      <div class="bg-slate-500 text-slate-100 text-xs uppercase font-semibold rounded-t-xs h-fit select-none flex items-center justify-start">
        {props.item.type} of{" "}
        <span class="bg-slate-600 p-1 rounded-xs ml-1 py-2 mx-3">
          {props.item.target[0].type}
        </span>
        <span class="grow" />
        <button
          onClick={props.onRemove}
          class="group aspect-square  h-8  cursor-pointer bg-orange-500/70 rounded-r-xs flex items-center justify-center hover:bg-orange-500/80 active:bg-orange-500/80 active:shadow-inner active:shadow-slate-600/30"
        >
          <IoCloseSharp
            color={colors.slate["100"]}
            class="group-active:scale-95"
            size={18}
          />
        </button>
      </div>
      <div>Contents...</div>
    </div>
  );
}

type TRelationToExistingFieldProps = {
  fieldDefinition: TRelationFieldDefinition;
  value: any;
  setValue: (value: TSelectionOptions["results"][number]) => void;
};

export function RelationToExistingField(props: TRelationToExistingFieldProps) {
  function onSelect(item) {
    if (props.fieldDefinition.defaultReifiedType) {
      const blankObject = createBlankObject(
        props.fieldDefinition.defaultReifiedType,
        true,
      );
      blankObject.target = [item];
      props.setValue([...props.value, blankObject]);
      return;
    }

    props.setValue([...props.value, item]);
  }

  function onRemove(index: number) {
    props.setValue(props.value.filter((item, idx: number) => idx !== index));
  }

  return (
    <>
      <Show when={props.value.length > 0}>
        <div class="col-span-10 not-last:mb-5 not-last:pb-6 flex gap-x-2 gap-y-2 flex-wrap not-last:border-b border-b-slate-400/30">
          <For each={props.value}>
            {(item, index) => (
              <Switch>
                <Match when={item.type in ReifiedRelationsDefinitionMap}>
                  <RenderReifiedRelation
                    item={item}
                    onRemove={() => onRemove(index())}
                  />
                </Match>
                <Match when={item.type in BaseNodeDefinitionMap}>
                  <RenderBaseSelectedItem
                    item={item}
                    onRemove={() => onRemove(index())}
                  />
                </Match>
              </Switch>
            )}
          </For>
        </div>
      </Show>
      <Show
        when={
          !(
            props.fieldDefinition.validators.MaxLen &&
            props.value.length === props.fieldDefinition.validators.MaxLen
          )
        }
      >
        <div class="col-span-10">
          <AutocompleteSelector
            selectionTypes={props.fieldDefinition.defaultSearchType}
            onSelect={onSelect}
            selectedItems={props.value}
          />
        </div>
      </Show>
    </>
  );
}
