import { RouteDefinition, useParams } from "@solidjs/router";

import { useUserLogin } from "~/contexts/users";
import {
  type ViewTypesMap,
  type ViewableTypesNames,
} from "../../../generated/types";
import { Show, Suspense } from "solid-js";
import { LoginOverlay } from "~/components/LoginForm";
import { ControlBar } from "~/components/ControlBar";
import { t, relativeDate } from "~/contexts/translation";
import {
  createRefetchableAsync,
  fetchDataCache,
} from "~/utils/createRefetchableAsync";
import { apiClient } from "~/ApiClient";
import { ViewItems } from "~/components/ViewItems";

import { Title } from "@solidjs/meta";
import { ViewModifiedDetails } from "~/components/ViewModifyDetails";

import { ModelConfigs } from "~/generated/types";

async function fetchData<K extends keyof ViewTypesMap>(
  entityType: K,
  uid: string
): Promise<ViewTypesMap[K] | undefined> {
  const data = await apiClient.view(entityType, uid);

  return data;
}

export const route = {
  load: ({ params }) =>
    fetchDataCache(
      fetchData,
      params.EntityType as ViewableTypesNames,
      params.EntityIdentifier as string
    ),
} satisfies RouteDefinition;

export default function () {
  const [user] = useUserLogin();
  const params: { EntityType: ViewableTypesNames; EntityIdentifier: string } =
    useParams();
  const [data, { refetch, mutate }] = createRefetchableAsync(() =>
    fetchData(
      params.EntityType as ViewableTypesNames,
      params.EntityIdentifier as string
    )
  );

  return (
    <>
      <Title>
        {t(`${params.EntityType}.__model.verboseName`) + " | Pangloss"}
      </Title>
      <ControlBar
        entityType={t(`${params.EntityType}.__model.verboseName`)}
        centralSectionPosition="left"
        editUrl={
          data() && ModelConfigs[data()?.type as ViewableTypesNames].edit
            ? `/objects/${data()?.type}/${data()?.uuid}/edit`
            : undefined
        }
        controlBarCentre={
          <Suspense>
            <Show when={data()}>
              {(data) => (
                <>
                  <div
                    class="line-clamp-2 rounded-r-sm pl-6 pr-6  h-14 align-middle flex grow-0 shrink-1 items-center bg-neutral-300 text-black  shadow-2xl shadow-neutral-300/50 border-r-[0.25px] border-r-neutral-400/20"
                    classList={{
                      "text-sm":
                        data().label.length > 100 && data().label.length <= 300,
                      "text-xs": data().label.length > 300,
                    }}
                  >
                    <span class="line-clamp-2">{data().label}</span>
                  </div>
                  <div class="grow shrink-0" />
                  <ViewModifiedDetails data={data()} />
                </>
              )}
            </Show>
          </Suspense>
        }
      />
      <section class="pl-10 pr-10 mt-10">
        <Suspense fallback={<h1>Loading!</h1>}>
          <Show when={data() as ViewTypesMap[ViewableTypesNames]}>
            {(data) => (
              <ViewItems
                itemType={params.EntityType}
                item={data() as ViewTypesMap[ViewableTypesNames]}
              />
            )}
          </Show>
          <Show when={!user.isLoggedIn && user.accessingAuthorisedRoute}>
            <LoginOverlay />
          </Show>
        </Suspense>
      </section>
    </>
  );
}
