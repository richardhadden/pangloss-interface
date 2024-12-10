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
      verboseNamePlural: "Persons",
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
    citation: {
      verboseName: "Citation",
      verboseNamePlural: "Citations",
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
      verboseName: "Is Subject of Statement",
      verboseNamePlural: "Is Subject of Statements",
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
    when: { verboseName: "When", verboseNamePlural: "When", description: "" },
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
    when: { verboseName: "When", verboseNamePlural: "When", description: "" },
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
    when: { verboseName: "When", verboseNamePlural: "When", description: "" },
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
    when: { verboseName: "When", verboseNamePlural: "When", description: "" },
    subjectOfStatement: {
      verboseName: "Subject of Statement",
      verboseNamePlural: "Subject of Statements",
      description: "",
    },
    carriedOutBy: {
      verboseName: "Carried Out By",
      verboseNamePlural: "Carried Out By",
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
    when: { verboseName: "When", verboseNamePlural: "When", description: "" },
    wasOrderedIn: {
      verboseName: "Was Ordered In",
      verboseNamePlural: "Was Ordered In",
      description: "",
    },
    subjectOfStatement: {
      verboseName: "Subject of Statement",
      verboseNamePlural: "Subject of Statements",
      description: "",
    },
    carriedOutBy: {
      verboseName: "Carried Out By",
      verboseNamePlural: "Carried Out By",
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
    when: { verboseName: "When", verboseNamePlural: "When", description: "" },
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
    __model: {
      verboseName: "Zotero-Eintrag",
      verboseNamePlural: "Zotero-Einträge",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
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
    __model: {
      verboseName: "Entität",
      verboseNamePlural: "Entitäten",
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
      verboseNamePlural: "Personen",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    isSubjectOfStatement: {
      verboseName: "Ist Gegenstand der Aussage",
      verboseNamePlural: "Ist Gegenstand von Aussagen",
      description: "",
    },
    hasBirthEvent: {
      verboseName: "hat Geburt Ereignis",
      verboseNamePlural: "hat Geburtsereignisse",
      description: "",
    },
    hasDeathEvent: {
      verboseName: "hat Todesfall",
      verboseNamePlural: "hat Todesfälle",
      description: "",
    },
    carriedOutActivity: {
      verboseName: "Durchgeführte Aktivität",
      verboseNamePlural: "Durchgeführte Aktivitäten",
      description: "",
    },
  },
  Organisation: {
    __model: {
      verboseName: "Organisation",
      verboseNamePlural: "Organisationen",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    carriedOutActivity: {
      verboseName: "Durchgeführte Aktivität",
      verboseNamePlural: "Durchgeführte Aktivitäten",
      description: "",
    },
  },
  Source: {
    __model: {
      verboseName: "Quelle",
      verboseNamePlural: "Quellen",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    title: {
      verboseName: "Titel",
      verboseNamePlural: "Titel",
      description: "",
    },
  },
  Citation: {
    __model: {
      verboseName: "Zitat",
      verboseNamePlural: "Zitate",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    scope: {
      verboseName: "Suche",
      verboseNamePlural: "Suche",
      description: "",
    },
    reference: {
      verboseName: "Referenz",
      verboseNamePlural: "Referenzen",
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
      verboseNamePlural: "Label",
      description: "",
    },
    statements: {
      verboseName: "Aussagen",
      verboseNamePlural: "Aussagen",
      description: "",
    },
    citation: {
      verboseName: "Zitat",
      verboseNamePlural: "Zitaten",
      description: "",
    },
  },
  Statement: {
    __model: {
      verboseName: "Aussage",
      verboseNamePlural: "Aussagen",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Label",
      description: "",
    },
    subjectOfStatement: {
      verboseName: "Gegenstand der Aussage",
      verboseNamePlural: "Gegenstand von Aussagen",
      description: "",
    },
  },
  TemporalStatement: {
    __model: {
      verboseName: "Zeitliche Aussage",
      verboseNamePlural: "Zeitliche Aussagen",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "Wann", verboseNamePlural: "Wann", description: "" },
    subjectOfStatement: {
      verboseName: "Gegenstand der Aussage",
      verboseNamePlural: "Gegenstand von Aussagen",
      description: "",
    },
  },
  Naming: {
    __model: {
      verboseName: "Benennung",
      verboseNamePlural: "Benennungen",
      description: "",
    },
    label: {
      verboseName: "Labels",
      verboseNamePlural: "Labels",
      description: "",
    },
    firstName: {
      verboseName: "Vorname",
      verboseNamePlural: "Vornamen",
      description: "",
    },
    lastName: {
      verboseName: "Nachname",
      verboseNamePlural: "Nachnamen",
      description: "",
    },
    subjectOfStatement: {
      verboseName: "Gegenstand der Aussage",
      verboseNamePlural: "Gegenstand von Aussagen",
      description: "",
    },
  },
  Birth: {
    __model: {
      verboseName: "Geburt",
      verboseNamePlural: "Geburten",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "Wann", verboseNamePlural: "Wann", description: "" },
    personBorn: {
      verboseName: "geborene Person",
      verboseNamePlural: "geborene Personen",
      description: "",
    },
  },
  Death: {
    __model: { verboseName: "Tod", verboseNamePlural: "Tode", description: "" },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "Wann", verboseNamePlural: "Wann", description: "" },
    personBorn: {
      verboseName: "geborene Person",
      verboseNamePlural: "geborene Personen",
      description: "",
    },
  },
  Activity: {
    __model: {
      verboseName: "Aktivität",
      verboseNamePlural: "Aktivitäten",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "Wann", verboseNamePlural: "Wann", description: "" },
    subjectOfStatement: {
      verboseName: "Gegenstand der Aussage",
      verboseNamePlural: "Gegenstand von Aussagen",
      description: "",
    },
    carriedOutBy: {
      verboseName: "durchgeführt von",
      verboseNamePlural: "durchgeführt von",
      description: "",
    },
  },
  MakeJam: {
    __model: {
      verboseName: "Herstellung von Kompott",
      verboseNamePlural: "Herstellungen von Kompott",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "Wann", verboseNamePlural: "Wann", description: "" },
    wasOrderedIn: {
      verboseName: "wurde bestellt in",
      verboseNamePlural: "wurde bestellt in",
      description: "",
    },
    subjectOfStatement: {
      verboseName: "Gegenstand der Aussage",
      verboseNamePlural: "Gegenstanden von Aussagen",
      description: "",
    },
    carriedOutBy: {
      verboseName: "durchgeführt von",
      verboseNamePlural: "durchgeführt von",
      description: "",
    },
  },
  Order: {
    __model: {
      verboseName: "Befehl",
      verboseNamePlural: "Befehlen",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "Wann", verboseNamePlural: "Wann", description: "" },
    wasOrderedIn: {
      verboseName: "wurde bestellt in",
      verboseNamePlural: "wurde bestellt in",
      description: "",
    },
    subjectOfStatement: {
      verboseName: "Gegenstand der Aussage",
      verboseNamePlural: "Gegenstanden von Aussagen",
      description: "",
    },
    thingOrdered: {
      verboseName: "befohlene Tätigkeit",
      verboseNamePlural: "befohlene Tätigkeit",
      description: "",
    },
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
    __model: {
      verboseName: "Entrée Zotero",
      verboseNamePlural: "Entrées Zotero",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
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
    __model: {
      verboseName: "Entité",
      verboseNamePlural: "Entités",
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
      verboseName: "Personne",
      verboseNamePlural: "Personnes",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    isSubjectOfStatement: {
      verboseName: "Fait l'objet d'une déclaration",
      verboseNamePlural: "Fait l'objet de déclarations",
      description: "",
    },
    hasBirthEvent: {
      verboseName: "a un événement de naissance",
      verboseNamePlural: "a des événements de naissance",
      description: "",
    },
    hasDeathEvent: {
      verboseName: "a un événement de décès",
      verboseNamePlural: "a des événements de décès",
      description: "",
    },
    carriedOutActivity: {
      verboseName: "Activité réalisée",
      verboseNamePlural: "Activités réalisées",
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
      verboseName: "Activité réalisée",
      verboseNamePlural: "Activités réalisées",
      description: "",
    },
  },
  Source: {
    __model: {
      verboseName: "Source",
      verboseNamePlural: "Sources",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    title: {
      verboseName: "Titre",
      verboseNamePlural: "Titres",
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
      verboseName: "Étendue",
      verboseNamePlural: "Étendues",
      description: "",
    },
    reference: {
      verboseName: "Référence",
      verboseNamePlural: "Références",
      description: "",
    },
  },
  Factoid: {
    __model: {
      verboseName: "Factoïde",
      verboseNamePlural: "Factoïdes",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Label",
      description: "",
    },
    statements: {
      verboseName: "Déclarations",
      verboseNamePlural: "Déclarations",
      description: "",
    },
    citation: {
      verboseName: "Citation",
      verboseNamePlural: "Citations",
      description: "",
    },
  },
  Statement: {
    __model: {
      verboseName: "Déclaration",
      verboseNamePlural: "Déclarations",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Label",
      description: "",
    },
    subjectOfStatement: {
      verboseName: "objet de la déclaration",
      verboseNamePlural: "objet de déclarations",
      description: "",
    },
  },
  TemporalStatement: {
    __model: {
      verboseName: "Déclaration temporelle",
      verboseNamePlural: "Déclarations temporelles",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "Quand", verboseNamePlural: "Quand", description: "" },
    subjectOfStatement: {
      verboseName: "objet de la déclaration",
      verboseNamePlural: "objet de déclarations",
      description: "",
    },
  },
  Naming: {
    __model: {
      verboseName: "Attribution d'un nom",
      verboseNamePlural: "Attributions de noms",
      description: "",
    },
    label: {
      verboseName: "Labels",
      verboseNamePlural: "Labels",
      description: "",
    },
    firstName: {
      verboseName: "Prénom",
      verboseNamePlural: "Prénoms",
      description: "",
    },
    lastName: {
      verboseName: "Nom de famille",
      verboseNamePlural: "Noms de famille",
      description: "",
    },
    subjectOfStatement: {
      verboseName: "objet de la déclaration",
      verboseNamePlural: "objet de déclarations",
      description: "",
    },
  },
  Birth: {
    __model: {
      verboseName: "Naissance",
      verboseNamePlural: "Naissances",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "Quand", verboseNamePlural: "Quand", description: "" },
    personBorn: {
      verboseName: "Personne née",
      verboseNamePlural: "Personnes nées",
      description: "",
    },
  },
  Death: {
    __model: {
      verboseName: "Mort",
      verboseNamePlural: "Morts",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "Quand", verboseNamePlural: "Quand", description: "" },
    personBorn: {
      verboseName: "Personne née",
      verboseNamePlural: "Personnes nées",
      description: "",
    },
  },
  Activity: {
    __model: {
      verboseName: "Activité",
      verboseNamePlural: "Activités",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "Quand", verboseNamePlural: "Quand", description: "" },
    subjectOfStatement: {
      verboseName: "objet de la déclaration",
      verboseNamePlural: "objet de déclarations",
      description: "",
    },
    carriedOutBy: {
      verboseName: "réalisée par",
      verboseNamePlural: "réalisée par",
      description: "",
    },
  },
  MakeJam: {
    __model: {
      verboseName: "Fabrication de confiture",
      verboseNamePlural: "Fabrications de confitures",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "Quand", verboseNamePlural: "Quand", description: "" },
    wasOrderedIn: {
      verboseName: "a été ordonnée dans",
      verboseNamePlural: "a été ordonnée dans",
      description: "",
    },
    subjectOfStatement: {
      verboseName: "objet de la déclaration",
      verboseNamePlural: "objet de déclarations",
      description: "",
    },
    carriedOutBy: {
      verboseName: "réalisée par",
      verboseNamePlural: "réalisée par",
      description: "",
    },
  },
  Order: {
    __model: {
      verboseName: "Ordre",
      verboseNamePlural: "Ordres",
      description: "",
    },
    label: {
      verboseName: "Label",
      verboseNamePlural: "Labels",
      description: "",
    },
    when: { verboseName: "Quand", verboseNamePlural: "Quand", description: "" },
    wasOrderedIn: {
      verboseName: "a été ordonnée dans",
      verboseNamePlural: "a été ordonnée dans",
      description: "",
    },
    subjectOfStatement: {
      verboseName: "objet de la déclaration",
      verboseNamePlural: "objet de déclarations",
      description: "",
    },
    thingOrdered: {
      verboseName: "Chose commandée",
      verboseNamePlural: "Choses commandées",
      description: "",
    },
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
