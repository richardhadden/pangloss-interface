const en_dict = {
  ZoteroEntry: {
    __model: {
      verboseName: "Zotero Entry",
      verboseNamePlural: "Zotero Entries",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    zoteroKey: {
      verboseName: "Zotero Key",
      verboseNamePlural: "Zotero Keys",
      description: "",
    },
    zoteroGroupId: {
      verboseName: "Zotero Group Id",
      verboseNamePlural: "Zotero Group Ids",
      description: "",
    },
    zoteroGroupName: {
      verboseName: "Zotero Group Name",
      verboseNamePlural: "Zotero Group Names",
      description: "",
    },
    zoteroVersion: {
      verboseName: "Zotero Version",
      verboseNamePlural: "Zotero Versions",
      description: "",
    },
    zoteroUrl: {
      verboseName: "Zotero Url",
      verboseNamePlural: "Zotero Urls",
      description: "",
    },
    csljson: {
      verboseName: "Csljson",
      verboseNamePlural: "Csljsons",
      description: "",
    },
    bib: { verboseName: "Bib", verboseNamePlural: "Bibs", description: "" },
    citation: {
      verboseName: "Citation",
      verboseNamePlural: "Citations",
      description: "",
    },
    createdBy: {
      verboseName: "Created By",
      verboseNamePlural: "Created Bies",
      description: "",
    },
    createdWhen: {
      verboseName: "Created When",
      verboseNamePlural: "Created Whens",
      description: "",
    },
    modifiedBy: {
      verboseName: "Modified By",
      verboseNamePlural: "Modified Bies",
      description: "",
    },
    modifiedWhen: {
      verboseName: "Modified When",
      verboseNamePlural: "Modified Whens",
      description: "",
    },
  },
  Entity: {
    __model: {
      verboseName: "Entity",
      verboseNamePlural: "Entities",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
  },
  Person: {
    __model: {
      verboseName: "Person",
      verboseNamePlural: "People",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    isSubjectOfStatement: {
      verboseName: "Is Subject of Statement",
      verboseNamePlural: "Is Subject of Statements",
      description: "",
    },
    hasBirthEvent: {
      verboseName: "Has Birth Event",
      verboseNamePlural: "Has Birth Events",
      description: "",
    },
    hasDeathEvent: {
      verboseName: "Has Death Event",
      verboseNamePlural: "Has Death Events",
      description: "",
    },
    carriedOutActivity: {
      verboseName: "Carried Out Activity",
      verboseNamePlural: "Carried Out Activities",
      description: "",
    },
  },
  Organisation: {
    __model: {
      verboseName: "Organisation",
      verboseNamePlural: "Organisations",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    carriedOutActivity: {
      verboseName: "Carried Out Activity",
      verboseNamePlural: "Carried Out Activities",
      description: "",
    },
  },
  Source: {
    __model: {
      verboseName: "Source",
      verboseNamePlural: "Sources",
      description: "A source of something",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    title: {
      verboseName: "Title",
      verboseNamePlural: "Titles",
      description: "",
    },
  },
  Citation: {
    __model: {
      verboseName: "Citation",
      verboseNamePlural: "Citations",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    scope: {
      verboseName: "Scope",
      verboseNamePlural: "Scopes",
      description: "",
    },
    reference: {
      verboseName: "Reference",
      verboseNamePlural: "References",
      description: "",
    },
  },
  Factoid: {
    __model: {
      verboseName: "Factoid",
      verboseNamePlural: "Factoids",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    statements: {
      verboseName: "Statements",
      verboseNamePlural: "Statements",
      description: "",
    },
  },
  Statement: {
    __model: {
      verboseName: "Statement",
      verboseNamePlural: "Statements",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    subjectOfStatement: {
      verboseName: "Subject of Statement",
      verboseNamePlural: "Subject of Statements",
      description: "",
    },
  },
  TemporalStatement: {
    __model: {
      verboseName: "Temporal Statement",
      verboseNamePlural: "Temporal Statements",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "When", verboseNamePlural: "Whens", description: "" },
    subjectOfStatement: {
      verboseName: "Subject of Statement",
      verboseNamePlural: "Subject of Statements",
      description: "",
    },
  },
  Naming: {
    __model: {
      verboseName: "Naming",
      verboseNamePlural: "Namings",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    firstName: {
      verboseName: "First Name",
      verboseNamePlural: "First Names",
      description: "",
    },
    lastName: {
      verboseName: "Last Name",
      verboseNamePlural: "Last Names",
      description: "",
    },
    subjectOfStatement: {
      verboseName: "Subject of Statement",
      verboseNamePlural: "Subject of Statements",
      description: "",
    },
  },
  Birth: {
    __model: {
      verboseName: "Birth",
      verboseNamePlural: "Births",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "When", verboseNamePlural: "Whens", description: "" },
    personBorn: {
      verboseName: "Person Born",
      verboseNamePlural: "Person Borns",
      description: "",
    },
  },
  Death: {
    __model: {
      verboseName: "Death",
      verboseNamePlural: "Deaths",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "When", verboseNamePlural: "Whens", description: "" },
    personBorn: {
      verboseName: "Person Born",
      verboseNamePlural: "Person Borns",
      description: "",
    },
  },
  Activity: {
    __model: {
      verboseName: "Activity",
      verboseNamePlural: "Activities",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "When", verboseNamePlural: "Whens", description: "" },
    subjectOfStatement: {
      verboseName: "Subject of Statement",
      verboseNamePlural: "Subject of Statements",
      description: "",
    },
    carriedOutBy: {
      verboseName: "Carried Out By",
      verboseNamePlural: "Carried Out Bies",
      description: "",
    },
  },
  MakeJam: {
    __model: {
      verboseName: "Make Jam",
      verboseNamePlural: "Make Jams",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "When", verboseNamePlural: "Whens", description: "" },
    wasOrderedIn: {
      verboseName: "Was Ordered In",
      verboseNamePlural: "Was Ordered Ins",
      description: "",
    },
    subjectOfStatement: {
      verboseName: "Subject of Statement",
      verboseNamePlural: "Subject of Statements",
      description: "",
    },
    carriedOutBy: {
      verboseName: "Carried Out By",
      verboseNamePlural: "Carried Out Bies",
      description: "",
    },
  },
  Order: {
    __model: {
      verboseName: "Order",
      verboseNamePlural: "Orders",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "When", verboseNamePlural: "Whens", description: "" },
    wasOrderedIn: {
      verboseName: "Was Ordered In",
      verboseNamePlural: "Was Ordered Ins",
      description: "",
    },
    subjectOfStatement: {
      verboseName: "Subject of Statement",
      verboseNamePlural: "Subject of Statements",
      description: "",
    },
    thingOrdered: {
      verboseName: "Thing Ordered",
      verboseNamePlural: "Thing Ordereds",
      description: "",
    },
  },
  interface: {
    icon: "🇬🇧",
    logIn: "Log In",
    logOut: "Log Out",
    language: "Language",
    search: "Search",
    getMoreResults: "Get More Results",
    username: "Username",
    password: "Password",
    logInRequired: "Log In Required",
    notLoggedIn: "Not Logged In",
    incorrectUsernameOrPassword: "Incorrect Username or Password",
    usernameOrPasswordMissing: "Username or Password Missing",
    somethingWentWrongTryAgain: "Something went wrong. Try again",
    homePage: "Home",
    aboutPage: "About",
    models: "Models",
  },
};
const de_dict: Dict = {
  ZoteroEntry: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    zoteroKey: { verboseName: "", verboseNamePlural: "", description: "" },
    zoteroGroupId: { verboseName: "", verboseNamePlural: "", description: "" },
    zoteroGroupName: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
    zoteroVersion: { verboseName: "", verboseNamePlural: "", description: "" },
    zoteroUrl: { verboseName: "", verboseNamePlural: "", description: "" },
    csljson: { verboseName: "", verboseNamePlural: "", description: "" },
    bib: { verboseName: "", verboseNamePlural: "", description: "" },
    citation: { verboseName: "", verboseNamePlural: "", description: "" },
    createdBy: { verboseName: "", verboseNamePlural: "", description: "" },
    createdWhen: { verboseName: "", verboseNamePlural: "", description: "" },
    modifiedBy: { verboseName: "", verboseNamePlural: "", description: "" },
    modifiedWhen: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Entity: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Person: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    isSubjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
    hasBirthEvent: { verboseName: "", verboseNamePlural: "", description: "" },
    hasDeathEvent: { verboseName: "", verboseNamePlural: "", description: "" },
    carriedOutActivity: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
  },
  Organisation: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    carriedOutActivity: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
  },
  Source: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    title: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Citation: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    scope: { verboseName: "", verboseNamePlural: "", description: "" },
    reference: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Factoid: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    statements: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Statement: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    subjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
  },
  TemporalStatement: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    when: { verboseName: "", verboseNamePlural: "", description: "" },
    subjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
  },
  Naming: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    firstName: { verboseName: "", verboseNamePlural: "", description: "" },
    lastName: { verboseName: "", verboseNamePlural: "", description: "" },
    subjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
  },
  Birth: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    when: { verboseName: "", verboseNamePlural: "", description: "" },
    personBorn: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Death: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    when: { verboseName: "", verboseNamePlural: "", description: "" },
    personBorn: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Activity: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    when: { verboseName: "", verboseNamePlural: "", description: "" },
    subjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
    carriedOutBy: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  MakeJam: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    when: { verboseName: "", verboseNamePlural: "", description: "" },
    wasOrderedIn: { verboseName: "", verboseNamePlural: "", description: "" },
    subjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
    carriedOutBy: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Order: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    when: { verboseName: "", verboseNamePlural: "", description: "" },
    wasOrderedIn: { verboseName: "", verboseNamePlural: "", description: "" },
    subjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
    thingOrdered: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  interface: {
    icon: "🇦🇹",
    logIn: "Anmelden",
    logOut: "Abmelden",
    language: "Sprache",
    search: "Suchen",
    getMoreResults: "Mehr Ergebnisse erzielen",
    username: "Benutzername",
    password: "Passwort",
    logInRequired: "Anmeldung erforderlich",
    notLoggedIn: "Nicht angemeldet",
    incorrectUsernameOrPassword: "Falscher Benutzername oder falsches Passwort",
    usernameOrPasswordMissing: "Benutzername oder Passwort fehlt",
    somethingWentWrongTryAgain:
      "Etwas ist schief gelaufen. Versuchen Sie es noch einmal.",
    homePage: "Home Page",
    aboutPage: "Uber uns",
    models: "Modelle",
  },
};
const fr_dict: Dict = {
  ZoteroEntry: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    zoteroKey: { verboseName: "", verboseNamePlural: "", description: "" },
    zoteroGroupId: { verboseName: "", verboseNamePlural: "", description: "" },
    zoteroGroupName: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
    zoteroVersion: { verboseName: "", verboseNamePlural: "", description: "" },
    zoteroUrl: { verboseName: "", verboseNamePlural: "", description: "" },
    csljson: { verboseName: "", verboseNamePlural: "", description: "" },
    bib: { verboseName: "", verboseNamePlural: "", description: "" },
    citation: { verboseName: "", verboseNamePlural: "", description: "" },
    createdBy: { verboseName: "", verboseNamePlural: "", description: "" },
    createdWhen: { verboseName: "", verboseNamePlural: "", description: "" },
    modifiedBy: { verboseName: "", verboseNamePlural: "", description: "" },
    modifiedWhen: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Entity: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Person: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    isSubjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
    hasBirthEvent: { verboseName: "", verboseNamePlural: "", description: "" },
    hasDeathEvent: { verboseName: "", verboseNamePlural: "", description: "" },
    carriedOutActivity: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
  },
  Organisation: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    carriedOutActivity: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
  },
  Source: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    title: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Citation: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    scope: { verboseName: "", verboseNamePlural: "", description: "" },
    reference: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Factoid: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    statements: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Statement: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    subjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
  },
  TemporalStatement: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    when: { verboseName: "", verboseNamePlural: "", description: "" },
    subjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
  },
  Naming: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    firstName: { verboseName: "", verboseNamePlural: "", description: "" },
    lastName: { verboseName: "", verboseNamePlural: "", description: "" },
    subjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
  },
  Birth: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    when: { verboseName: "", verboseNamePlural: "", description: "" },
    personBorn: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Death: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    when: { verboseName: "", verboseNamePlural: "", description: "" },
    personBorn: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Activity: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    when: { verboseName: "", verboseNamePlural: "", description: "" },
    subjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
    carriedOutBy: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  MakeJam: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    when: { verboseName: "", verboseNamePlural: "", description: "" },
    wasOrderedIn: { verboseName: "", verboseNamePlural: "", description: "" },
    subjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
    carriedOutBy: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  Order: {
    __model: { verboseName: "", verboseNamePlural: "", description: "" },
    label: { verboseName: "", verboseNamePlural: "", description: "" },
    when: { verboseName: "", verboseNamePlural: "", description: "" },
    wasOrderedIn: { verboseName: "", verboseNamePlural: "", description: "" },
    subjectOfStatement: {
      verboseName: "",
      verboseNamePlural: "",
      description: "",
    },
    thingOrdered: { verboseName: "", verboseNamePlural: "", description: "" },
  },
  interface: {
    icon: "🇫🇷",
    logIn: "Se connecter",
    logOut: "Se déconnecter",
    language: "Langue",
    search: "Recherce",
    getMoreResults: "Obtenir plus de résultats",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    logInRequired: "Connexion requise",
    notLoggedIn: "Non connecté",
    incorrectUsernameOrPassword: "Nom d'utilisateur ou mot de passe incorrect",
    usernameOrPasswordMissing: "nom d'utilisateur ou mot de passe manquant",
    somethingWentWrongTryAgain: "Quelque chose n'a pas fonctionné. Réessayez",
    homePage: "Accueil",
    aboutPage: "À propos de...",
    models: "Modèles",
  },
};

type Dict = typeof en_dict;

export const dictionaries = { en: en_dict, de: de_dict, fr: fr_dict };
