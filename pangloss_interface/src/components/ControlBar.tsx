import { type BaseNodeTypes } from "../../.model-configs/model-typescript";
import { BiRegularPlus } from "solid-icons/bi";
import { JSX, JSXElement } from "solid-js";
import { Portal, Show } from "solid-js/web";
import { useTranslation, type TranslationKey } from "~/contexts/translation";

type ControlBarProps = {
  modelType?: BaseNodeTypes;
  modelTypeNumber?: "singular" | "plural";
  addFunction?: () => void;
  leftContent?: JSXElement;
  centreContent?: JSX.Element;
  statusContent?: JSX.Element;
};

export default function ControlBar(props: ControlBarProps) {
  const [_, { t }] = useTranslation();
  return (
    <Portal mount={document.getElementById("controlBar")!}>
      <div class="w-full h-16 rounded-b-xs flex flex-between *:first:rounded-bl-sm">
        <Show when={props.statusContent}>{props.statusContent}</Show>
        <Show when={props.modelType}>
          <div
            id="controlBarModelType"
            class="h-16 first-of-type:rounded-bl-xs flex items-center bg-slate-800/80 backdrop-blur-2xl px-4 uppercase font-semibold text-slate-100 text-sm select-none text-shadow-2xs text-shadow-blue-600"
          >
            <Show
              when={props.modelTypeNumber === "plural"}
              fallback={t[
                props.modelType as TranslationKey
              ]._model.verboseName()}
            >
              {t[props.modelType as TranslationKey]._model.verboseNamePlural()}
            </Show>
          </div>
        </Show>
        <div id="controlBarLeft">{props.leftContent}</div>
        <div id="controlBarCentre" class="flex-1">
          {props.centreContent}
        </div>
        <div id="controlBarRight"></div>
        <div id="controlBarButtons">
          <Show when={props.addFunction}>
            <button
              onClick={props.addFunction}
              id="controlBarAddButton"
              class="last:rounded-br-sm aspect-square h-full active:shadow-inner bg-green-700/90 hover:bg-green-800/90 active:bg-green-600/90 hover:shadow-xl hover:shadow-green-100/30 shadow-g group/button flex justify-center items-center cursor-pointer"
            >
              <BiRegularPlus
                color="white"
                size={30}
                class="group-active/button:scale-90 group-hover/button:scale-110"
              />
            </button>
          </Show>
        </div>
      </div>
    </Portal>
  );
}
