import * as i18n from "@solid-primitives/i18n";
import { createMemo, createSignal } from "solid-js";

const en_dict = {
  interface: {
    icon: "🇬🇧",
    log_in: "Log In",
    log_out: "Log Out",
    language: "Language",
    search: "Search",
    getMoreResults: "Get More Results",
    username: "Username",
    password: "Password",
    log_in_required: "Log In Required",
    not_logged_in: "Not Logged In",
    incorrect_username_or_password: "Incorrect Username or Password",
    username_or_password_missing: "Username or Password Missing",
    something_went_wrong_try_again: "Something went wrong. Try again",
    home_page: "Home",
    about_page: "About",
  },
  ZoteroEntry: {
    __model: {
      verbose_name: "Zotero Entry",
      verbose_name_plural: "Zotero Entries",
      description: "",
    },
  },
  Person: {
    __model: {
      verbose_name: "Person",
      verbose_name_plural: "Persons",
      description: "",
    },
  },
};

type Dict = typeof en_dict;

const de_dict: Dict = {
  interface: {
    icon: "🇦🇹",
    log_in: "Anmelden",
    log_out: "Abmelden",
    language: "Sprache",
    search: "Suchen",
    getMoreResults: "Mehr Ergebnisse erzielen",
    username: "Benutzername",
    password: "Passwort",
    log_in_required: "Anmeldung erforderlich",
    not_logged_in: "Nicht angemeldet",
    incorrect_username_or_password:
      "Falscher Benutzername oder falsches Passwort",
    username_or_password_missing: "Benutzername oder Passwort fehlt",
    something_went_wrong_try_again:
      "Etwas ist schief gelaufen. Versuchen Sie es noch einmal.",
    home_page: "Home Page",
    about_page: "Uber uns",
  },
  ZoteroEntry: {
    __model: {
      verbose_name: "Zotero-Eintrag",
      verbose_name_plural: "Zotero-Einträge",
      description: "",
    },
  },
  Person: {
    __model: {
      verbose_name: "Person",
      verbose_name_plural: "Personen",
      description: "",
    },
  },
};
const dictionaries = {
  en: en_dict,
  de: de_dict,
};

export type Locale = keyof typeof dictionaries;

const [locale, setLocale] = createSignal<Locale>("de");

const dict = createMemo(() => i18n.flatten(dictionaries[locale()]));

export const t = i18n.translator(dict);

export { dictionaries, locale, setLocale };
