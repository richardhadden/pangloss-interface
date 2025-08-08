import { Combobox, useListCollection } from "@ark-ui/solid/combobox";
import { useFilter } from "@ark-ui/solid/locale";
import { createSignal, For } from "solid-js";
import { Portal } from "solid-js/web";

const initialItems = ["React", "Solid", "Vue", "Svelte"];

const RelationField = () => {
  const filterFn = useFilter({ sensitivity: "base" });

  const { collection, filter } = useListCollection({
    initialItems,
    filter: filterFn().contains,
  });

  const handleInputChange = (details) => {
    filter(details.inputValue);
  };

  const [selected, setSelected] = createSignal([]);

  return (
    <>
      <div class="flex">
        <For each={selected()}>
          {(item) => <div class="bg-red-500">{item}</div>}
        </For>
      </div>
      <Combobox.Root
        collection={collection()}
        onInputValueChange={handleInputChange}
        multiple={true}
        value={selected()}
        onValueChange={(value) => setSelected(value.items)}
        closeOnSelect={true}
      >
        <Combobox.Control>
          <Combobox.Input class="w-full caret-indigo-800 resize-none  outline-0 bg-zinc-200 rounded-sm py-4 px-4 focus:bg-zinc-300 focus:border-slate-200 focus:drop-shadow-xs" />
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content class="bg-amber-300">
              <For each={collection().items}>
                {(item) => (
                  <Combobox.Item item={item} class="block border">
                    <Combobox.ItemText>{item}</Combobox.ItemText>
                    <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                  </Combobox.Item>
                )}
              </For>
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
    </>
  );
};

export { RelationField };
