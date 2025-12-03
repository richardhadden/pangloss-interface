import {
  BaseNodeDefinitionMap,
  ModelDefinitions,
  ReifiedRelationsDefinitionMap,
  TRelationDefinition,
  TRelationFieldDefinition,
} from "../../../.model-configs/model-definitions";
import {
  type BaseNodeTypes,
  type EdgeModelTypes,
  type ReifiedRelationTypes,
} from "../../../.model-configs/model-typescript";
import { FormFields } from "./BaseForm";

import {
  BiRegularCollapse,
  BiRegularExpand,
  BiRegularCut,
  BiRegularCopy,
  BiRegularPaste,
} from "solid-icons/bi";
import { IoCloseSharp } from "solid-icons/io";
import { createEffect, createSignal, For, Match, Show, Switch } from "solid-js";

import colors from "tailwindcss/colors";

import { TranslationKey, useTranslation } from "~/contexts/translation";
import { createBlankObject } from "~/utils/createBlankObject";

import {
  AutocompleteSelector,
  TSelectionOptions,
} from "./AutocompleteSelector";

import { scratchboard } from "./Scratchboard";
import { unwrap } from "solid-js/store";
import { deepEqual } from "~/utils/deepEquals";

type TRenderBaseSelectedItemProps = { item: any; onRemove: () => void };

export function RenderBaseSelectedItem(props: TRenderBaseSelectedItemProps) {
  const [lang, { t }] = useTranslation();
  return (
    <div class="flex-start flex h-fit w-fit rounded-xs bg-zinc-300 shadow-2xl">
      <div class="flex items-center rounded-l-xs bg-slate-600 px-3 py-2 text-xs font-semibold text-nowrap text-slate-100 uppercase select-none">
        {t[props.item.type as TranslationKey]._model.verboseName()}
      </div>
      <div class="flex w-fit flex-nowrap items-center pr-4 pl-4 text-sm">
        {props.item.label}
      </div>
      <button
        onclick={(e) => scratchboard.cut(props.item, props.onRemove)}
        class="group flex aspect-square h-10 cursor-pointer items-center justify-center bg-slate-500/70 hover:bg-slate-500/80 active:bg-slate-500/80 active:shadow-inner active:shadow-slate-600/30"
      >
        <BiRegularCut
          color={colors.slate["100"]}
          class="group-active:scale-95"
          size={14}
        />
      </button>
      <button
        onclick={(e) => scratchboard.copy(props.item)}
        class="group flex aspect-square h-10 cursor-pointer items-center justify-center bg-slate-500/70 hover:bg-slate-500/80 active:bg-slate-500/80 active:shadow-inner active:shadow-slate-600/30"
      >
        <BiRegularCopy
          color={colors.slate["100"]}
          class="group-active:scale-95"
          size={14}
        />
      </button>
      <button
        onClick={(e) => {
          e.stopImmediatePropagation();
          e.preventDefault();
          props.onRemove();
        }}
        class="group flex aspect-square h-10 cursor-pointer items-center justify-center rounded-r-xs bg-orange-500/70 hover:bg-orange-500/80 active:bg-orange-500/80 active:shadow-inner active:shadow-slate-600/30"
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
      <div class="flex-start flex h-fit w-full rounded-t-xs bg-zinc-300 shadow-2xl">
        <div class="flex items-center rounded-tl-xs bg-slate-600 px-3 py-2 text-xs font-semibold text-nowrap text-slate-100 uppercase select-none">
          {t[props.item.type as TranslationKey]._model.verboseName()}
        </div>
        <div class="flex w-fit flex-nowrap items-center pr-4 pl-4 text-sm">
          {props.item.label}
        </div>
        <div class="grow" />
        <button
          onclick={(e) => scratchboard.cut(props.item, props.onRemove)}
          class="group flex aspect-square h-10 cursor-pointer items-center justify-center bg-slate-500/70 hover:bg-slate-500/80 active:bg-slate-500/80 active:shadow-inner active:shadow-slate-600/30"
        >
          <BiRegularCut
            color={colors.slate["100"]}
            class="group-active:scale-95"
            size={14}
          />
        </button>
        <button
          onclick={(e) => scratchboard.copy(props.item)}
          class="group flex aspect-square h-10 cursor-pointer items-center justify-center bg-slate-500/70 hover:bg-slate-500/80 active:bg-slate-500/80 active:shadow-inner active:shadow-slate-600/30"
        >
          <BiRegularCopy
            color={colors.slate["100"]}
            class="group-active:scale-95"
            size={14}
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            props.onRemove();
          }}
          class="group flex aspect-square h-10 cursor-pointer items-center justify-center rounded-tr-xs bg-orange-500/70 hover:bg-orange-500/80 active:bg-orange-500/80 active:shadow-inner active:shadow-slate-600/30"
        >
          <IoCloseSharp
            color={colors.slate["100"]}
            class="group-active:scale-95"
            size={18}
          />
        </button>
      </div>
      <div class="flex h-fit w-full rounded-b-xs bg-slate-400 px-2 py-2">
        <FormFields
          fieldNames={Object.keys(ModelDefinitions[props.edgeModelType].fields)}
          modelName={props.edgeModelType}
          baseFormState={props.item.edgeProperties}
          setBaseFormState={(value, ...path) =>
            props.setValue(value, "edgeProperties", ...path)
          }
          style="unstyled"
          labelStyle="max-w-fit mr-4 text-slate-700 text-xs uppercase font-semibold flex items-center"
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
  const [lang, { t }] = useTranslation();

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
        <div class="box-border h-fit overflow-clip rounded-xs bg-slate-300/50 shadow-slate-700/30">
          {/** This is the fully-expanded version */}
          <div class="flex h-fit items-center justify-start overflow-clip bg-slate-500 text-xs font-semibold text-slate-100 uppercase select-none">
            <Show
              when={
                shouldCollapseFunc &&
                shouldCollapseFunc(props.item) &&
                !collapse()
              }
              fallback={
                <span class="flex h-10 items-center rounded-tl-xs bg-slate-500 px-3 text-xs font-medium uppercase">
                  {t[
                    props.item.type as TranslationKey
                  ]._model.verboseName()}{" "}
                </span>
              }
            >
              <button
                class="group flex h-10 cursor-pointer items-center justify-center rounded-tl-xs bg-slate-500 py-3 font-semibold text-slate-200 hover:bg-slate-500/90"
                onclick={() => setCollapse(true)}
              >
                <BiRegularCollapse
                  color={colors.slate["100"]}
                  class="ml-2 group-active:scale-95"
                  size={18}
                />
                <span class="flex h-full items-center rounded-l-xs pr-3 pl-2 text-xs font-medium uppercase">
                  {t[props.item.type as TranslationKey]._model.verboseName()}
                </span>
              </button>
            </Show>

            <span class="flex h-10 items-center rounded-l-xs bg-slate-600 px-4 py-2 text-xs font-semibold text-nowrap text-slate-100 uppercase shadow-md shadow-slate-600 select-none">
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
              onclick={(e) => scratchboard.cut(props.item, props.onRemove)}
              class="group flex aspect-square h-10 cursor-pointer items-center justify-center bg-slate-500/70 hover:bg-slate-600/50 active:bg-slate-500/80 active:shadow-inner active:shadow-slate-600/30"
            >
              <BiRegularCut
                color={colors.slate["100"]}
                class="group-active:scale-95"
                size={14}
              />
            </button>
            <button
              onclick={(e) => scratchboard.copy(props.item)}
              class="group flex aspect-square h-10 cursor-pointer items-center justify-center bg-slate-500/70 hover:bg-slate-600/50 active:bg-slate-500/80 active:shadow-inner active:shadow-slate-600/30"
            >
              <BiRegularCopy
                color={colors.slate["100"]}
                class="group-active:scale-95"
                size={14}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                props.onRemove();
              }}
              class="group flex aspect-square h-10 cursor-pointer items-center justify-center rounded-tr-xs bg-slate-500/70 hover:bg-slate-600/50 active:bg-slate-500/80 active:shadow-inner active:shadow-slate-600/30"
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
                    <div class="mt-6 flex h-8 items-center bg-slate-500 pl-2 text-xs font-semibold text-slate-100 uppercase select-none">
                      {fieldName}
                    </div>
                  </Show>
                  <div class="mt-2 px-2 pt-2 pb-2">
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
          <div class="mt-6 bg-slate-500/70 px-2">
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
            <div class="flex w-full rounded-b-xs bg-slate-400 px-2 py-2">
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
                labelStyle="max-w-fit text-slate-700 text-xs uppercase font-semibold flex items-center"
                fieldContainerStyle=""
              />
            </div>
          </Show>
        </div>
      }
    >
      <div>
        <div class="flex h-fit items-center overflow-clip rounded-t-xs">
          <button
            class="group flex cursor-pointer items-center justify-center rounded-tl-xs bg-slate-500 py-3 font-semibold text-slate-200 hover:bg-slate-500/90"
            onclick={() => setCollapse(false)}
          >
            <BiRegularExpand class="ml-2 group-active:scale-95" />
            <span class="flex h-full items-center rounded-l-xs pr-3 pl-2 text-xs font-medium uppercase">
              {props.item.type}
            </span>
          </button>

          <For each={props.item.target}>
            {(item, index) => (
              <div class="flex-start flex h-fit w-full bg-slate-500 shadow-md shadow-slate-600">
                <div class="flex items-center rounded-l-xs bg-slate-600 px-4 py-2 text-xs font-semibold text-nowrap text-slate-100 uppercase select-none">
                  {t[item.type as TranslationKey]._model.verboseName()}
                </div>
                <div class="flex w-fit flex-nowrap items-center bg-zinc-300 pr-6 pl-6 text-sm">
                  {item.label}
                </div>
                <div class="grow" />
                <button
                  onclick={(e) => scratchboard.cut(item, props.onRemove)}
                  class="group flex aspect-square h-10 cursor-pointer items-center justify-center bg-slate-500/70 hover:bg-slate-600/50 active:bg-slate-500/80 active:shadow-inner active:shadow-slate-600/30"
                >
                  <BiRegularCut
                    color={colors.slate["100"]}
                    class="group-active:scale-95"
                    size={14}
                  />
                </button>
                <button
                  onclick={(e) => scratchboard.copy(item)}
                  class="group flex aspect-square h-10 cursor-pointer items-center justify-center bg-slate-500/70 hover:bg-slate-600/50 active:bg-slate-500/80 active:shadow-inner active:shadow-slate-600/30"
                >
                  <BiRegularCopy
                    color={colors.slate["100"]}
                    class="group-active:scale-95"
                    size={14}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    props.onRemove();
                  }}
                  class="group flex aspect-square h-10 cursor-pointer items-center justify-center rounded-tr-xs bg-orange-500/70 hover:bg-orange-500/80 active:bg-orange-500/80 active:shadow-inner active:shadow-slate-600/30"
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
          <div class="flex w-full shrink rounded-b-xs bg-slate-400 px-2 py-2">
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
              labelStyle="max-w-fit mr-4 text-slate-700 text-xs uppercase font-semibold flex items-center"
              fieldContainerStyle=""
            />
          </div>
        </Show>
      </div>
    </Show>
  );
}

function recursiveGetSelectedIds(
  values: (
    | { id: string; type: string }
    | { id: string; type: string; target: any }
  )[],
): string[] {
  const selectedObjectIds = [];
  for (let obj of unwrap(values)) {
    if (obj.type in BaseNodeDefinitionMap) {
      selectedObjectIds.push(obj.id);
    } else if (obj.type in ReifiedRelationsDefinitionMap && "target" in obj) {
      selectedObjectIds.push(...recursiveGetSelectedIds(unwrap(obj.target)));
    }
  }
  return selectedObjectIds;
}

function generateLabelForReifiedRelation(item) {
  const [lang, { t }] = useTranslation();

  return (
    <div class="flex w-fit">
      <For each={item.target}>
        {(target) => (
          <div class="flex flex-row items-center">
            <Show when={target.type && target.type in BaseNodeDefinitionMap}>
              <div class="flex-start mr-1 flex h-fit w-fit rounded-xs bg-zinc-400/50 shadow-2xl">
                <div class="flex items-center rounded-l-xs bg-slate-600/50 px-3 py-2 text-[10px] font-semibold text-nowrap text-slate-100/70 uppercase select-none">
                  {t[target.type as TranslationKey]._model.verboseName()}
                </div>
                <div class="flex w-fit flex-nowrap items-center pr-4 pl-4 text-[10px]">
                  {target.label}
                </div>
              </div>
            </Show>
            <Show when={target.type in ReifiedRelationsDefinitionMap}>
              {generateLabelForReifiedRelation(target)}
            </Show>
          </div>
        )}
      </For>
      <For
        each={Object.entries(
          ModelDefinitions[item.type as keyof typeof ModelDefinitions].fields,
        )}
      >
        {([fieldName, field]) => (
          <>
            <Show
              when={
                fieldName !== "target" && field.metatype === "RelationField"
              }
            >
              <div class="ml-4 flex items-center px-2">
                <span class="mr-2 text-[10px] font-semibold text-slate-600/50 uppercase">
                  {fieldName}
                </span>
                <For each={item[fieldName]}>
                  {(f) => generateLabelForReifiedRelation(f)}
                </For>
              </div>
            </Show>

            <Show
              when={
                fieldName !== "target" &&
                field.metatype === "LiteralField" &&
                item[fieldName]
              }
            >
              <div class="align-center flex w-fit flex-nowrap items-center pr-4 pl-4 text-[10px] font-semibold text-slate-600/50 uppercase">
                {t[item.type as TranslationKey][fieldName].verboseName}
              </div>
              <div class="flex items-center rounded-sm bg-zinc-400/30 p-2 text-slate-600/50">
                {item[fieldName].toString()}
              </div>
            </Show>
          </>
        )}
      </For>
    </div>
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
  const [lang, { t }] = useTranslation();
  const typeInContextTypeVarName = props.fieldDefinition.types[0].typeVarName;

  function getTypesInContext() {
    if (props.typesInContext && props.typesInContext.length > 0) {
      console.log("props.typesInContext", props.typesInContext);
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

  const defaultSearchTypes =
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
      props.setValue([...props.value, item]);
    }
  }

  function onRemove(index: number) {
    props.setValue(
      props.value.filter((item: any, idx: number) => idx !== index),
    );
  }

  function alternativeCreateTypes() {
    if (props.typesInContext) {
      const typesInContext =
        props.typesInContext[0].typeParamsToTypeMap[typeInContextTypeVarName]
          .types;

      const fieldDefTypes = typesInContext.map((t) => t.type).sort();

      const types = new Set([...fieldDefTypes, ...defaultSearchTypes]);
      return [...types];
    } else {
      const fieldDefTypes = props.fieldDefinition.types
        .map((t) => t.type)
        .sort();

      const types = new Set([
        ...props.fieldDefinition.defaultSearchType.sort(),
        ...fieldDefTypes,
      ]);
      return [...types];
    }
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

  const allAllowedTypes = [...defaultSearchTypes, ...alternativeCreateTypes()];

  function onPaste(item: any) {
    console.log("pasted", item);
    if (defaultSearchTypes.includes(item.type)) {
      onSelect(item);
    } else {
      props.setValue([...props.value, item]);
    }
  }

  function selectedIds(): Set<string> {
    return new Set(recursiveGetSelectedIds(props.value));
  }

  return (
    <>
      <Show when={props.value.length > 0}>
        <div class="col-span-10 mb-2 flex flex-row flex-wrap gap-x-4 gap-y-6">
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
          scratchboard.items() &&
          scratchboard.items().length > 0 &&
          !(
            props.fieldDefinition.validators.MaxLen &&
            props.value.length === props.fieldDefinition.validators.MaxLen
          )
        }
      >
        <div class="col-span-10 mt-4">
          <For each={scratchboard.items()}>
            {(item, index) => (
              <Show
                when={
                  ((item.id && !selectedIds().has(item.id)) ||
                    (!item.id &&
                      !props.value.some((i) => deepEqual(i, item)))) &&
                  allAllowedTypes.includes(item.type)
                }
              >
                <div class="mb-2 flex overflow-clip rounded-xs">
                  <div class="flex">
                    <div class="flex w-fit flex-row bg-zinc-300/60 shadow-2xl">
                      <div class="flex items-center bg-slate-600/60 px-3 py-2 text-xs font-semibold text-nowrap text-slate-100 uppercase select-none">
                        {t[item.type as TranslationKey]._model.verboseName()}
                      </div>

                      <Show
                        when={item.type in BaseNodeDefinitionMap}
                        fallback={
                          <div class="flex w-fit flex-nowrap items-center pr-2 pl-2 text-sm text-black/60 select-none">
                            {generateLabelForReifiedRelation(item)}
                          </div>
                        }
                      >
                        <div class="flex w-fit flex-nowrap items-center pr-4 pl-4 text-sm text-black/60 select-none">
                          {item.label}
                        </div>
                      </Show>
                    </div>
                  </div>
                  <button
                    class="group flex aspect-square h-10 cursor-pointer items-center justify-center rounded-r-xs bg-green-500/80 hover:bg-green-500/90 active:bg-green-500/80 active:shadow-inner active:shadow-slate-600/30"
                    onclick={() => onPaste(item)}
                  >
                    <BiRegularPaste color="white" size={14} />
                  </button>
                </div>
              </Show>
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
        <div class="col-span-10 mt-2">
          <AutocompleteSelector
            selectionTypes={defaultSearchTypes as BaseNodeTypes[]}
            onSelect={onSelect}
            selectedItems={props.value}
            selectedIds={selectedIds()}
            searchBoxVisible={props.showSearchBox}
            alternativeCreateTypes={alternativeCreateTypes()}
            onClickAlternativeCreateType={onClickAlterntiveCreateType}
          />
        </div>
      </Show>
    </>
  );
}
