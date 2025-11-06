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
          <div class="flex h-full select-none items-center justify-center px-4 text-sm font-semibold uppercase text-slate-800">
            New
          </div>
        }
        modelType={params.modelType}
        modelTypeNumber="singular"
        saveFunction={() => undefined}
        centreContent={
          <Show when={newFormState.label.length > 0}>
            <div
              class="shrink-1 line-clamp-2 flex h-full w-fit grow-0 items-center rounded-r-sm border-r-[0.25px] border-r-neutral-400/20 bg-zinc-300 pl-6 pr-6 align-middle text-black shadow-2xl shadow-neutral-300/50"
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

      <div class="py-32 pl-32 pr-16">
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
