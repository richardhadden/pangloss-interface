import {
  BaseNodeDefinitionMap,
  ModelDefinitions,
} from "../../../.model-configs/model-definitions";
import {
  AllModelTypesUnion,
  BaseNodeTypes,
  MultiKeyFieldTypes,
  ReifiedRelationTypes,
} from "../../../.model-configs/model-typescript";
import { TextField, TextAreaField } from "./LiteralFields";
import { RelationField } from "./RelationField";
import { For, JSXElement, Match, Show, Switch } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { useTranslation } from "~/contexts/translation";

type TFormRowProps = {
  children: JSXElement;
  rowLabel: JSXElement | string;
};

const FormRow = (props: TFormRowProps) => {
  return (
    <div class="col-span-12 grid grid-cols-12 not-last:border-b not-last:border-b-slate-100 pb-12 pt-12">
      <div class="col-span-2 text-sm text-slate-700 uppercase font-semibold flex items-center">
        {props.rowLabel}
      </div>
      <div class="col-span-10 grid grid-cols-10">{props.children}</div>
    </div>
  );
};

type TFormFieldsProps = {
  fieldNames: string[];
  modelName: keyof typeof ModelDefinitions;

  baseFormState: TBaseFormProps["baseFormState"];
  setBaseFormState: (value: any, ...path: (string | number)[]) => void;
};

const FormFields = (props: TFormFieldsProps) => {
  const [lang, { t }] = useTranslation();

  const modelDefinition = ModelDefinitions[props.modelName];
  const fieldDef = (fieldName: string) => {
    return modelDefinition.fields[fieldName];
  };

  const fieldLabel = (fieldName: string) => {
    return t[props.modelName][fieldName].verboseName;
  };

  return (
    <For each={props.fieldNames}>
      {(fieldName) => (
        <Switch
          fallback={
            <FormRow rowLabel={fieldLabel(fieldName)}>
              No field type yet
            </FormRow>
          }
        >
          <Match when={fieldDef(fieldName).metatype === "LiteralField"}>
            <FormRow rowLabel={fieldLabel(fieldName)}>Literal field</FormRow>
          </Match>
          <Match when={fieldDef(fieldName).metatype === "EmbeddedField"}>
            <FormRow rowLabel={fieldLabel(fieldName)}>Embedded field</FormRow>
          </Match>
          <Match when={fieldDef(fieldName).metatype === "RelationField"}>
            <FormRow rowLabel={fieldLabel(fieldName)}>
              <RelationField />
            </FormRow>
          </Match>
          <Match when={fieldDef(fieldName).metatype === "ListField"}>
            <FormRow rowLabel={fieldLabel(fieldName)}>List field</FormRow>
          </Match>
          <Match when={fieldDef(fieldName).metatype === "EnumField"}>
            <FormRow rowLabel={fieldLabel(fieldName)}>Enum field</FormRow>
          </Match>
        </Switch>
      )}
    </For>
  );
};

type TBaseFormProps = {
  formFor: keyof typeof ModelDefinitions;
  baseFormState: object;
  setBaseFormState: SetStoreFunction<object>;
};

const BaseForm = (props: TBaseFormProps) => {
  const setFormValue = (value: any, ...path: (string | number)[]) => {
    props.setBaseFormState(...(path as []), value);
  };

  const modelDefinition = ModelDefinitions[props.formFor];

  return (
    <div class="grid grid-cols-12">
      <FormRow rowLabel={"label"}>
        <TextAreaField
          value={props.baseFormState["label"]}
          onInput={(value) => setFormValue(value, "label")}
        />
      </FormRow>
      <FormFields
        fieldNames={modelDefinition.meta.orderFields}
        modelName={props.formFor}
        baseFormState={props.baseFormState}
        setBaseFormState={setFormValue}
      />
    </div>
  );
};

export { BaseForm };
