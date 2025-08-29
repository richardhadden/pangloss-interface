import { BaseNodeTypes } from "../../../.model-configs/model-typescript";
import { useIsRouting, useNavigate, useParams } from "@solidjs/router";
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onMount,
  Show,
} from "solid-js";
import { createStore, produce, reconcile, unwrap } from "solid-js/store";
import ControlBar from "~/components/ControlBar";
import { BaseForm } from "~/components/form/BaseForm";
import { useUserLogin } from "~/contexts/users";
import { createBlankObject } from "~/utils/createBlankObject";

export default function CreateObject() {
  const params = useParams<{ modelType: BaseNodeTypes }>();
  const [user, { setAccessingAuthorisedRoute, LoggedIn }] = useUserLogin();
  const navigate = useNavigate();
  const isRouting = useIsRouting();

  onMount(() => setAccessingAuthorisedRoute(true));
  const modelType = createMemo(() => params.modelType);
  const [newFormState, setNewFormState] = createStore(
    createBlankObject(params.modelType, false),
  );

  // Navigating from one `new` page to another directly does not
  // unmount the component, so the default store value is not changed;
  // instead, we create an effect that checks the previous state's `type`
  // to the params.modelType, and create a blank object if different

  return (
    <LoggedIn onCancel={() => history.back()}>
      <ControlBar
        statusContent={
          <div class=" h-full px-4 uppercase text-sm font-semibold text-slate-800 flex justify-center items-center select-none">
            New
          </div>
        }
        modelType={params.modelType}
        modelTypeNumber="singular"
        saveFunction={() => undefined}
        centreContent={
          <Show when={newFormState.label.length > 0}>
            <div
              class="h-full line-clamp-2 rounded-r-sm pl-6 pr-6 w-fit align-middle flex grow-0 shrink-1 items-center bg-zinc-300 text-black  shadow-2xl shadow-neutral-300/50 border-r-[0.25px] border-r-neutral-400/20"
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

      <div class="pl-32 pr-16 py-32">
        <button onclick={() => console.log(unwrap(newFormState))}>
          CONSOLE LOG FORM STATE
        </button>
        <BaseForm
          formFor={params.modelType}
          baseFormState={newFormState}
          setBaseFormState={setNewFormState}
        />
      </div>
    </LoggedIn>
  );
}
