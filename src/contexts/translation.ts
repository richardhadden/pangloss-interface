import * as i18n from "@solid-primitives/i18n";
import { formatRelative } from "date-fns";
import { de, enGB, fr } from "date-fns/locale";
import { createMemo, createSignal } from "solid-js";
import { dictionaries } from "~/generated/translations";

export type Locale = keyof typeof dictionaries;

const [locale, setLocale] = createSignal<Locale>("en");

const dict = createMemo(() => i18n.flatten(dictionaries[locale()]));

const t_wrapped = i18n.translator(dict);

const dateLocales = {
  fr: { locale: fr },
  de: { locale: de },
  en: { locale: enGB },
};

export const relativeDate = (date: string) => {
  return formatRelative(
    date,
    new Date(),
    dateLocales[locale() as keyof typeof dateLocales]
  );
};

const en_dict = createMemo(() => i18n.flatten(dictionaries["en"]));
const en_trans = i18n.translator(en_dict);

export function t(
  path: Parameters<typeof t_wrapped>[0],
  args?: Parameters<typeof t_wrapped>[1]
): string {
  const translation = t_wrapped(path, args);

  if (translation !== undefined) {
    return translation as string;
  }
  const fallback = en_trans(path) as string;
  if (fallback !== undefined) {
    return fallback as string;
  }
  return `!! ${path.replaceAll(".", " ")}`;
}

export { dictionaries, locale, setLocale };
