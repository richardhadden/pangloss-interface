import {
  BaseNodeDefinitionMap,
  ModelDefinitions,
  SemanticSpaceDefinitionMap,
  TEmbeddedFieldDefinition,
  TRelationFieldDefinition,
} from "../../../.model-configs/model-definitions";
import {
  AllModelTypesUnion,
  BaseNodeTypes,
  MultiKeyFieldTypes,
  ReifiedRelationTypes,
} from "../../../.model-configs/model-typescript";
import { EmbeddedField } from "./EmbeddedField";
import { TextField, TextAreaField } from "./LiteralFields";
import { RelationField } from "./RelationField";
import { For, JSXElement, Match, Show, Switch } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { useTranslation } from "~/contexts/translation";

type TFormRowProps = {
  children: JSXElement;
  rowLabel: JSXElement | string;
  alignLabel?: "middle" | "top";
};

const FormRow = (props: TFormRowProps) => {
  return (
    <div class="col-span-12 grid grid-cols-12 not-last:border-b not-last:border-b-slate-100 pb-12 pt-12 gap-x-6 gap-y-12">
      <div
        class="col-span-1 text-sm text-slate-700 uppercase font-semibold flex select-none"
        classList={{
          "items-center": !props.alignLabel || props.alignLabel === "middle",
          "items-start": props.alignLabel === "top",
        }}
      >
        {props.rowLabel}
      </div>
      <div class="col-span-11 grid grid-cols-10">{props.children}</div>
    </div>
  );
};

type TFormFieldsProps = {
  fieldNames: string[];
  modelName: keyof typeof ModelDefinitions;
  baseFormState: TBaseFormProps["baseFormState"];
  setBaseFormState: (value: any, ...path: (string | number)[]) => void;
  parentFieldDefinition: any;
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
        <FormRow rowLabel={"label"} alignLabel="middle">
          <TextAreaField
            value={props.baseFormState["label"]}
            onInput={(value) => props.setBaseFormState(value, "label")}
            placeholder="Label..."
          />
        </FormRow>
      </Show>
      <For each={props.fieldNames}>
        {(fieldName) => (
          <Switch
            fallback={
              <FormRow rowLabel={translateFieldName(fieldName)}>
                No field type yet
              </FormRow>
            }
          >
            <Match when={fieldDef(fieldName).metatype === "LiteralField"}>
              <FormRow rowLabel={translateFieldName(fieldName)}>
                Literal field
              </FormRow>
            </Match>
            <Match when={fieldDef(fieldName).metatype === "EmbeddedField"}>
              <FormRow rowLabel={translateFieldName(fieldName)}>
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
              <Show
                when={!(props.baseFormState.type in SemanticSpaceDefinitionMap)}
                fallback={
                  <>
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
                  </>
                }
              >
                <FormRow
                  rowLabel={translateFieldName(fieldName)}
                  alignLabel={
                    (fieldDef(fieldName) as TRelationFieldDefinition)
                      .createInline
                      ? "top"
                      : "middle"
                  }
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
                    parentFieldDefinition={
                      modelDefinition.fields[
                        fieldName
                      ] as TRelationFieldDefinition
                    }
                  />
                </FormRow>
              </Show>
            </Match>
            <Match when={fieldDef(fieldName).metatype === "ListField"}>
              <FormRow rowLabel={translateFieldName(fieldName)}>
                List field
              </FormRow>
            </Match>
            <Match when={fieldDef(fieldName).metatype === "EnumField"}>
              <FormRow rowLabel={translateFieldName(fieldName)}>
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
