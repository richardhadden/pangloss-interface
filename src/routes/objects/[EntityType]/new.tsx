import { useParams, useNavigate } from "@solidjs/router";
import { useUserLogin } from "~/contexts/users";
import { type ViewableTypesNames } from "~/generated/types";
import { Show, onMount } from "solid-js";
import { LoginOverlay } from "~/components/LoginForm";
import { ControlBar } from "~/components/ControlBar";

import { t } from "~/contexts/translation";
import { CreateForm } from "~/components/CreateForm";

let FAKE_LABEL = `Label for uncreated thing`;

//FAKE_LABEL = "John Smith is born";

export default function NewEntity() {
  const [user, { setAccessingAuthorisedRoute }] = useUserLogin();
  const params: { EntityType: ViewableTypesNames } = useParams();
  const navigate = useNavigate();

  onMount(() => {
    setAccessingAuthorisedRoute(true);
  });

  return (
    <>
      <ControlBar
        entityType={t(`${params.EntityType}.__model.verbose_name`)}
        pageType="new"
        centralSectionPosition="left"
        controlBarCentre={
          <div
            class="pl-6 pr-6 mr-20 py-2 h-14 align-middle flex items-center bg-neutral-300 text-black  border-collapse  shadow-2xl shadow-neutral-300/50 border-r-[0.25px] border-r-neutral-400/20"
            classList={{
              "text-sm": FAKE_LABEL.length > 100 && FAKE_LABEL.length <= 300,
              "text-xs": FAKE_LABEL.length > 300,
            }}
          >
            <span class="line-clamp-2">{FAKE_LABEL}</span>
          </div>
        }
      />
      <CreateForm entityType={params.EntityType} />

      <Show when={!user.isLoggedIn && user.accessingAuthorisedRoute}>
        <LoginOverlay onCancel={() => navigate(-1)} />
      </Show>
    </>
  );
}
