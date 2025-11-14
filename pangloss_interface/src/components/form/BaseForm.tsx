import { apiClient } from "~/apiClient";
import {
  BaseNodeDefinitionMap,
  ModelDefinitions,
  ReifiedRelationsDefinitionMap,
  SemanticSpaceDefinitionMap,
  TEmbeddedFieldDefinition,
  TLiteralFieldDefinition,
  TRelationFieldDefinition,
} from "../../../.model-configs/model-definitions";
import {
  AllModelTypes,
  AllModelTypesUnion,
  BaseNodeTypes,
  MultiKeyFieldTypes,
  ReifiedRelationTypes,
} from "../../../.model-configs/model-typescript";
import { EmbeddedField } from "./EmbeddedField";
import { TextField, TextAreaField, NumberField } from "./LiteralFields";
import { RelationField } from "./RelationField";
import { RenderReifiedRelation } from "./RelationToExistingField";
import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  JSXElement,
  Match,
  Show,
  Switch,
} from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { useTranslation } from "~/contexts/translation";
import { ImCross } from "solid-icons/im";

type TExistingSuggestionsProps = {
  type: keyof typeof ModelDefinitions;
  label: string | null;
};

const ExistingSuggestions = (props: TExistingSuggestionsProps) => {
  const [lang, { t }] = useTranslation();
  const [existingMatches, setExistingMatches] = createSignal([]);
  const [ignore, setIgnore] = createSignal(false);

  createEffect(async () => {
    if (props.label && props.label.length > 5) {
      const data = await apiClient.list(props.type, { q: props.label });
      setExistingMatches(data.results);
    } else if (!props.label || (props.label && props.label.length == 0)) {
      setIgnore(false);
    }
  });

  return (
    <Show
      when={
        props.label &&
        props.label.length > 5 &&
        existingMatches() &&
        existingMatches().length > 0 &&
        !ignore()
      }
    >
      <div class="col-span-10 flex h-fit w-full items-center rounded-b-xs bg-slate-500/40 p-2">
        <div class="flex items-center">
          <span class="relative mr-2 text-xs text-slate-600">
            Possible duplicate<Show when={existingMatches().length > 1}>s</Show>
          </span>

          <For each={existingMatches().slice(0, 3)}>
            {(match) => (
              <button class="mr-2 flex rounded-xs bg-zinc-400 bg-blend-normal backdrop-blur-none">
                <div class="border-right-slate-500 flex items-center justify-center rounded-l-xs border-r-[0.5px] bg-slate-600 px-3 py-2 text-xs font-semibold text-nowrap text-slate-100 uppercase">
                  {t[match.type as TranslationKey]._model.verboseName()}
                </div>
                <div class="p-2 pl-3 text-sm">{match.label}</div>
              </button>
            )}
          </For>
        </div>
        <div class="grow-1" />
        <div>
          <button
            class="group flex aspect-square h-10 cursor-pointer items-center justify-center rounded-xs bg-red-700/60 text-white shadow-2xl shadow-red-700/70 hover:bg-red-800/60 active:bg-red-700/60 active:shadow-inner active:shadow-red-900/50"
            onClick={(e) => {
              e.preventDefault();
              e.stopImmediatePropagation();
              e.stopPropagation();
              setIgnore(true);
            }}
          >
            <ImCross size={12} class="group-active:scale-95" />
          </button>
        </div>
      </div>
    </Show>
  );
};

type TFormRowProps = {
  children: JSXElement;
  rowLabel: JSXElement | string;
  alignLabel?: "middle" | "top";
  style?: "small" | "unstyled";
  labelStyle?: string;
  fieldContainerStyle?: string;
};

const FormRow = (props: TFormRowProps) => {
  return (
    <Switch
      fallback={
        <div class="col-span-12 grid grid-cols-12 gap-x-6 gap-y-12 pt-12 pb-12 not-last:border-b not-last:border-b-slate-100">
          <div
            class="col-span-1 flex text-sm font-semibold text-slate-700 uppercase select-none"
            classList={{
              "items-center":
                !props.alignLabel || props.alignLabel === "middle",
              "items-start": props.alignLabel === "top",
            }}
          >
            {props.rowLabel}
          </div>
          <div class="col-span-11 grid grid-cols-10">{props.children}</div>
        </div>
      }
    >
      <Match when={props.style === "unstyled"}>
        <div class={props.labelStyle}>{props.rowLabel}</div>
        <div class={props.fieldContainerStyle}>{props.children}</div>
      </Match>
      <Match when={props.style === "small"}>
        <div class="grid grid-cols-6 gap-y-1 pt-2 pb-2 not-last:border-b not-last:border-b-slate-100">
          <div class="col-span-6 flex text-xs font-semibold text-slate-700 uppercase select-none">
            {props.rowLabel}
          </div>
          <div class="col-span-6">{props.children}</div>
        </div>
      </Match>
    </Switch>
  );
};

type TFormFieldsProps = {
  fieldNames: string[];
  modelName: keyof typeof ModelDefinitions;
  baseFormState: TBaseFormProps["baseFormState"];
  setBaseFormState: (value: any, ...path: (string | number)[]) => void;
  parentFieldDefinition: any;
  style?: TFormRowProps["style"];
  labelStyle?: TFormRowProps["labelStyle"];
  fieldContainerStyle: TFormRowProps["fieldContainerStyle"];
};

export const FormFields = (props: TFormFieldsProps) => {
  const [lang, { t }] = useTranslation();

  const modelDefinition = ModelDefinitions[props.modelName];
  const fieldDef = (fieldName: string) => {
    return modelDefinition.fields[fieldName];
  };

  const translateFieldName = (fieldName: string) => {
    return t[props.modelName][fieldName].verboseName;
  };

  return (
    <>
      <Show when={props.baseFormState && "label" in props.baseFormState}>
        <FormRow
          rowLabel={"label"}
          alignLabel="middle"
          style={props.style}
          labelStyle={props.labelStyle}
          fieldContainerStyle={props.fieldContainerStyle}
        >
          <TextAreaField
            value={props.baseFormState["label"]}
            onInput={(value) => props.setBaseFormState(value, "label")}
            placeholder="Label..."
          />
          <Show
            when={
              ModelDefinitions[props.modelName as keyof typeof ModelDefinitions]
                .meta.suggestDuplicates
            }
          >
            <ExistingSuggestions
              label={props.baseFormState["label"]}
              type={props.modelName}
            />
          </Show>
        </FormRow>
      </Show>
      <For each={props.fieldNames}>
        {(fieldName) => (
          <Switch
            fallback={
              <FormRow
                rowLabel={translateFieldName(fieldName)}
                style={props.style}
                labelStyle={props.labelStyle}
                fieldContainerStyle={props.fieldContainerStyle}
              >
                No field type yet
              </FormRow>
            }
          >
            <Match
              when={
                fieldDef(fieldName).metatype === "LiteralField" &&
                (fieldDef(fieldName) as TLiteralFieldDefinition).type ===
                  "string"
              }
            >
              <FormRow
                rowLabel={translateFieldName(fieldName)}
                style={props.style}
                labelStyle={props.labelStyle}
                fieldContainerStyle={props.fieldContainerStyle}
              >
                <TextField
                  value={props.baseFormState[fieldName]}
                  onInput={(value) => props.setBaseFormState(value, fieldName)}
                  class="w-full"
                />
              </FormRow>
            </Match>
            <Match
              when={
                fieldDef(fieldName).metatype === "LiteralField" &&
                (fieldDef(fieldName) as TLiteralFieldDefinition).type ===
                  "float"
              }
            >
              <FormRow
                rowLabel={translateFieldName(fieldName)}
                style={props.style}
                labelStyle={props.labelStyle}
                fieldContainerStyle={props.fieldContainerStyle}
              >
                <NumberField
                  value={props.baseFormState[fieldName]}
                  onInput={(value) => props.setBaseFormState(value, fieldName)}
                />
              </FormRow>
            </Match>

            <Match when={fieldDef(fieldName).metatype === "EmbeddedField"}>
              <FormRow
                rowLabel={translateFieldName(fieldName)}
                style={props.style}
                labelStyle={props.labelStyle}
                fieldContainerStyle={props.fieldContainerStyle}
              >
                <EmbeddedField
                  fieldDefinition={
                    modelDefinition.fields[
                      fieldName
                    ] as TEmbeddedFieldDefinition
                  }
                  value={props.baseFormState[fieldName]}
                  setValue={(value, ...path) => {
                    props.setBaseFormState(value, fieldName, ...path);
                  }}
                  parentFieldDefinition={
                    modelDefinition.fields[
                      fieldName
                    ] as TRelationFieldDefinition
                  }
                />
              </FormRow>
            </Match>

            <Match when={fieldDef(fieldName).metatype === "RelationField"}>
              <Switch
                fallback={
                  <FormRow
                    rowLabel={translateFieldName(fieldName)}
                    alignLabel={
                      (fieldDef(fieldName) as TRelationFieldDefinition)
                        .createInline
                        ? "top"
                        : "middle"
                    }
                    style={props.style}
                    labelStyle={props.labelStyle}
                    fieldContainerStyle={props.fieldContainerStyle}
                  >
                    <RelationField
                      fieldName={fieldName}
                      fieldDefinition={
                        modelDefinition.fields[
                          fieldName
                        ] as TRelationFieldDefinition
                      }
                      value={props.baseFormState[fieldName]}
                      setValue={(value, ...path) => {
                        props.setBaseFormState(value, fieldName, ...path);
                      }}
                      parentFieldDefinition={
                        modelDefinition.fields[
                          fieldName
                        ] as TRelationFieldDefinition
                      }
                    />
                  </FormRow>
                }
              >
                <Match
                  when={props.baseFormState.type in SemanticSpaceDefinitionMap}
                >
                  <RelationField
                    fieldDefinition={
                      modelDefinition.fields[
                        fieldName
                      ] as TRelationFieldDefinition
                    }
                    value={props.baseFormState[fieldName]}
                    setValue={(value, ...path) => {
                      props.setBaseFormState(value, fieldName, ...path);
                    }}
                    parentFieldDefinition={props.parentFieldDefinition}
                  />
                </Match>
              </Switch>
            </Match>
            <Match when={fieldDef(fieldName).metatype === "ListField"}>
              <FormRow
                rowLabel={translateFieldName(fieldName)}
                style={props.style}
                labelStyle={props.labelStyle}
                fieldContainerStyle={props.fieldContainerStyle}
              >
                List field
              </FormRow>
            </Match>
            <Match when={fieldDef(fieldName).metatype === "EnumField"}>
              <FormRow
                rowLabel={translateFieldName(fieldName)}
                style={props.style}
                labelStyle={props.labelStyle}
                fieldContainerStyle={props.fieldContainerStyle}
              >
                Enum field
              </FormRow>
            </Match>
          </Switch>
        )}
      </For>
    </>
  );
};

type TBaseFormProps = {
  formFor: keyof typeof ModelDefinitions;
  baseFormState: object;
  setBaseFormState: SetStoreFunction<object>;
};

const BaseForm = (props: TBaseFormProps) => {
  const setFormValue = (value: any, ...path: (string | number)[]) => {
    console.log("SETTING", path, value);
    props.setBaseFormState(...(path as []), value);
  };

  const modelDefinition = ModelDefinitions[props.formFor];

  return (
    <div class="grid grid-cols-12">
      <FormFields
        fieldNames={modelDefinition.meta.orderFields}
        modelName={props.formFor}
        baseFormState={props.baseFormState}
        setBaseFormState={setFormValue}
      />
    </div>
  );
};

export function getOrderFields(item_type: keyof typeof ModelDefinitions) {
  if (item_type in BaseNodeDefinitionMap) {
    return ModelDefinitions[item_type as BaseNodeTypes].meta.orderFields;
  }
  if (item_type in SemanticSpaceDefinitionMap) {
    return ["contents"];
  }
  return [];
}

export { BaseForm };
