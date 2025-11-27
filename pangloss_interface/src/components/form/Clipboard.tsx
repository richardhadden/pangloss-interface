import { createSignal, Show } from "solid-js";
import { unwrap } from "solid-js/store";
import { useClipboard } from "solidjs-use";
import { IoClipboard } from "solid-icons/io";
import { TranslationKey, useTranslation } from "~/contexts/translation";

const { text, copy, copied, isSupported } = useClipboard({});

const [lastClipboardOp, setLastClipboardOp] = createSignal<
  "copy" | "cut" | null
>(null);

function _copy(item: object) {
  copy(JSON.stringify(unwrap(item)));
  setLastClipboardOp("copy");
}

function _cut(item: object, removeFunction: () => void) {
  _copy(item);
  setTimeout(() => removeFunction(), 50);
  setLastClipboardOp("cut");
}

function unwrapClipboard(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function _getClipboardText() {
  return unwrapClipboard(text());
}

export const clipboard = {
  item: _getClipboardText,
  copy: _copy,
  cut: _cut,
  copied,
  isSupported,
};

const lastClipboardOpText = {
  cut: "Item cut",
  copy: "Item copied",
};

export const ClipboardView = () => {
  const [lang, { t }] = useTranslation();
  return (
    <Show when={clipboard.item() && clipboard.item().label}>
      <div class="fixed right-10 bottom-0 z-50 overflow-clip rounded-xs bg-slate-500/30 shadow-xl">
        <div class="relative flex w-full bg-slate-600 p-2 text-xs font-semibold text-slate-50 uppercase shadow-sm shadow-slate-500/60">
          <IoClipboard color="white" class="relative top-[2px]" />
          <span class="ml-2">
            {lastClipboardOp() && lastClipboardOpText[lastClipboardOp()!]}
          </span>
        </div>
        <div class="p-3">
          <div class="flex-start flex h-fit w-fit rounded-xs bg-zinc-300 shadow-2xl">
            <div class="flex items-center rounded-l-xs bg-slate-600 px-3 py-2 text-xs font-semibold text-nowrap text-slate-100 uppercase select-none">
              {t[clipboard.item().type as TranslationKey]._model.verboseName()}
            </div>
            <div class="flex w-fit flex-nowrap items-center pr-4 pl-4 text-sm">
              {clipboard.item().label}
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};
