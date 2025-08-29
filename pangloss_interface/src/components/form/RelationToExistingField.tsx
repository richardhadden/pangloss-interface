import { TextField, TextAreaField } from "./LiteralFields";
import { Button } from "@kobalte/core/button";
import { DropdownMenuSubTriggerProps } from "@kobalte/core/dropdown-menu";
import {
  createSelector,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { Portal } from "solid-js/web";
import { interfaceApiClient, type APIError, getRequest } from "~/apiClient";
import { TranslationKey, useTranslation } from "~/contexts/translation";

type TSelectionOptions = {
  results: Array<{ type: string; id: string; label: string }>;
  page: number;
  count: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
  nextUrl: string | null;
  previousUrl: string | null;
};

function AutocompleteSelector(props) {
  const [lang, { t }] = useTranslation();
  const [inputValue, setInputValue] = createSignal("");
  const [inputIsFocused, setInputIsFocused] = createSignal(false);
  const [selectedIndex, setSelectedIndex] = createSignal<number>(0);
  const [selectionOptions, setSelectionOptions] =
    createSignal<TSelectionOptions>();

  const isSelected = createSelector(selectedIndex);

  let inputAreaRef!: HTMLDivElement;
  let inputRef!: HTMLInputElement;
  let portalContainer!: HTMLDivElement;

  const inputLocation = () => inputRef.getBoundingClientRect();

  const handleClick = (event: MouseEvent) => {
    if (!inputAreaRef.contains(event.target as Node)) {
      setInputIsFocused(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", handleClick);
    onCleanup(() => {
      document.removeEventListener("click", handleClick);
    });
  });

  const onFocus = async () => {
    setInputIsFocused(true);
    if (selectionOptions() === undefined) {
      console.log("getting ");
      const data = await interfaceApiClient.autocomplete(
        ["ZoteroEntry", "Factoid"],
        null,
      );
      setSelectionOptions(data as TSelectionOptions);
    }
  };

  const onInputKeyPress = (e: KeyboardEvent, key: KeyboardEvent["key"]) => {
    console.log(key, selectedIndex());
    if (key === "ArrowUp" && selectedIndex() > 0) {
      e.preventDefault();
      setSelectedIndex(selectedIndex() - 1);
    }
    if (
      key === "ArrowDown" &&
      selectedIndex() < selectionOptions()?.results?.length - 1
    ) {
      e.preventDefault();
      setSelectedIndex(selectedIndex() + 1);
    }
    if (key === "Escape") {
      e.preventDefault();
      setInputIsFocused(false);
    } else {
      setInputIsFocused(true);
    }
  };

  async function onInputChange(value: string) {
    setInputValue(value);
    const data = await interfaceApiClient.autocomplete(
      ["ZoteroEntry", "Factoid"],
      value,
    );
    setSelectionOptions(data as TSelectionOptions);
    setSelectedIndex(0);
  }

  return (
    <div class="" ref={inputAreaRef!}>
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
          <div
            class="absolute z-50  max-h-1/2  bg-zinc-900/20 backdrop-blur-3xl rounded-xs shadow-2xl shadow-zinc-900/20 p-2 overflow-y-scroll mt-1"
            style={`top: ${inputLocation().bottom}; left: ${inputLocation().left.toString()}; width: ${inputLocation().width.toString()}px;`}
          >
            <For each={selectionOptions()?.results}>
              {(item, index) => (
                <button
                  class="w-full flex  backdrop-blur-none bg-blend-normal not-first:mt-2 cursor-pointer"
                  classList={{
                    "bg-zinc-200": isSelected(index()),
                    "bg-zinc-300": !isSelected(index()),
                  }}
                  onmouseenter={() => setSelectedIndex(index())}
                >
                  <div
                    class="uppercase text-xs text-slate-100 font-semibold py-2 px-3 rounded-l-xs flex items-center justify-center"
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
        </Portal>
      </Show>
    </div>
  );
}

export function RelationToExistingField(props) {
  return (
    <div class="col-span-10">
      <AutocompleteSelector />
    </div>
  );
}
