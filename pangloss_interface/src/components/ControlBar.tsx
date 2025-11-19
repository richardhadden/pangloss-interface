import { type BaseNodeTypes } from "../../.model-configs/model-typescript";
import { BiRegularPlus } from "solid-icons/bi";
import { IoSaveSharp } from "solid-icons/io";
import { JSX, JSXElement } from "solid-js";
import { Portal, Show } from "solid-js/web";
import { useTranslation, type TranslationKey } from "../contexts/translation";

type ControlBarProps = {
  modelType?: BaseNodeTypes;
  modelTypeNumber?: "singular" | "plural";
  addFunction?: () => void;
  saveFunction?: () => void;
  isSaving?: boolean;
  leftContent?: JSXElement;
  centreContent?: JSX.Element;
  statusContent?: JSX.Element;
  rightButtons?: JSX.Element;
};

export default function ControlBar(props: ControlBarProps) {
  const [_, { t }] = useTranslation();
  return (
    <Portal mount={document.getElementById("controlBar")!}>
      <div class="flex-between group flex h-16 w-full rounded-b-xs *:first:rounded-bl-sm">
        <Show when={props.statusContent}>{props.statusContent}</Show>
        <Show when={props.modelType}>
          <div
            id="controlBarModelType"
            class="text-shadow-2xs text-shadow-blue-600 flex h-16 items-center bg-slate-800/80 px-4 text-sm font-semibold text-slate-100 uppercase backdrop-blur-2xl select-none group-hover:shadow-2xl group-hover:shadow-slate-800/40 first-of-type:rounded-bl-xs"
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
        <div id="controlBarButtons" class="flex">
          {props.rightButtons}
          <Show when={props.addFunction}>
            <button
              onClick={props.addFunction}
              id="controlBarAddButton"
              class="shadow-g group/button flex aspect-square h-full cursor-pointer items-center justify-center bg-green-700/90 last:rounded-br-xs hover:bg-green-800/90 hover:shadow-xl hover:shadow-green-100/30 active:bg-green-600/90 active:shadow-inner"
            >
              <BiRegularPlus
                color="white"
                size={30}
                class="group-hover/button:scale-110 group-active/button:scale-90"
              />
            </button>
          </Show>
          <Show when={props.saveFunction}>
            <button
              onClick={props.saveFunction}
              id="controlBarSaveButton"
              class="group-hover:shadow-300/40 shadow-g group/button flex aspect-square h-full cursor-pointer items-center justify-center bg-orange-500/70 group-hover:shadow-md last:rounded-br-xs hover:bg-orange-500/70 hover:shadow-orange-300/40 active:bg-orange-400/70 active:shadow-inner active:shadow-orange-500/30"
            >
              <IoSaveSharp
                color="white"
                size={20}
                class="group-hover/button:scale-105 group-active/button:scale-95"
              />
            </button>
          </Show>
        </div>
      </div>
    </Portal>
  );
}
