import * as i18n from "@solid-primitives/i18n";
import { createMemo, createSignal } from "solid-js";

import { dictionaries } from "../../ProjectTranslation";

export type Locale = keyof typeof dictionaries;

const [locale, setLocale] = createSignal<Locale>("fr");

const dict = createMemo(() => i18n.flatten(dictionaries[locale()]));

export const t = i18n.translator(dict);

export { dictionaries, locale, setLocale };
