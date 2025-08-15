import {
  BaseNodeDefinitionMap,
  ModelDefinitions,
  type TRelationFieldDefinition,
} from "../../../.model-configs/model-definitions";
import { BaseNodeTypes } from "../../../.model-configs/model-typescript";
import { useFilter } from "@ark-ui/solid/locale";
import {
  createSignal,
  For,
  Index,
  JSXElement,
  Match,
  onMount,
  Show,
  Switch,
} from "solid-js";
import { Portal } from "solid-js/web";
import { TranslationKey, useTranslation } from "~/contexts/translation";

type TRelationFieldProps = {
  fieldDefinition: TRelationFieldDefinition;
  value: any[];
  setValue: (value: string, ...path: (string | number)[]) => void;
};

function RelationField(props: TRelationFieldProps) {
  return (
    <>
      <Switch fallback={<div>Nothing for this field type yet</div>}>
        <Match
          when={props.fieldDefinition.createInline && props.value.length === 0}
        >
          <RelationFieldTypeSelectorWrapper>
            <RelationFieldTypeSelector
              fieldDefinitionTypes={props.fieldDefinition.types}
              onSelectType={(selectedType: keyof typeof ModelDefinitions) => {}}
            />
          </RelationFieldTypeSelectorWrapper>
        </Match>
      </Switch>
    </>
  );
}

type TRelationFieldTypeSelectorProps = {
  onSelectType: (selectedType: keyof typeof ModelDefinitions) => void;
  fieldDefinitionTypes: TRelationFieldProps["fieldDefinition"]["types"];
};

function determineTopLevelTypes(types: (keyof typeof BaseNodeDefinitionMap)[]) {
  const supertypeArrays = types.map((t) => [
    ...ModelDefinitions[t].meta.supertypes.toReversed(),
    t,
  ]);

  let checkedIndex = 0;
  while (true) {
    const nextValues = supertypeArrays.map((stArr) => stArr[checkedIndex]);

    if (!nextValues.every((v) => v == nextValues[checkedIndex])) {
      return Array.from(
        new Set(supertypeArrays.map((stArr) => stArr[checkedIndex])),
      );
    }
    checkedIndex++;
  }
}

function RelationFieldTypeSelectorWrapper(props: { children: JSXElement }) {
  return (
    <div class="col-span-10  bg-zinc-200 hover:bg-zinc-300  rounded-xs  pb-10">
      <div class="w-full uppercase text-sm font-semibold py-2 px-3 bg-slate-600 text-slate-100 select-none rounded-t-xs">
        Select a type
      </div>
      {props.children}
    </div>
  );
}

function RelationFieldTypeSelector(props: TRelationFieldTypeSelectorProps) {
  const [lang, { t }] = useTranslation();
  const baseNodeTypes = props.fieldDefinitionTypes
    .filter((t) => t.metatype === "RelationToNode")
    .map((t) => t.type);

  const topLevelBaseNodeTypes = determineTopLevelTypes(
    baseNodeTypes as unknown as (keyof typeof BaseNodeDefinitionMap)[],
  );

  const semanticSpaceTypes = props.fieldDefinitionTypes.filter(
    (t) => t.metatype === "RelationToSemanticSpace",
  );

  return (
    <>
      <div class="p-10 w-full h-fit flex gap-x-6">
        <For each={topLevelBaseNodeTypes}>
          {(topLevelType, index) => (
            <div class="flex flex-col">
              <button class="bg-slate-600 flex justify-start rounded-t-xs rounded-bl-xs py-2 px-3 box-content font-semibold uppercase text-slate-200 text-xs not-last:border-b-[0.5px] not-last:border-slate-400 select-none cursor-pointer hover:bg-slate-700 group active:shadow-inner active:shadow-slate-700 active:bg-slate-600">
                <div class="group-active:scale-[98%] group-hover:scale-[101%]">
                  {
                    t[topLevelType as TranslationKey]._model
                      .verboseName as unknown as string
                  }
                </div>
              </button>
              <For each={ModelDefinitions[topLevelType].meta.subtypes}>
                {(subtype) => (
                  <button
                    class="bg-slate-600 flex justify-start last:rounded-b-xs py-2 px-3 box-content font-semibold uppercase text-slate-200 text-xs not-last:border-b-[0.5px] not-last:border-slate-400 select-none cursor-pointer hover:bg-slate-700 group active:shadow-inner active:shadow-slate-700 active:bg-slate-600"
                    style={`margin-left: ${index() + 2}rem`}
                  >
                    <div class="group-active:scale-[98%] group-hover:scale-[101%]">
                      {
                        t[subtype as TranslationKey]._model
                          .verboseName as unknown as string
                      }
                    </div>
                  </button>
                )}
              </For>
            </div>
          )}
        </For>
      </div>

      <For each={semanticSpaceTypes}>
        {(semanticSpaceType) => (
          <div class="pt-4 w-full h-fit flex gap-x-6 ">
            <div class="mx-10 w-full bg-red-500/20 rounded-xs">
              <div class="w-full uppercase text-xs bg-red-800/90 text-red-100 py-2 px-3 rounded-t-xs font-semibold select-none">
                {semanticSpaceType.baseType}
              </div>
              <For each={semanticSpaceType.types}>
                {(tt) => (
                  <>
                    <RelationFieldTypeSelector
                      fieldDefinitionTypes={tt.typeParamsToTypeMap["T"].types}
                    />
                  </>
                )}
              </For>
            </div>
          </div>
        )}
      </For>
    </>
  );
}

export { RelationField };
