import { BaseNodeTypes } from "../../../.model-configs/model-typescript";
import { useParams } from "@solidjs/router";
import { Show } from "solid-js";
import { createStore, produce, reconcile, unwrap } from "solid-js/store";
import ControlBar from "~/components/ControlBar";
import { BaseForm } from "~/components/form/BaseForm";

import { createBlankObject } from "~/utils/createBlankObject";
import { RequireLogin } from "~/contexts/users";
import { Title } from "@solidjs/meta";
import { TranslationKey, useTranslation } from "~/contexts/translation";

export default function CreateObject() {
  const params = useParams<{ modelType: BaseNodeTypes }>();

  const [newFormState, setNewFormState] = createStore(
    createBlankObject(params.modelType, false),
  );

  const [lang, { t }] = useTranslation();

  // Navigating from one `new` page to another directly does not
  // unmount the component, so the default store value is not changed;
  // instead, we create an effect that checks the previous state's `type`
  // to the params.modelType, and create a blank object if different

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
      />

      <div class="py-32 pr-16 pl-32">
        <button onclick={() => console.log(unwrap(newFormState))}>
          CONSOLE LOG FORM STATE
        </button>

        <BaseForm
          formFor={params.modelType}
          baseFormState={newFormState}
          setBaseFormState={setNewFormState}
        />
      </div>
    </>
  );
}
