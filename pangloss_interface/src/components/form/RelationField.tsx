import {
  BaseNodeDefinitionMap,
  IRelationToSemanticSpace,
  ModelDefinitions,
  SemanticSpaceDefinitionMap,
  TSubtypeHierarchy,
  type TRelationFieldDefinition,
} from "../../../.model-configs/model-definitions";
import {
  BaseNodeTypes,
  SemanticSpaceTypes,
} from "../../../.model-configs/model-typescript";
import { BaseForm } from "./BaseForm";
import { RelationToExistingField } from "./RelationToExistingField";
import { useFilter } from "@ark-ui/solid/locale";
import { BiRegularPlus } from "solid-icons/bi";
import { IoCloseSharp } from "solid-icons/io";
import {
  createSignal,
  ErrorBoundary,
  For,
  Index,
  JSXElement,
  Match,
  onMount,
  Show,
  Switch,
} from "solid-js";
import { unwrap } from "solid-js/store";
import { Portal } from "solid-js/web";
import { FormFields, getOrderFields } from "~/components/form/BaseForm";
import { TranslationKey, useTranslation } from "~/contexts/translation";
import { createBlankObject } from "~/utils/createBlankObject";

const InlineFormColours = {
  slate: {
    bar: "bg-slate-600 shadow-slate-600/40",
    container: "bg-slate-600/10 border-slate-400/20",
    hover: "hover:bg-slate-700/80",
  },
  zinc: {
    bar: "bg-zinc-600 shadow-zinc-600/40",
    container: "bg-zinc-600/10 border-zinc-400/20",
    hover: "hover:bg-zinc-700/80",
  },
  red: {
    bar: "bg-red-600/90 shadow-red-600/40",
    container: "bg-red-600/10 border-red-400/20 ",
    hover: "hover:bg-red-700/80",
  },
  amber: {
    bar: "bg-amber-600 shadow-amber-600/40",
    container: "bg-amber-600/10 border-amber-400/20",
    hover: "hover:bg-amber-700/80",
  },
  green: {
    bar: "bg-green-600 shadow-green-600/40",
    container: "bg-green-600/10 border-green-400/20",
    hover: "hover:bg-green-700/80",
  },
};

function getColour(modelType: keyof typeof ModelDefinitions) {
  const modelColour =
    InlineFormColours[
      ModelDefinitions[modelType].meta?.colour as keyof typeof InlineFormColours
    ] || InlineFormColours.slate;

  return modelColour;
}

type TInlineFormFieldWrapperProps = {
  children: JSXElement;
  modelLabel: string;
  modelType: keyof typeof ModelDefinitions;
  closeFunction?: () => void;
};

export function InlineFormFieldWrapper(props: TInlineFormFieldWrapperProps) {
  const modelMetatype = ModelDefinitions[props.modelType].meta.metatype;
  const padding =
    modelMetatype === "SemanticSpace" ? "px-4 pb-4 pt-3" : "px-10 pb-4 pt-3";
  const modelColour = getColour(props.modelType);
  return (
    <section
      class={
        "col-span-10 shadow-xl  rounded-xs not-first:mt-8 " +
        modelColour.container
      }
    >
      <header
        class={
          "w-full flex justify-between  h-8 text-slate-100 uppercase font-semibold  text-sm rounded-t-xs select-none shadow-sm " +
          modelColour.bar
        }
      >
        <div class="flex items-center pl-3">{props.modelLabel}</div>
        <div class=" grow"></div>
        <Show when={props.closeFunction}>
          <div>
            <button
              class="h-full aspect-square rounded-tr-xs bg-slate-300/50 flex justify-center items-center cursor-pointer hover:bg-slate-400/50 active:shadow-inner active:shadow-slate-500/40 group"
              onClick={props.closeFunction}
            >
              <div class="group-active:scale-85">
                <IoCloseSharp />
              </div>
            </button>
          </div>
        </Show>
      </header>
      <div class="px-4 pb-4 pt-3">{props.children}</div>
    </section>
  );
}

function getCloseFunction(
  value: any[],
  setValue: (value: any) => void,
  fieldDefinition: TRelationFieldDefinition,
  index: number,
): (() => void) | undefined {
  if (
    value.length === 1 &&
    fieldDefinition.validators.MinLen &&
    fieldDefinition.validators.MinLen === 1 &&
    Object.keys(value[0]).length > 0
  ) {
    return () => setValue([{}]);
  }
  if (value.length > 1) {
    return () => {
      setValue(value.filter((item, i) => i !== index));
    };
  }

  return undefined;
}

type TRelationFieldProps = {
  fieldDefinition: TRelationFieldDefinition;
  value: any[];
  setValue: (value: any, ...path: (string | number)[]) => void;
  parentFieldDefinition?: TRelationFieldDefinition;
};

function RelationField(props: TRelationFieldProps) {
  const [lang, { t }] = useTranslation();

  const modelColour = getColour(props.fieldDefinition?.fieldOnModel);

  return (
    <>
      <Switch fallback={<div>Field type missing</div>}>
        <Match when={props.fieldDefinition.createInline && props.value}>
          <For each={props.value}>
            {(item, index) => (
              <Show
                when={Object.keys(item).length !== 0}
                fallback={
                  <RelationFieldTypeSelectorWrapper
                    closeFunction={getCloseFunction(
                      props.value,
                      (value) => props.setValue(value),
                      props.fieldDefinition,
                      index(),
                    )}
                  >
                    <RelationFieldTypeSelector
                      fieldOnModel={
                        props.fieldDefinition
                          .fieldOnModel as keyof typeof ModelDefinitions
                      }
                      fieldDefinitionTypes={props.fieldDefinition.types}
                      onSelectType={(newModelInstance) => {
                        props.setValue(newModelInstance, index());
                      }}
                      value={props.value}
                      parentFieldDefinition={props.parentFieldDefinition}
                    />
                  </RelationFieldTypeSelectorWrapper>
                }
              >
                <InlineFormFieldWrapper
                  modelType={item.type as keyof typeof ModelDefinitions}
                  modelLabel={t[
                    item.type as BaseNodeTypes
                  ]._model.verboseName()}
                  closeFunction={getCloseFunction(
                    props.value,
                    (value) => props.setValue(value),
                    props.fieldDefinition,
                    index(),
                  )}
                >
                  <FormFields
                    modelName={item.type}
                    fieldNames={getOrderFields(item.type)}
                    baseFormState={item}
                    setBaseFormState={(value, ...path) =>
                      props.setValue(value, index(), ...path)
                    }
                    parentFieldDefinition={props.parentFieldDefinition}
                  />
                </InlineFormFieldWrapper>
              </Show>
            )}
          </For>
          <Show when={props.value.every((o) => o.type)}>
            <button
              class={
                "group cursor-pointer flex justify-start items-center mt-6 col-span-10 w-full shadow-sm rounded-xs h-8 " +
                modelColour.bar +
                " " +
                modelColour.hover
              }
              onClick={() => props.setValue([...props.value, {}])}
            >
              <div class="h-8 rounded-l-xs bg-slate-800/40 shadow-sm aspect-square flex items-center justify-center">
                <BiRegularPlus
                  color="white"
                  size="16"
                  class="inline group-active:scale-80"
                />{" "}
              </div>
              <span class="ml-4 uppercase text-xs font-semibold text-slate-100 group-active:scale-95">
                Add New
              </span>
            </button>
          </Show>
        </Match>
        <Match when={props.value && !props.fieldDefinition.createInline}>
          <RelationToExistingField />
        </Match>
      </Switch>
    </>
  );
}

function determineTopLevelTypes(types: (keyof typeof BaseNodeDefinitionMap)[]) {
  //console.log("DT", types);
  const supertypeArrays = types.map((t) => [
    ...ModelDefinitions[t].meta.supertypes.toReversed(),
    t,
  ]);
  //console.log("STArray", supertypeArrays);

  let checkedIndex = 0;
  while (true) {
    const nextValues = supertypeArrays.map((stArr) => stArr[checkedIndex]);

    //console.log("nextValues", checkedIndex, nextValues);

    if (nextValues.some((v) => v === undefined)) {
      return Array.from(
        new Set(supertypeArrays.map((stArr) => stArr[checkedIndex - 1])),
      );
    }

    if (!nextValues.every((v) => v == nextValues[checkedIndex])) {
      return Array.from(
        new Set(supertypeArrays.map((stArr) => stArr[checkedIndex])),
      );
    }
    checkedIndex++;
  }
}

function RelationFieldTypeSelectorWrapper(props: {
  children: JSXElement;
  closeFunction: (() => void) | undefined;
}) {
  return (
    <div class="col-span-10  bg-zinc-400/50 rounded-xs  pb-10 not-first:mt-8 shadow-xl">
      <div
        class={
          "w-full flex justify-between  h-8 text-slate-100 uppercase font-semibold  text-sm rounded-t-xs bg-slate-600 shadow-lg"
        }
      >
        <div class="flex items-center pl-3 select-none">Select a type</div>
        <div class=" grow"></div>
        <Show when={props.closeFunction}>
          <div>
            <button
              class="h-full aspect-square rounded-tr-xs bg-slate-300/50 flex justify-center items-center cursor-pointer hover:bg-slate-400/50 active:shadow-inner active:shadow-slate-600/50 group"
              onclick={props.closeFunction}
            >
              <div class="group-active:scale-85">
                <IoCloseSharp />
              </div>
            </button>
          </div>
        </Show>
      </div>

      {props.children}
    </div>
  );
}

type TRelationFieldTypeSelectorProps = {
  fieldOnModel?: keyof typeof ModelDefinitions;
  onSelectType: (newModel: object) => void;
  fieldDefinitionTypes: TRelationFieldProps["fieldDefinition"]["types"];
  value: any[];
  parentFieldDefinition?: TRelationFieldDefinition;
};

function RelationFieldTypeSelector(props: TRelationFieldTypeSelectorProps) {
  const [lang, { t }] = useTranslation();

  let baseNodeTypes: BaseNodeTypes[];

  // Get baseNodeTypes for selector; if we have a blank SemanticSpace, the fieldDefinition
  // metatype will be "RelationToTypeVar"; in which case, use the parent field definition
  // and lookup the basetypes from the SemanticSpace type;
  // otherwise, use the field definition types
  if (
    props.fieldDefinitionTypes[0].metatype === "RelationToTypeVar" &&
    props.parentFieldDefinition &&
    props.fieldOnModel
  ) {
    const thisRelationToSemanticSpace =
      props.parentFieldDefinition?.types.filter(
        (t) => t.metatype === "RelationToSemanticSpace",
      );
    baseNodeTypes = (
      thisRelationToSemanticSpace[0] as IRelationToSemanticSpace
    ).types[0].typeParamsToTypeMap[
      props.fieldDefinitionTypes[0].typeVarName
    ].types
      .filter((t: IRelationToSemanticSpace) => t.metatype === "RelationToNode")
      .map((t: IRelationToSemanticSpace) => t.type);
  } else {
    baseNodeTypes = props.fieldDefinitionTypes
      .filter((t) => t.metatype === "RelationToNode")
      .map((t) => t.type);
  }

  const topLevelBaseNodeTypes =
    baseNodeTypes.length > 0
      ? determineTopLevelTypes(
          baseNodeTypes as unknown as (keyof typeof BaseNodeDefinitionMap)[],
        ).sort()
      : [];

  const semanticSpaceTypes = props.fieldDefinitionTypes.filter(
    (t) => t.metatype === "RelationToSemanticSpace",
  );

  const ss = semanticSpaceTypes.flatMap((t) => t.types);

  const selectBaseNodeType = (baseNodeType: BaseNodeTypes) => {
    props.onSelectType(createBlankObject(baseNodeType, false));
  };

  const selectSemanticSpaceType = (
    semanticSpaceType: SemanticSpaceTypes,
    baseNodeModel: object,
  ) => {
    const semanticSpaceModel = createBlankObject(semanticSpaceType, false);
    semanticSpaceModel.contents = [baseNodeModel];
    props.onSelectType(semanticSpaceModel);
  };

  type TRecursiveSubtypeHierarchyProps<T extends BaseNodeTypes> = {
    subtypeHierarchy: TSubtypeHierarchy<T>;
    n: number;
  };

  function shouldDisable(type: BaseNodeTypes) {
    return (
      !baseNodeTypes.includes(type) || BaseNodeDefinitionMap[type].meta.abstract
    );
  }

  function RecurseSubtypeHierarchy<T extends BaseNodeTypes>(
    props: TRecursiveSubtypeHierarchyProps<T>,
  ): JSXElement {
    return (
      <>
        <For each={Object.entries(props.subtypeHierarchy)}>
          {([subtype, SH]) => (
            <Show
              when={
                baseNodeTypes.includes(subtype as BaseNodeTypes) ||
                BaseNodeDefinitionMap[
                  subtype as BaseNodeTypes
                ].meta.subtypes.some((t) => baseNodeTypes.includes(t))
              }
            >
              <button
                class="bg-slate-600 disabled:bg-slate-600/70 disabled:text-slate-100/70 disabled:cursor-auto disabled:hover:bg-slate-600/70 disabled:active:shadow-none flex justify-start last:rounded-b-xs py-2 px-3 box-content font-semibold uppercase text-slate-200 text-xs not-last:border-b-[0.5px] not-last:border-slate-400 select-none cursor-pointer hover:bg-slate-700 group active:shadow-inner active:shadow-slate-700 active:bg-slate-600"
                style={`margin-left: ${props.n + 1}rem`}
                onClick={() => selectBaseNodeType(subtype as BaseNodeTypes)}
                disabled={shouldDisable(subtype as BaseNodeTypes)}
              >
                <div
                  classList={{
                    "group-active:scale-[98%] group-hover:scale-[101%]":
                      !shouldDisable(subtype as BaseNodeTypes),
                  }}
                >
                  {
                    t[subtype as TranslationKey]._model
                      .verboseName as unknown as string
                  }{" "}
                </div>
              </button>
              <RecurseSubtypeHierarchy
                subtypeHierarchy={SH as TSubtypeHierarchy<T>}
                n={props.n + 1}
              />
            </Show>
          )}
        </For>
      </>
    );
  }

  return (
    <>
      <Show when={topLevelBaseNodeTypes.length > 0}>
        <div
          class="w-full h-fit flex gap-x-6"
          classList={{
            "p-10":
              props.fieldDefinitionTypes[0].metatype !== "RelationToTypeVar",
            "pt-10 px-10 pb-4":
              props.fieldDefinitionTypes[0].metatype === "RelationToTypeVar",
          }}
        >
          <For each={topLevelBaseNodeTypes}>
            {(topLevelType, index) => (
              <div class="flex flex-col">
                <button
                  class="bg-slate-600 disabled:bg-slate-600/70 disabled:text-slate-100/70 disabled:cursor-auto disabled:hover:bg-slate-600/70 disabled:active:shadow-none flex justify-start rounded-t-xs rounded-bl-xs py-2 px-3 box-content font-semibold uppercase text-slate-200 text-xs not-last:border-b-[0.5px] not-last:border-slate-400 select-none cursor-pointer hover:bg-slate-700 group active:shadow-inner active:shadow-slate-700 active:bg-slate-600"
                  onClick={() => selectBaseNodeType(topLevelType)}
                  disabled={shouldDisable(topLevelType)}
                >
                  <div
                    classList={{
                      "group-active:scale-[98%] group-hover:scale-[101%]":
                        !shouldDisable(topLevelType),
                    }}
                  >
                    {
                      t[topLevelType as TranslationKey]._model
                        .verboseName as unknown as string
                    }
                  </div>
                </button>
                <RecurseSubtypeHierarchy
                  subtypeHierarchy={
                    ModelDefinitions[topLevelType].meta.subtypeHierarchy
                  }
                  n={0}
                />
              </div>
            )}
          </For>
        </div>
      </Show>
      <For each={ss}>
        {(semanticSpaceType) => (
          <div class=" w-full h-fit flex gap-x-6 mt-10">
            <div
              class={
                "mx-10 w-full rounded-xs overflow-clip " +
                getColour(semanticSpaceType.baseType).container
              }
            >
              <div
                class={
                  "w-full uppercase text-xs text-red-100 py-2 px-3 rounded-t-xs font-semibold select-none shadow-sm " +
                  getColour(semanticSpaceType.baseType).bar
                }
              >
                {t[semanticSpaceType.baseType]._model.verboseName()}
              </div>

              <RelationFieldTypeSelector
                fieldDefinitionTypes={
                  semanticSpaceType.typeParamsToTypeMap[
                    Object.keys(semanticSpaceType.typeParamsToTypeMap)[0]
                  ].types
                }
                onSelectType={(baseNodeModel) =>
                  selectSemanticSpaceType(
                    semanticSpaceType.baseType as unknown as SemanticSpaceTypes,
                    baseNodeModel as unknown as object,
                  )
                }
                value={props.value}
              />
            </div>
          </div>
        )}
      </For>
    </>
  );
}

export { RelationField };
