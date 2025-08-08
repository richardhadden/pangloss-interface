import { en } from "../../.model-configs/model-translations/en";
import { config } from "../../.model-configs/project-config";
import * as i18n from "@solid-primitives/i18n";
import {
  createContext,
  createMemo,
  createResource,
  createSignal,
  useContext,
  type ParentComponent,
} from "solid-js";

export type LocaleOptions = "en" | "fr" | "es" | "de";

export type RawDictionary = { [l in LocaleOptions]: typeof en };
export type Dictionary = i18n.Flatten<typeof en>;

async function fetchDictionary(l: LocaleOptions): Promise<Dictionary> {
  "use server";
  if (l === "en") {
    return i18n.flatten(en);
  }
  const dict = await import(`../../.model-configs/model-translations/${l}.ts`);
  return i18n.flatten(dict[l]) as Dictionary; // flatten the dictionary to make all nested keys available top-level
}

const en_dict = createMemo(() => i18n.flatten(en));
const en_translator = i18n.translator(en_dict);
const en_proxy_translation = i18n.proxyTranslator(en_translator);

export type TranslationKey = keyof typeof en;

export type LocaleStatusState = {
  readonly locale: LocaleOptions;
};
export type LocaleStatusContextValue = [
  state: typeof locale,
  actions: {
    setLocale: (locale: LocaleOptions) => void;
    t: {
      [key in TranslationKey]: (typeof en_proxy_translation)[key];
    };
  },
];

const [locale, setLocale] = createSignal<LocaleOptions>(
  config.defaultLang as LocaleOptions,
);
const TranslationContext = createContext<LocaleStatusContextValue>([
  locale,
  {
    setLocale: () => undefined,
    t: en_proxy_translation,
  },
]);

export const TranslationProvider: ParentComponent = (props) => {
  const [dict] = createResource(locale, fetchDictionary, {
    initialValue: i18n.flatten(en),
  });

  const translator = i18n.translator(dict);

  const t = i18n.proxyTranslator(translator);

  return (
    <TranslationContext.Provider value={[locale, { setLocale, t }]}>
      {props.children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
