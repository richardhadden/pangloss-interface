import {
  TEmbeddedFieldDefinition,
  TRelationFieldDefinition,
} from "../../../.model-configs/model-definitions";
import { FormFields, getOrderFields } from "./BaseForm";
import { InlineFormFieldWrapper } from "./RelationField";
import { Switch, Match, For } from "solid-js";
import { TranslationKey, useTranslation } from "~/contexts/translation";

type TEmbeddedFieldProps = {
  fieldDefinition: TEmbeddedFieldDefinition;
  value: any[];
  setValue: (value: any, ...path: (string | number)[]) => void;
  parentFieldDefinition?: TRelationFieldDefinition;
};

export function EmbeddedField(props: TEmbeddedFieldProps) {
  const [lang, { t }] = useTranslation();
  return (
    <>
      <Switch fallback={<>No embedded match yet</>}>
        <Match when={props.value}>
          <For each={props.value}>
            {(item, index) => (
              <InlineFormFieldWrapper
                modelLabel={t[item.type as TranslationKey]._model.verboseName()}
                modelType={item.type}
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
            )}
          </For>
        </Match>
      </Switch>
    </>
  );
}
