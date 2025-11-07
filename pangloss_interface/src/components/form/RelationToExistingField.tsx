import {
  BaseNodeDefinitionMap,
  ModelDefinitions,
  ReifiedRelationsDefinitionMap,
  TRelationDefinition,
  TRelationFieldDefinition,
} from "../../../.model-configs/model-definitions";
import {
  BaseNodeTypes,
  EdgeModelTypes,
  ReifiedRelationTypes,
} from "../../../.model-configs/model-typescript";
import { FormFields } from "./BaseForm";
import { TextField } from "./LiteralFields";
import {
  BiRegularCollapse,
  BiRegularExpand,
  BiRegularPlus,
  BiSolidInfoCircle,
  BiSolidXCircle,
} from "solid-icons/bi";
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
import { interfaceApiClient } from "~/apiClient";
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
            <span class="mr-4 flex select-none items-center text-xs font-semibold uppercase text-slate-700">
              Filter by types
            </span>
            <For each={Object.entries(selectionTypes)}>
              {([type, selected]) => (
                <button
                  class="rounded-xs group mr-2 flex cursor-pointer items-center justify-center text-xs font-semibold uppercase"
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
                      <div class="rounded-r-xs flex h-8 w-8 items-center justify-center bg-slate-400 group-active:scale-95">
                        <BiSolidXCircle
                          class="block h-8"
                          color={colors.slate[500]}
                        />
                      </div>
                    }
                  >
                    <div class="rounded-r-xs flex h-8 w-8 items-center justify-center bg-slate-500 group-active:scale-95">
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

          <div ref={portalContainer}></div>
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
                      class="rounded-xs group mr-2 flex cursor-pointer flex-row items-center bg-slate-500 text-xs font-semibold uppercase text-slate-50 hover:bg-slate-600"
                      onclick={() =>
                        props.onClickAlternativeCreateType(
                          altType as
                            | keyof ReifiedRelationTypes
                            | keyof BaseNodeTypes,
                        )
                      }
                    >
                      <span class="ml-1 group-active:scale-95">
                        <BiRegularPlus />
                      </span>
                      <span class="p-1 pr-2 group-active:scale-95">
                        {t[altType as TranslationKey]._model.verboseName}
                      </span>
                    </button>
                  </Show>
                )}
              </For>
            </div>
          </Show>
          <Show when={inputIsFocused() && selectionOptions()}>
            <Portal mount={portalContainer}>
              <Show
                when={selectionOptions()?.results?.length > 0}
                fallback={
                  <div class="rounded-xs group mb-4 mt-3 flex h-8 w-full items-center justify-start">
                    <div class="rounded-l-xs flex aspect-square h-full items-center justify-center bg-amber-600 shadow-md">
                      <BiSolidInfoCircle color="white" size={18} />
                    </div>
                    <div class="rounded-r-xs flex h-full cursor-default select-none items-center bg-slate-300 px-4 py-2 text-xs font-semibold uppercase text-slate-600 shadow-md">
                      No results found
                    </div>
                  </div>
                }
              >
                <div
                  id="menu"
                  class="max-h-1/2 rounded-xs absolute z-50 mt-1 overflow-y-scroll bg-zinc-900/20 p-2 shadow-2xl shadow-zinc-900/20 backdrop-blur-3xl"
                  style={`top: ${inputLocation().bottom}; left: ${inputLocation().left.toString()}; width: ${inputLocation().width.toString()}px;`}
                >
                  <For each={selectionOptions()?.results}>
                    {(item, index) => (
                      <button
                        data-selected={isSelected(index())}
                        class="not-first:mt-2 rounded-xs flex w-full cursor-pointer bg-blend-normal backdrop-blur-none"
                        classList={{
                          "bg-zinc-400": isSelected(index()),
                          "bg-zinc-300": !isSelected(index()),
                        }}
                        onmouseenter={() => setSelectedIndex(index())}
                        onClick={() => props.onSelect(item)}
                      >
                        <div
                          class="rounded-l-xs border-right-slate-500 flex items-center justify-center text-nowrap border-r-[0.5px] px-3 py-2 text-xs font-semibold uppercase text-slate-100"
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
        </Show>
      </div>
    </Show>
  );
}

type TRenderBaseSelectedItemProps = { item: any; onRemove: () => void };

export function RenderBaseSelectedItem(props: TRenderBaseSelectedItemProps) {
  const [lang, { t }] = useTranslation();
  return (
    <div class="rounded-xs flex-start flex h-fit w-fit bg-zinc-300 shadow-2xl">
      <div class="rounded-l-xs flex select-none items-center text-nowrap bg-slate-600 px-3 py-2 text-xs font-semibold uppercase text-slate-100">
        {t[props.item.type as TranslationKey]._model.verboseName()}
      </div>
      <div class="flex w-fit flex-nowrap items-center pl-4 pr-4 text-sm">
        {props.item.label}
      </div>
      <button
        onClick={props.onRemove}
        class="rounded-r-xs group flex aspect-square h-10 cursor-pointer items-center justify-center bg-orange-500/70 hover:bg-orange-500/80 active:bg-orange-500/80 active:shadow-inner active:shadow-slate-600/30"
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

type TRenderBaseSelectedItemWithEdgeModelProps = {
  item: any;
  onRemove: () => void;
  edgeModelType: EdgeModelTypes;
  setValue: (value: any, ...path: (string | number)[]) => void;
};

export function RenderBaseSelectedItemWithEdgeModel(
  props: TRenderBaseSelectedItemWithEdgeModelProps,
) {
  const [lang, { t }] = useTranslation();
  return (
    <div class="">
      <div class="rounded-t-xs flex-start flex h-fit w-full bg-zinc-300 shadow-2xl">
        <div class="rounded-tl-xs flex select-none items-center text-nowrap bg-slate-600 px-3 py-2 text-xs font-semibold uppercase text-slate-100">
          {t[props.item.type as TranslationKey]._model.verboseName()}
        </div>
        <div class="flex w-fit flex-nowrap items-center pl-4 pr-4 text-sm">
          {props.item.label}
        </div>
        <div class="grow" />
        <button
          onClick={props.onRemove}
          class="rounded-tr-xs group flex aspect-square h-10 cursor-pointer items-center justify-center bg-orange-500/70 hover:bg-orange-500/80 active:bg-orange-500/80 active:shadow-inner active:shadow-slate-600/30"
        >
          <IoCloseSharp
            color={colors.slate["100"]}
            class="group-active:scale-95"
            size={18}
          />
        </button>
      </div>
      <div class="rounded-b-xs flex h-fit w-full bg-slate-700 px-2 py-1">
        <FormFields
          fieldNames={Object.keys(ModelDefinitions[props.edgeModelType].fields)}
          modelName={props.edgeModelType}
          baseFormState={props.item.edgeProperties}
          setBaseFormState={(value, ...path) =>
            props.setValue(value, "edgeProperties", ...path)
          }
          style="unstyled"
          labelStyle="max-w-fit text-slate-300 text-xs uppercase font-semibold flex items-center"
          fieldContainerStyle=""
        />
      </div>
    </div>
  );
}

type TRenderReifiedRelationProps = {
  type: ReifiedRelationTypes;
  item: any;
  onRemove: () => void;
  fieldDefinition: TRelationFieldDefinition;
  setValue: (value: any, ...path: (number | string)[]) => void;
  typesInContext: TRelationDefinition;
};

export function RenderReifiedRelation(props: TRenderReifiedRelationProps) {
  console.log("FD", props.fieldDefinition);
  const [lang, { t }] = useTranslation();
  const [reifiedRelHovered, setReifiedRelHovered] = createSignal(false);

  const shouldCollapseFunc =
    ModelDefinitions[props.type as ReifiedRelationTypes].meta.shouldCollapse;
  const [collapse, setCollapse] = createSignal<boolean>(
    shouldCollapseFunc !== undefined && shouldCollapseFunc(props.item),
  );

  const relationsToTypeVar = Object.entries(
    ModelDefinitions[props.item.type as keyof typeof ModelDefinitions].fields,
  )
    .filter(
      ([fieldName, fieldDef]) =>
        fieldDef.metatype === "RelationField" &&
        fieldDef.types.some((t) => t.metatype === "RelationToTypeVar"),
    )
    .map(([fieldName, fieldDef]) => fieldName);

  return (
    <Show
      when={shouldCollapseFunc && shouldCollapseFunc(props.item) && collapse()}
      fallback={
        <div
          class="rounded-xs shadow-slate- box-border h-fit bg-slate-300/50 shadow-xl shadow-slate-700/30"
          onmouseenter={() => setReifiedRelHovered(true)}
          onmouseleave={() => setReifiedRelHovered(false)}
        >
          <div class="rounded-t-xs flex h-fit select-none items-center justify-start text-xs font-semibold uppercase text-slate-100">
            <Show
              when={
                shouldCollapseFunc &&
                shouldCollapseFunc(props.item) &&
                !collapse()
              }
              fallback={
                <span class="rounded-tl-xs flex h-10 items-center bg-slate-500 px-2 text-xs font-semibold uppercase">
                  {t[
                    props.item.type as TranslationKey
                  ]._model.verboseName()}{" "}
                </span>
              }
            >
              <button
                class="rounded-tl-xs group flex h-10 cursor-pointer items-center justify-center bg-slate-500 hover:bg-slate-500/90 active:bg-slate-500/90 active:shadow-inner active:shadow-slate-600/30"
                onclick={() => setCollapse(true)}
              >
                <BiRegularCollapse
                  color={colors.slate["100"]}
                  class="ml-2 group-active:scale-95"
                  size={18}
                />
                <span class="ml-2 mr-2 text-xs font-semibold uppercase">
                  {t[props.item.type as TranslationKey]._model.verboseName()}
                </span>
              </button>
            </Show>

            <span class="flex h-10 items-center bg-slate-600 px-2 py-2">
              <Show
                when={props.item.target[0]}
                fallback={props.fieldDefinition.defaultSearchType
                  .map((dst) => t[dst as TranslationKey]._model.verboseName())
                  .join(" | ")}
              >
                {props.item.target.length > 1
                  ? t[
                      props.item.target[0].type as TranslationKey
                    ]._model.verboseNamePlural()
                  : t[
                      props.item.target[0].type as TranslationKey
                    ]._model.verboseName()}
              </Show>
            </span>
            <div class="h-10 grow bg-slate-500" />
            <button
              onClick={props.onRemove}
              class="rounded-tr-xs group flex aspect-square h-10 cursor-pointer items-center justify-center bg-orange-500/70 hover:bg-orange-500/80 active:bg-orange-500/80 active:shadow-inner active:shadow-slate-600/30"
            >
              <IoCloseSharp
                color={colors.slate["100"]}
                class="group-active:scale-95"
                size={18}
              />
            </button>
          </div>
          <div class="mt-2">
            <For each={relationsToTypeVar}>
              {(fieldName) => (
                <div>
                  <Show when={fieldName !== "target"}>
                    <div class="flex h-8 select-none items-center bg-slate-500 pl-2 text-xs font-semibold uppercase text-slate-100">
                      {fieldName}
                    </div>
                  </Show>
                  <div class="px-2 py-2">
                    <RelationToExistingField
                      fieldDefinition={
                        ModelDefinitions[props.item.type].fields[fieldName]
                      }
                      value={props.item[fieldName]}
                      showSearchBox={true}
                      setValue={(value, ...path) =>
                        props.setValue(value, fieldName, ...path)
                      }
                      typesInContext={
                        props.typesInContext ||
                        props.fieldDefinition.types.filter(
                          (t) => t.type === props.item.type,
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </For>
          </div>
          <div class="rounded-b-xs bg-slate-500/70 px-2">
            <FormFields
              fieldNames={Array.from(
                Object.keys(ModelDefinitions[props.type].fields).filter(
                  (t) => !relationsToTypeVar.includes(t) && t !== "label",
                ),
              )}
              modelName={props.type}
              baseFormState={props.item}
              setBaseFormState={(value, ...path) =>
                props.setValue(value, ...path)
              }
              style="small"
            />
          </div>
          <Show when={props.fieldDefinition.edgeModel}>
            <div class="rounded-b-xs flex w-full bg-slate-700 px-2">
              <FormFields
                fieldNames={Object.keys(
                  ModelDefinitions[
                    props.fieldDefinition.edgeModel as EdgeModelTypes
                  ].fields,
                )}
                modelName={props.fieldDefinition.edgeModel}
                baseFormState={props.item.edgeProperties}
                setBaseFormState={(value, ...path) =>
                  props.setValue(value, "edgeProperties", ...path)
                }
                style="unstyled"
                labelStyle="max-w-fit text-slate-50 text-xs uppercase font-semibold flex items-center"
                fieldContainerStyle=""
              />
            </div>
          </Show>
        </div>
      }
    >
      <div>
        <div class="rounded-xs flex h-fit items-center">
          <button
            class="rounded-tl-xs group flex cursor-pointer items-center justify-center bg-slate-500 py-3 text-slate-50 hover:bg-slate-500/90"
            onclick={() => setCollapse(false)}
          >
            <BiRegularExpand class="ml-2 group-active:scale-95" />
            <span class="rounded-l-xs flex h-full items-center px-2 text-xs font-semibold uppercase">
              {props.item.type}
            </span>
          </button>

          <For each={props.item.target}>
            {(item, index) => (
              <div class="flex-start rounded-t-xs flex h-fit w-full bg-zinc-300 shadow-2xl">
                <div class="flex select-none items-center text-nowrap bg-slate-600 px-2 py-2 text-xs font-semibold uppercase text-slate-100">
                  {t[item.type as TranslationKey]._model.verboseName()}
                </div>
                <div class="flex w-fit flex-nowrap items-center pl-4 pr-4 text-sm">
                  {item.label}
                </div>
                <div class="grow" />
                <button
                  onClick={() =>
                    props.setValue(
                      props.item.target.filter((item, idx) => idx !== index()),
                    )
                  }
                  class="rounded-tr-xs group flex aspect-square h-10 cursor-pointer items-center justify-center bg-orange-500/70 hover:bg-orange-500/80 active:bg-orange-500/80 active:shadow-inner active:shadow-slate-600/30"
                >
                  <IoCloseSharp
                    color={colors.slate["100"]}
                    class="group-active:scale-95"
                    size={18}
                  />
                </button>
              </div>
            )}
          </For>
        </div>
        <Show when={props.fieldDefinition.edgeModel}>
          <div class="rounded-b-xs flex w-full shrink bg-slate-700 px-2">
            <FormFields
              fieldNames={Object.keys(
                ModelDefinitions[
                  props.fieldDefinition.edgeModel as EdgeModelTypes
                ].fields,
              )}
              modelName={props.fieldDefinition.edgeModel}
              baseFormState={props.item.edgeProperties}
              setBaseFormState={(value, ...path) =>
                props.setValue(value, "edgeProperties", ...path)
              }
              style="unstyled"
              labelStyle="max-w-fit text-slate-300 text-xs uppercase font-semibold flex items-center"
              fieldContainerStyle=""
            />
          </div>
        </Show>
      </div>
    </Show>
  );
}

type TRelationToExistingFieldProps = {
  fieldDefinition: TRelationFieldDefinition;
  value: any;
  setValue: (
    value: TSelectionOptions["results"][number],
    ...path: (string | number)[]
  ) =>
    | void
    | ((value: { type: BaseNodeTypes; id: string; label: string }[]) => void);
  showSearchBox: boolean;
  typesInContext?: TRelationDefinition[];
};

export function RelationToExistingField(props: TRelationToExistingFieldProps) {
  const typeInContextTypeVarName = props.fieldDefinition.types[0].typeVarName;

  function getTypesInContext() {
    if (props.typesInContext && props.typesInContext.length > 0) {
      const typesInContext =
        props.typesInContext[0].typeParamsToTypeMap[typeInContextTypeVarName]
          .types;

      const relationToNodeTypes = typesInContext.filter(
        (t) => t.metatype === "RelationToNode",
      );

      if (relationToNodeTypes.length > 0) {
        const inContextDefautSearchType = relationToNodeTypes.map(
          (t) => t.type,
        );

        return [undefined, inContextDefautSearchType, typesInContext];
      }

      const relationToReifiedTypes = typesInContext.filter(
        (t) => t.metatype === "RelationToReified",
      );

      if (relationToReifiedTypes.length > 0) {
        const inContextDefaultReifiedType = relationToReifiedTypes[0].type;

        const inContextDefautSearchType =
          relationToReifiedTypes.length > 0
            ? relationToReifiedTypes[0].typeParamsToTypeMap[
                Object.keys(relationToReifiedTypes[0].typeParamsToTypeMap)[0]
              ].types
                .filter((t) => t.metatype === "RelationToNode")
                .map((t) => t.type)
            : undefined;

        return [
          inContextDefaultReifiedType,
          inContextDefautSearchType,
          typesInContext,
        ];
      }
    }
    return [undefined, undefined, undefined];
  }

  const [
    inContextDefaultReifiedType,
    inContextDefautSearchType,
    typesInContext,
  ] = getTypesInContext();

  const defaultReifiedType =
    inContextDefaultReifiedType || props.fieldDefinition.defaultReifiedType;

  const defaultSearchType =
    inContextDefautSearchType || props.fieldDefinition.defaultSearchType;

  function onSelect(item) {
    if (defaultReifiedType) {
      const blankObject = createBlankObject(
        defaultReifiedType,
        true,
        props.fieldDefinition.edgeModel,
      );

      const targetEdgeModel =
        ModelDefinitions[defaultReifiedType as keyof typeof ModelDefinitions]
          .fields["target"]?.edgeModel;

      if (targetEdgeModel) {
        blankObject.target = [
          {
            ...item,
            edgeProperties: createBlankObject(targetEdgeModel, false),
          },
        ];
      } else {
        blankObject.target = [item];
      }
      props.setValue([...props.value, blankObject]);
      return;
    }

    const targetEdgeModel = props.fieldDefinition.edgeModel;
    if (targetEdgeModel) {
      props.setValue([
        ...props.value,
        {
          ...item,
          edgeProperties: createBlankObject(targetEdgeModel, false),
        },
      ]);
      return;
    } else {
      blankObject.target = [item];
    }
  }

  function onRemove(index: number) {
    props.setValue(
      props.value.filter((item: any, idx: number) => idx !== index),
    );
  }

  function alternativeCreateTypes() {
    const fieldDefTypes = props.fieldDefinition.types
      .filter((t) => t.type !== props.fieldDefinition.defaultReifiedType)
      .map((t) => t.type)
      .sort();

    const types = new Set([
      ...props.fieldDefinition.defaultSearchType.sort(),
      ...fieldDefTypes,
    ]);
    return [...types];
  }

  function onClickAlterntiveCreateType(
    type: keyof BaseNodeTypes | keyof ReifiedRelationTypes,
  ) {
    if (type in ReifiedRelationsDefinitionMap) {
      const blankObject = createBlankObject(
        type as keyof typeof ModelDefinitions,
        true,
        props.fieldDefinition.edgeModel,
      );
      props.setValue([...props.value, blankObject]);
    }
  }

  return (
    <>
      <Show when={props.value.length > 0}>
        <div
          class="col-span-10 flex flex-row flex-wrap gap-x-4 gap-y-6"
          classList={{
            "not-last:border-b border-b-slate-400/30 not-last:mb-5 not-last:pb-6 ":
              props.showSearchBox,
          }}
        >
          <For each={props.value}>
            {(item, index) => (
              <Switch>
                <Match when={item.type in ReifiedRelationsDefinitionMap}>
                  <RenderReifiedRelation
                    type={item.type}
                    item={item}
                    onRemove={() => onRemove(index())}
                    fieldDefinition={props.fieldDefinition}
                    setValue={(value, ...path) =>
                      props.setValue(value, index(), ...path)
                    }
                    typesInContext={typesInContext}
                  />
                </Match>
                <Match
                  when={
                    item.type in BaseNodeDefinitionMap &&
                    props.fieldDefinition.edgeModel
                  }
                >
                  <RenderBaseSelectedItemWithEdgeModel
                    item={item}
                    edgeModelType={
                      props.fieldDefinition.edgeModel as EdgeModelTypes
                    }
                    setValue={(value, ...path) =>
                      props.setValue(value, index(), ...path)
                    }
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
            selectionTypes={defaultSearchType as BaseNodeTypes[]}
            onSelect={onSelect}
            selectedItems={props.value}
            searchBoxVisible={props.showSearchBox}
            alternativeCreateTypes={alternativeCreateTypes()}
            onClickAlternativeCreateType={onClickAlterntiveCreateType}
          />
        </div>
      </Show>
    </>
  );
}
