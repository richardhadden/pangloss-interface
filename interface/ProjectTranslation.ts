const en_dict = {
  ZoteroEntry: {
    __model: {
      verbose_name: "Zotero Entry",
      verbose_name_plural: "Zotero Entries",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    zotero_key: {
      verbose_name: "Zotero Key",
      verbose_name_plural: "Zotero Keys",
      description: "",
    },
    zotero_group_id: {
      verbose_name: "Zotero Group Id",
      verbose_name_plural: "Zotero Group Ids",
      description: "",
    },
    zotero_group_name: {
      verbose_name: "Zotero Group Name",
      verbose_name_plural: "Zotero Group Names",
      description: "",
    },
    zotero_version: {
      verbose_name: "Zotero Version",
      verbose_name_plural: "Zotero Versions",
      description: "",
    },
    zotero_url: {
      verbose_name: "Zotero Url",
      verbose_name_plural: "Zotero Urls",
      description: "",
    },
    csljson: {
      verbose_name: "Csljson",
      verbose_name_plural: "Csljsons",
      description: "",
    },
    bib: { verbose_name: "Bib", verbose_name_plural: "Bibs", description: "" },
    citation: {
      verbose_name: "Citation",
      verbose_name_plural: "Citations",
      description: "",
    },
    created_by: {
      verbose_name: "Created By",
      verbose_name_plural: "Created Bies",
      description: "",
    },
    created_when: {
      verbose_name: "Created When",
      verbose_name_plural: "Created Whens",
      description: "",
    },
    modified_by: {
      verbose_name: "Modified By",
      verbose_name_plural: "Modified Bies",
      description: "",
    },
    modified_when: {
      verbose_name: "Modified When",
      verbose_name_plural: "Modified Whens",
      description: "",
    },
  },
  Entity: {
    __model: {
      verbose_name: "Entity",
      verbose_name_plural: "Entities",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
  },
  Person: {
    __model: {
      verbose_name: "Person",
      verbose_name_plural: "People",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    is_subject_of_statement: {
      verbose_name: "Is Subject of Statement",
      verbose_name_plural: "Is Subject of Statements",
      description: "",
    },
    has_birth_event: {
      verbose_name: "Has Birth Event",
      verbose_name_plural: "Has Birth Events",
      description: "",
    },
    has_death_event: {
      verbose_name: "Has Death Event",
      verbose_name_plural: "Has Death Events",
      description: "",
    },
    carried_out_activity: {
      verbose_name: "Carried Out Activity",
      verbose_name_plural: "Carried Out Activities",
      description: "",
    },
  },
  Organisation: {
    __model: {
      verbose_name: "Organisation",
      verbose_name_plural: "Organisations",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    carried_out_activity: {
      verbose_name: "Carried Out Activity",
      verbose_name_plural: "Carried Out Activities",
      description: "",
    },
  },
  Source: {
    __model: {
      verbose_name: "Source",
      verbose_name_plural: "Sources",
      description: "A source of something",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    title: {
      verbose_name: "Title",
      verbose_name_plural: "Titles",
      description: "",
    },
  },
  Citation: {
    __model: {
      verbose_name: "Citation",
      verbose_name_plural: "Citations",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    scope: {
      verbose_name: "Scope",
      verbose_name_plural: "Scopes",
      description: "",
    },
    reference: {
      verbose_name: "Reference",
      verbose_name_plural: "References",
      description: "",
    },
  },
  Factoid: {
    __model: {
      verbose_name: "Factoid",
      verbose_name_plural: "Factoids",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    statements: {
      verbose_name: "Statements",
      verbose_name_plural: "Statements",
      description: "",
    },
  },
  Statement: {
    __model: {
      verbose_name: "Statement",
      verbose_name_plural: "Statements",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    subject_of_statement: {
      verbose_name: "Subject of Statement",
      verbose_name_plural: "Subject of Statements",
      description: "",
    },
  },
  TemporalStatement: {
    __model: {
      verbose_name: "Temporal Statement",
      verbose_name_plural: "Temporal Statements",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    when: {
      verbose_name: "When",
      verbose_name_plural: "Whens",
      description: "",
    },
    subject_of_statement: {
      verbose_name: "Subject of Statement",
      verbose_name_plural: "Subject of Statements",
      description: "",
    },
  },
  Naming: {
    __model: {
      verbose_name: "Naming",
      verbose_name_plural: "Namings",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    first_name: {
      verbose_name: "First Name",
      verbose_name_plural: "First Names",
      description: "",
    },
    last_name: {
      verbose_name: "Last Name",
      verbose_name_plural: "Last Names",
      description: "",
    },
    subject_of_statement: {
      verbose_name: "Subject of Statement",
      verbose_name_plural: "Subject of Statements",
      description: "",
    },
  },
  Birth: {
    __model: {
      verbose_name: "Birth",
      verbose_name_plural: "Births",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    when: {
      verbose_name: "When",
      verbose_name_plural: "Whens",
      description: "",
    },
    person_born: {
      verbose_name: "Person Born",
      verbose_name_plural: "Person Borns",
      description: "",
    },
  },
  Death: {
    __model: {
      verbose_name: "Death",
      verbose_name_plural: "Deaths",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    when: {
      verbose_name: "When",
      verbose_name_plural: "Whens",
      description: "",
    },
    person_born: {
      verbose_name: "Person Born",
      verbose_name_plural: "Person Borns",
      description: "",
    },
  },
  Activity: {
    __model: {
      verbose_name: "Activity",
      verbose_name_plural: "Activities",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    when: {
      verbose_name: "When",
      verbose_name_plural: "Whens",
      description: "",
    },
    subject_of_statement: {
      verbose_name: "Subject of Statement",
      verbose_name_plural: "Subject of Statements",
      description: "",
    },
    carried_out_by: {
      verbose_name: "Carried Out By",
      verbose_name_plural: "Carried Out Bies",
      description: "",
    },
  },
  MakeJam: {
    __model: {
      verbose_name: "Make Jam",
      verbose_name_plural: "Make Jams",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    when: {
      verbose_name: "When",
      verbose_name_plural: "Whens",
      description: "",
    },
    was_ordered_in: {
      verbose_name: "Was Ordered In",
      verbose_name_plural: "Was Ordered Ins",
      description: "",
    },
    subject_of_statement: {
      verbose_name: "Subject of Statement",
      verbose_name_plural: "Subject of Statements",
      description: "",
    },
    carried_out_by: {
      verbose_name: "Carried Out By",
      verbose_name_plural: "Carried Out Bies",
      description: "",
    },
  },
  Order: {
    __model: {
      verbose_name: "Order",
      verbose_name_plural: "Orders",
      description: "",
    },
    label: {
      verbose_name: "Label",
      verbose_name_plural: "Labels",
      description: "",
    },
    when: {
      verbose_name: "When",
      verbose_name_plural: "Whens",
      description: "",
    },
    was_ordered_in: {
      verbose_name: "Was Ordered In",
      verbose_name_plural: "Was Ordered Ins",
      description: "",
    },
    subject_of_statement: {
      verbose_name: "Subject of Statement",
      verbose_name_plural: "Subject of Statements",
      description: "",
    },
    thing_ordered: {
      verbose_name: "Thing Ordered",
      verbose_name_plural: "Thing Ordereds",
      description: "",
    },
  },
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
    models: "Models",
  },
};
const de_dict: Dict = {
  ZoteroEntry: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    zotero_key: { verbose_name: "", verbose_name_plural: "", description: "" },
    zotero_group_id: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    zotero_group_name: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    zotero_version: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    zotero_url: { verbose_name: "", verbose_name_plural: "", description: "" },
    csljson: { verbose_name: "", verbose_name_plural: "", description: "" },
    bib: { verbose_name: "", verbose_name_plural: "", description: "" },
    citation: { verbose_name: "", verbose_name_plural: "", description: "" },
    created_by: { verbose_name: "", verbose_name_plural: "", description: "" },
    created_when: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    modified_by: { verbose_name: "", verbose_name_plural: "", description: "" },
    modified_when: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  Entity: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
  },
  Person: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    is_subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    has_birth_event: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    has_death_event: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    carried_out_activity: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  Organisation: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    carried_out_activity: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  Source: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    title: { verbose_name: "", verbose_name_plural: "", description: "" },
  },
  Citation: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    scope: { verbose_name: "", verbose_name_plural: "", description: "" },
    reference: { verbose_name: "", verbose_name_plural: "", description: "" },
  },
  Factoid: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    statements: { verbose_name: "", verbose_name_plural: "", description: "" },
  },
  Statement: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  TemporalStatement: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    when: { verbose_name: "", verbose_name_plural: "", description: "" },
    subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  Naming: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    first_name: { verbose_name: "", verbose_name_plural: "", description: "" },
    last_name: { verbose_name: "", verbose_name_plural: "", description: "" },
    subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  Birth: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    when: { verbose_name: "", verbose_name_plural: "", description: "" },
    person_born: { verbose_name: "", verbose_name_plural: "", description: "" },
  },
  Death: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    when: { verbose_name: "", verbose_name_plural: "", description: "" },
    person_born: { verbose_name: "", verbose_name_plural: "", description: "" },
  },
  Activity: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    when: { verbose_name: "", verbose_name_plural: "", description: "" },
    subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    carried_out_by: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  MakeJam: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    when: { verbose_name: "", verbose_name_plural: "", description: "" },
    was_ordered_in: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    carried_out_by: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  Order: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    when: { verbose_name: "", verbose_name_plural: "", description: "" },
    was_ordered_in: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    thing_ordered: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
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
    models: "Modelle",
  },
};
const fr_dict: Dict = {
  ZoteroEntry: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    zotero_key: { verbose_name: "", verbose_name_plural: "", description: "" },
    zotero_group_id: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    zotero_group_name: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    zotero_version: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    zotero_url: { verbose_name: "", verbose_name_plural: "", description: "" },
    csljson: { verbose_name: "", verbose_name_plural: "", description: "" },
    bib: { verbose_name: "", verbose_name_plural: "", description: "" },
    citation: { verbose_name: "", verbose_name_plural: "", description: "" },
    created_by: { verbose_name: "", verbose_name_plural: "", description: "" },
    created_when: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    modified_by: { verbose_name: "", verbose_name_plural: "", description: "" },
    modified_when: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  Entity: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
  },
  Person: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    is_subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    has_birth_event: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    has_death_event: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    carried_out_activity: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  Organisation: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    carried_out_activity: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  Source: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    title: { verbose_name: "", verbose_name_plural: "", description: "" },
  },
  Citation: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    scope: { verbose_name: "", verbose_name_plural: "", description: "" },
    reference: { verbose_name: "", verbose_name_plural: "", description: "" },
  },
  Factoid: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    statements: { verbose_name: "", verbose_name_plural: "", description: "" },
  },
  Statement: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  TemporalStatement: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    when: { verbose_name: "", verbose_name_plural: "", description: "" },
    subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  Naming: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    first_name: { verbose_name: "", verbose_name_plural: "", description: "" },
    last_name: { verbose_name: "", verbose_name_plural: "", description: "" },
    subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  Birth: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    when: { verbose_name: "", verbose_name_plural: "", description: "" },
    person_born: { verbose_name: "", verbose_name_plural: "", description: "" },
  },
  Death: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    when: { verbose_name: "", verbose_name_plural: "", description: "" },
    person_born: { verbose_name: "", verbose_name_plural: "", description: "" },
  },
  Activity: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    when: { verbose_name: "", verbose_name_plural: "", description: "" },
    subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    carried_out_by: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  MakeJam: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    when: { verbose_name: "", verbose_name_plural: "", description: "" },
    was_ordered_in: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    carried_out_by: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  Order: {
    __model: { verbose_name: "", verbose_name_plural: "", description: "" },
    label: { verbose_name: "", verbose_name_plural: "", description: "" },
    when: { verbose_name: "", verbose_name_plural: "", description: "" },
    was_ordered_in: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    subject_of_statement: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
    thing_ordered: {
      verbose_name: "",
      verbose_name_plural: "",
      description: "",
    },
  },
  interface: {
    icon: "🇫🇷",
    log_in: "Se connecter",
    log_out: "Se déconnecter",
    language: "Langue",
    search: "Recherce",
    getMoreResults: "Obtenir plus de résultats",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    log_in_required: "Connexion requise",
    not_logged_in: "Non connecté",
    incorrect_username_or_password:
      "Nom d'utilisateur ou mot de passe incorrect",
    username_or_password_missing: "nom d'utilisateur ou mot de passe manquant",
    something_went_wrong_try_again:
      "Quelque chose n'a pas fonctionné. Réessayez",
    home_page: "Accueil",
    about_page: "À propos de...",
    models: "Modèles",
  },
};

type Dict = typeof en_dict;

export const dictionaries = { en: en_dict, de: de_dict, fr: fr_dict };
