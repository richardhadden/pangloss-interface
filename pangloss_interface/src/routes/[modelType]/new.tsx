import { BaseNodeTypes } from "../../../.model-configs/model-typescript";
import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { createStore, unwrap } from "solid-js/store";
import ControlBar from "~/components/ControlBar";
import { BaseForm } from "~/components/form/BaseForm";
import { useUserLogin } from "~/contexts/users";
import { createBlankObject } from "~/utils/createBlankObject";

export default function CreateObject() {
  const params = useParams<{ modelType: BaseNodeTypes }>();
  const [user, { setAccessingAuthorisedRoute, LoggedIn }] = useUserLogin();
  const navigate = useNavigate();

  onMount(() => setAccessingAuthorisedRoute(true));

  const [newFormState, setNewFormState] = createStore(
    createBlankObject(params.modelType, false),
  );

  createEffect(() => {
    newFormState;
    console.log(unwrap(newFormState));
  });

  // Navigating from one `new` page to another directly does not
  // unmount the component, so the default store value is not changed;
  // instead, we create an effect that checks the previous state's `type`
  // to the params.modelType, and create a blank object if different

  // TODO: this still doesn't work!!
  createEffect(() => {
    setNewFormState((prevState: any) => {
      if (prevState.type !== params.modelType) {
        return createBlankObject(params.modelType, false);
      } else return prevState;
    });
  });

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
        //addFunction={() => undefined}
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

      <BaseForm
        formFor={params.modelType}
        baseFormState={newFormState}
        setBaseFormState={setNewFormState}
      />
    </LoggedIn>
  );
}
