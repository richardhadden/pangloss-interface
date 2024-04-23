import * as i18n from "@solid-primitives/i18n";
import { formatRelative } from 'date-fns';
import { de, enGB, fr } from "date-fns/locale";
import { createMemo, createSignal } from "solid-js";
import { dictionaries } from "../../ProjectTranslation";

export type Locale = keyof typeof dictionaries;

const [locale, setLocale] = createSignal<Locale>("en");

const dict = createMemo(() => i18n.flatten(dictionaries[locale()]));

export const t = i18n.translator(dict);

const dateLocales = {fr: {locale: fr}, de: {locale: de}, en: {locale: enGB}};

export const relativeDate = (date: string) => {
   
    return formatRelative(date, new Date(), dateLocales[locale() as keyof typeof dateLocales])
};


export { dictionaries, locale, setLocale };
