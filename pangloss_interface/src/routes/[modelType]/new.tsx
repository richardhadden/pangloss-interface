import { BaseNodeTypes } from "../../../.model-configs/model-typescript";
import { useParams } from "@solidjs/router";
import { createEffect, onCleanup, onMount, Show } from "solid-js";
import { createStore, produce, reconcile, unwrap } from "solid-js/store";
import ControlBar from "~/components/ControlBar";
import { BaseForm } from "~/components/form/BaseForm";

import { createBlankObject } from "~/utils/createBlankObject";
import { RequireLogin } from "~/contexts/users";
import { Title } from "@solidjs/meta";
import { TranslationKey, useTranslation } from "~/contexts/translation";
import { createUndoHistory } from "@solid-primitives/history";

import { IoArrowRedoSharp, IoArrowUndoSharp } from "solid-icons/io";
import colors from "tailwindcss/colors";
import { bindKeyCombo, unbindKeyCombo } from "@rwh/keystrokes";

export default function CreateObject() {
  const params = useParams<{ modelType: BaseNodeTypes }>();

  const [newFormState, setNewFormState] = createStore(
    createBlankObject(params.modelType, false)
  );

  const history = createUndoHistory(() => {
    // track and clone the whole state
    const copy = JSON.parse(JSON.stringify(newFormState));
    // reconcile the state back to the tracked value
    return () => setNewFormState(reconcile(copy));
  });

  const [lang, { t }] = useTranslation();

  onMount(() => {
    bindKeyCombo("meta > z", history.undo);
    bindKeyCombo("meta + shift > z", history.redo);
    onCleanup(() => {
      unbindKeyCombo("meta > z", history.undo);
      unbindKeyCombo("meta + shift > z", history.redo);
    });
  });

  // Navigating from one `new` page to another directly does not
  // unmount the component, so the default store value is not changed;
  // instead, we create an effect that checks the previous state's `type`
  // to the params.modelType, and create a blank object if different
  createEffect(() => {
    if (newFormState.type !== params.modelType) {
      setNewFormState(reconcile(createBlankObject(params.modelType, false)));
    }
  });

  return (
    <>
      <Title>
        New {t[params.modelType as TranslationKey]._model.verboseName()} |
        Pangloss
      </Title>
      <RequireLogin />
      <ControlBar
        statusContent={
          <div class="flex h-full items-center justify-center px-4 text-sm font-semibold text-slate-800 uppercase select-none">
            New
          </div>
        }
        modelType={params.modelType}
        modelTypeNumber="singular"
        saveFunction={() => undefined}
        centreContent={
          <Show when={newFormState.label.length > 0}>
            <div
              class="line-clamp-2 flex h-full w-fit shrink-1 grow-0 items-center rounded-r-sm border-r-[0.25px] border-r-neutral-400/20 bg-zinc-300 pr-6 pl-6 align-middle text-black shadow-2xl shadow-neutral-300/50"
              classList={{
                "text-sm":
                  newFormState.label.length > 100 &&
                  newFormState.label.length <= 300,
                "text-xs": newFormState.label.length > 300,
              }}
            >
              <span class="line-clamp-2">
                {newFormState.label.length > 0
                  ? newFormState.label
                  : `New ${newFormState.type}`}
              </span>
            </div>
          </Show>
        }
        rightButtons={
          <>
            <button
              disabled={!history.canUndo()}
              onclick={() => history.undo()}
              class="group-hover:shadow-300/40 shadow-g group/button flex aspect-square h-full cursor-pointer items-center justify-center bg-slate-500/70 group-hover:shadow-md last:rounded-br-xs hover:bg-slate-500/70 hover:shadow-slate-300/40 active:bg-slate-400/70 active:shadow-inner active:shadow-slate-500/30 disabled:cursor-not-allowed disabled:bg-slate-500/50 disabled:hover:bg-slate-500/50 disabled:hover:shadow-none"
            >
              <IoArrowUndoSharp
                color={history.canUndo() ? "white" : colors.slate["300"]}
                size={20}
              />
            </button>
            <button
              disabled={!history.canRedo()}
              onclick={() => history.redo()}
              class="group-hover:shadow-300/40 shadow-g group/button flex aspect-square h-full cursor-pointer items-center justify-center bg-slate-500/70 group-hover:shadow-md last:rounded-br-xs hover:bg-slate-500/70 hover:shadow-slate-300/40 active:bg-slate-400/70 active:shadow-inner active:shadow-slate-500/30 disabled:cursor-not-allowed disabled:bg-slate-500/50 disabled:hover:bg-slate-500/50 disabled:hover:shadow-none"
            >
              <IoArrowRedoSharp
                color={history.canRedo() ? "white" : colors.slate["300"]}
                size={20}
              />
            </button>
          </>
        }
      />

      <div class="py-32 pr-16 pl-32">
        {/*<button onclick={() => console.log(unwrap(newFormState))}>
          CONSOLE LOG FORM STATE
        </button>*/}
        <Show when={params.modelType}>
          {/* Use this callback form to ensure form is rerendered when 
              route changes
          */}
          {(_) => (
            <BaseForm
              formFor={params.modelType}
              baseFormState={newFormState}
              setBaseFormState={setNewFormState}
            />
          )}
        </Show>
      </div>
    </>
  );
}
