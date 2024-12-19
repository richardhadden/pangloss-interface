import typia, { tags } from "typia";

export type ZoteroEntry = {
  type: "ZoteroEntry";
  label: string;
  zoteroKey: string;
  zoteroGroupId: number;
  zoteroGroupName: string;
  zoteroVersion: number;
  zoteroUrl: string;
  csljson: string;
  bib: string;
  citation: string;
  createdBy: string;
  createdWhen: string;
  modifiedBy: string;
  modifiedWhen: string;
};

export type Citation = {
  type: "Citation";
  label: string;
  citedWork: ZoteroEntryReferenceSet[];
  scope: string;
};

export type Factoid = {
  type: "Factoid";
  label: string;
  citation: Omit<Citation, "label">[];
  statements: (
    | Statement
    | Order
    | AssemblyOfCompositePhysicalObject
    | CreationAct
    | Payment
    | Naming
  )[];
};

export type Entity = {
  type: "Entity";
  label: string;
};

export type Person = {
  type: "Person";
  label: string;
};

export type Place = {
  type: "Place";
  label: string;
};

export type Organisation = {
  type: "Organisation";
  label: string;
};

export type PhysicalObject = {
  type: "PhysicalObject";
  label: string;
};

export type CompositePhysicalObject = {
  type: "CompositePhysicalObject";
  label: string;
};

export type ConceptualEntity = {
  type: "ConceptualEntity";
  label: string;
};

export type CompositeConceptualEntity = {
  type: "CompositeConceptualEntity";
  label: string;
};

export type PhysicalTextualObject = {
  type: "PhysicalTextualObject";
  label: string;
};

export type CompositePhysicalTextualObject = {
  type: "CompositePhysicalTextualObject";
  label: string;
};

export type TextualWork = {
  type: "TextualWork";
  label: string;
};

export type CompositeTextualWork = {
  type: "CompositeTextualWork";
  label: string;
};

export type Statement = {
  type: "Statement";
  label: string;
};

export type Naming = {
  type: "Naming";
  label: string;
  namedPerson: (PersonReferenceSet | DudeReferenceSet)[];
  forename: string;
  surname: string;
  roleName: string;
  addName: string;
  genName: string;
};

export type CreationAct = {
  type: "CreationAct";
  label: string;
  thingCreated: (
    | ConceptualEntityReferenceSet
    | PhysicalObjectReferenceSet
    | CompositePhysicalObjectReferenceSet
    | CompositePhysicalTextualObjectReferenceSet
    | TextualWorkReferenceSet
    | PhysicalTextualObjectReferenceSet
  )[];
  createdBy: (
    | WithProxy__Identification__Actor____
    | WithProxy__Identification__Person____
    | Identification__Person__
    | Identification__Actor__
  )[];
};

export type AssemblyOfCompositePhysicalObject = {
  type: "AssemblyOfCompositePhysicalObject";
  label: string;
  thingCreated: (
    | ConceptualEntityReferenceSet
    | PhysicalObjectReferenceSet
    | CompositePhysicalObjectReferenceSet
    | CompositePhysicalTextualObjectReferenceSet
    | TextualWorkReferenceSet
    | PhysicalTextualObjectReferenceSet
  )[];
  componentParts: (
    | CompositePhysicalObjectReferenceSet
    | CompositePhysicalTextualObjectReferenceSet
    | PhysicalObjectReferenceSet
    | PhysicalTextualObjectReferenceSet
  )[];
  compositeObjectCreated: (
    | CompositePhysicalObjectReferenceSet
    | CompositePhysicalTextualObjectReferenceSet
  )[];
  assembledBy: OrganisationReferenceSet[];
};

export type Payment = {
  type: "Payment";
  label: string;
};

export type Order = {
  type: "Order";
  label: string;
  personGivingOrder: (
    | Identification__Actor__
    | WithProxy__Identification__Person____
    | Identification__Person__
    | WithProxy__Identification__Actor____
  )[];
  personReceivingOrder: (
    | Identification__Actor__
    | WithProxy__Identification__Person____
    | Identification__Person__
    | WithProxy__Identification__Actor____
  )[];
  thingOrdered: Payment[];
};

export type Dude = {
  type: "Dude";
  label: string;
};

export type Animal = {
  type: "Animal";
  label: string;
};

export type ZoteroEntryEditView = {
  type: "ZoteroEntry";
  label: string;
  zoteroKey: string;
  zoteroGroupId: number;
  zoteroGroupName: string;
  zoteroVersion: number;
  zoteroUrl: string;
  csljson: string;
  bib: string;
  citation: string;
  createdBy: string;
  createdWhen: string;
  modifiedBy: string;
  modifiedWhen: string;
};

export type CitationEditView = {
  type: "Citation";
  label: string;
  citedWork: ZoteroEntryReferenceSet[];
  scope: string;
};

export type FactoidEditView = {
  type: "Factoid";
  label: string;
  citation: Omit<Citation & EditViewBase, "label">[];
  statements: (
    | (Statement & EditViewBase)
    | (Order & EditViewBase)
    | (AssemblyOfCompositePhysicalObject & EditViewBase)
    | (CreationAct & EditViewBase)
    | (Payment & EditViewBase)
    | (Naming & EditViewBase)
  )[];
};

export type EntityEditView = {
  type: "Entity";
  label: string;
};

export type PersonEditView = {
  type: "Person";
  label: string;
};

export type PlaceEditView = {
  type: "Place";
  label: string;
};

export type OrganisationEditView = {
  type: "Organisation";
  label: string;
};

export type PhysicalObjectEditView = {
  type: "PhysicalObject";
  label: string;
};

export type CompositePhysicalObjectEditView = {
  type: "CompositePhysicalObject";
  label: string;
};

export type ConceptualEntityEditView = {
  type: "ConceptualEntity";
  label: string;
};

export type CompositeConceptualEntityEditView = {
  type: "CompositeConceptualEntity";
  label: string;
};

export type PhysicalTextualObjectEditView = {
  type: "PhysicalTextualObject";
  label: string;
};

export type CompositePhysicalTextualObjectEditView = {
  type: "CompositePhysicalTextualObject";
  label: string;
};

export type TextualWorkEditView = {
  type: "TextualWork";
  label: string;
};

export type CompositeTextualWorkEditView = {
  type: "CompositeTextualWork";
  label: string;
};

export type StatementEditView = {
  type: "Statement";
  label: string;
};

export type NamingEditView = {
  type: "Naming";
  label: string;
  namedPerson: (PersonReferenceSet | DudeReferenceSet)[];
  forename: string;
  surname: string;
  roleName: string;
  addName: string;
  genName: string;
};

export type CreationActEditView = {
  type: "CreationAct";
  label: string;
  thingCreated: (
    | ConceptualEntityReferenceSet
    | PhysicalObjectReferenceSet
    | CompositePhysicalObjectReferenceSet
    | CompositePhysicalTextualObjectReferenceSet
    | TextualWorkReferenceSet
    | PhysicalTextualObjectReferenceSet
  )[];
  createdBy: (
    | (WithProxy__Identification__Actor____ & EditViewBase)
    | (WithProxy__Identification__Person____ & EditViewBase)
    | (Identification__Person__ & EditViewBase)
    | (Identification__Actor__ & EditViewBase)
  )[];
};

export type AssemblyOfCompositePhysicalObjectEditView = {
  type: "AssemblyOfCompositePhysicalObject";
  label: string;
  thingCreated: (
    | ConceptualEntityReferenceSet
    | PhysicalObjectReferenceSet
    | CompositePhysicalObjectReferenceSet
    | CompositePhysicalTextualObjectReferenceSet
    | TextualWorkReferenceSet
    | PhysicalTextualObjectReferenceSet
  )[];
  componentParts: (
    | CompositePhysicalObjectReferenceSet
    | CompositePhysicalTextualObjectReferenceSet
    | PhysicalObjectReferenceSet
    | PhysicalTextualObjectReferenceSet
  )[];
  compositeObjectCreated: (
    | CompositePhysicalObjectReferenceSet
    | CompositePhysicalTextualObjectReferenceSet
  )[];
  assembledBy: OrganisationReferenceSet[];
};

export type PaymentEditView = {
  type: "Payment";
  label: string;
};

export type OrderEditView = {
  type: "Order";
  label: string;
  personGivingOrder: (
    | (Identification__Actor__ & EditViewBase)
    | (WithProxy__Identification__Person____ & EditViewBase)
    | (Identification__Person__ & EditViewBase)
    | (WithProxy__Identification__Actor____ & EditViewBase)
  )[];
  personReceivingOrder: (
    | (Identification__Actor__ & EditViewBase)
    | (WithProxy__Identification__Person____ & EditViewBase)
    | (Identification__Person__ & EditViewBase)
    | (WithProxy__Identification__Actor____ & EditViewBase)
  )[];
  thingOrdered: (Payment & EditViewBase)[];
};

export type DudeEditView = {
  type: "Dude";
  label: string;
};

export type AnimalEditView = {
  type: "Animal";
  label: string;
};

export type ZoteroEntryEditSet = {
  type: "ZoteroEntry";
  label: string;
  zoteroKey: string;
  zoteroGroupId: number;
  zoteroGroupName: string;
  zoteroVersion: number;
  zoteroUrl: string;
  csljson: string;
  bib: string;
  citation: string;
  createdBy: string;
  createdWhen: string;
  modifiedBy: string;
  modifiedWhen: string;
} & EditSetBase;

export type CitationEditSet = {
  type: "Citation";
  label: string;
  citedWork: ZoteroEntryReferenceSet[];
  scope: string;
} & EditSetBase;

export type FactoidEditSet = {
  type: "Factoid";
  label: string;
  citation: (
    | Omit<Citation, "label">
    | Omit<CitationEditSet & EditViewBase, "label">
  )[];
  statements: (
    | (Statement | StatementEditSet)
    | (Order | OrderEditSet)
    | (
        | AssemblyOfCompositePhysicalObject
        | AssemblyOfCompositePhysicalObjectEditSet
      )
    | (CreationAct | CreationActEditSet)
    | (Payment | PaymentEditSet)
    | (Naming | NamingEditSet)
  )[];
} & EditSetBase;

export type EntityEditSet = {
  type: "Entity";
  label: string;
} & EditSetBase;

export type PersonEditSet = {
  type: "Person";
  label: string;
} & EditSetBase;

export type PlaceEditSet = {
  type: "Place";
  label: string;
} & EditSetBase;

export type OrganisationEditSet = {
  type: "Organisation";
  label: string;
} & EditSetBase;

export type PhysicalObjectEditSet = {
  type: "PhysicalObject";
  label: string;
} & EditSetBase;

export type CompositePhysicalObjectEditSet = {
  type: "CompositePhysicalObject";
  label: string;
} & EditSetBase;

export type ConceptualEntityEditSet = {
  type: "ConceptualEntity";
  label: string;
} & EditSetBase;

export type CompositeConceptualEntityEditSet = {
  type: "CompositeConceptualEntity";
  label: string;
} & EditSetBase;

export type PhysicalTextualObjectEditSet = {
  type: "PhysicalTextualObject";
  label: string;
} & EditSetBase;

export type CompositePhysicalTextualObjectEditSet = {
  type: "CompositePhysicalTextualObject";
  label: string;
} & EditSetBase;

export type TextualWorkEditSet = {
  type: "TextualWork";
  label: string;
} & EditSetBase;

export type CompositeTextualWorkEditSet = {
  type: "CompositeTextualWork";
  label: string;
} & EditSetBase;

export type StatementEditSet = {
  type: "Statement";
  label: string;
} & EditSetBase;

export type NamingEditSet = {
  type: "Naming";
  label: string;
  namedPerson: (PersonReferenceSet | DudeReferenceSet)[];
  forename: string;
  surname: string;
  roleName: string;
  addName: string;
  genName: string;
} & EditSetBase;

export type CreationActEditSet = {
  type: "CreationAct";
  label: string;
  thingCreated: (
    | ConceptualEntityReferenceSet
    | PhysicalObjectReferenceSet
    | CompositePhysicalObjectReferenceSet
    | CompositePhysicalTextualObjectReferenceSet
    | TextualWorkReferenceSet
    | PhysicalTextualObjectReferenceSet
  )[];
  createdBy: (
    | (
        | WithProxy__Identification__Actor____
        | (WithProxy__Identification__Actor____ & EditViewBase)
      )
    | (
        | WithProxy__Identification__Person____
        | (WithProxy__Identification__Person____ & EditViewBase)
      )
    | (Identification__Person__ | (Identification__Person__ & EditViewBase))
    | (Identification__Actor__ | (Identification__Actor__ & EditViewBase))
  )[];
} & EditSetBase;

export type AssemblyOfCompositePhysicalObjectEditSet = {
  type: "AssemblyOfCompositePhysicalObject";
  label: string;
  thingCreated: (
    | ConceptualEntityReferenceSet
    | PhysicalObjectReferenceSet
    | CompositePhysicalObjectReferenceSet
    | CompositePhysicalTextualObjectReferenceSet
    | TextualWorkReferenceSet
    | PhysicalTextualObjectReferenceSet
  )[];
  componentParts: (
    | CompositePhysicalObjectReferenceSet
    | CompositePhysicalTextualObjectReferenceSet
    | PhysicalObjectReferenceSet
    | PhysicalTextualObjectReferenceSet
  )[];
  compositeObjectCreated: (
    | CompositePhysicalObjectReferenceSet
    | CompositePhysicalTextualObjectReferenceSet
  )[];
  assembledBy: OrganisationReferenceSet[];
} & EditSetBase;

export type PaymentEditSet = {
  type: "Payment";
  label: string;
} & EditSetBase;

export type OrderEditSet = {
  type: "Order";
  label: string;
  personGivingOrder: (
    | (Identification__Actor__ | (Identification__Actor__ & EditViewBase))
    | (
        | WithProxy__Identification__Person____
        | (WithProxy__Identification__Person____ & EditViewBase)
      )
    | (Identification__Person__ | (Identification__Person__ & EditViewBase))
    | (
        | WithProxy__Identification__Actor____
        | (WithProxy__Identification__Actor____ & EditViewBase)
      )
  )[];
  personReceivingOrder: (
    | (Identification__Actor__ | (Identification__Actor__ & EditViewBase))
    | (
        | WithProxy__Identification__Person____
        | (WithProxy__Identification__Person____ & EditViewBase)
      )
    | (Identification__Person__ | (Identification__Person__ & EditViewBase))
    | (
        | WithProxy__Identification__Actor____
        | (WithProxy__Identification__Actor____ & EditViewBase)
      )
  )[];
  thingOrdered: (Payment | PaymentEditSet)[];
} & EditSetBase;

export type DudeEditSet = {
  type: "Dude";
  label: string;
} & EditSetBase;

export type AnimalEditSet = {
  type: "Animal";
  label: string;
} & EditSetBase;

export type ZoteroEntryView = ZoteroEntryEditView & {
  isSourceOf?: (CitationReferenceView | FactoidReferenceView)[];
};
export type CitationView = CitationEditView;
export type FactoidView = FactoidEditView;
export type EntityView = EntityEditView;
export type PersonView = PersonEditView & {
  isNamedIn?: NamingReferenceView[];
  wasCreatorIn?: (
    | CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Person__View
    | CreationAct__from__created_by__Identification__Person____Person__View
    | CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Person__View
    | CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Person__View
    | CreationAct__from__created_by__Identification__Actor____Person__View
    | CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Person__View
  )[];
  isProxyIn?: (
    | Order__from__proxy__person_receiving_order__Person__View
    | Order__from__proxy__person_receiving_order__Person__View
    | Order__from__proxy__person_receiving_order__Person__View
    | Order__from__proxy__person_receiving_order__Person__View
    | Order__from__proxy__person_giving_order__Person__View
    | Order__from__proxy__person_giving_order__Person__View
    | Order__from__proxy__person_giving_order__Person__View
    | CreationAct__from__proxy__created_by__Person__View
    | CreationAct__from__proxy__created_by__Person__View
    | CreationAct__from__proxy__created_by__Person__View
    | CreationAct__from__proxy__created_by__Person__View
    | Order__from__proxy__person_giving_order__Person__View
  )[];
  givesOrder?: (
    | Order__from__person_giving_order__Identification__Actor____Person__View
    | Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Person__View
    | Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Person__View
    | Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Person__View
    | Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Person__View
    | Order__from__person_giving_order__Identification__Person____Person__View
  )[];
  receivesOrder?: (
    | Order__from__person_receiving_order__Identification__Person____Person__View
    | Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Person__View
    | Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Person__View
    | Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Person__View
    | Order__from__person_receiving_order__Identification__Actor____Person__View
    | Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Person__View
  )[];
};
export type PlaceView = PlaceEditView;
export type OrganisationView = OrganisationEditView & {
  assembledCompositeObject?: AssemblyOfCompositePhysicalObjectReferenceView[];
};
export type PhysicalObjectView = PhysicalObjectEditView & {
  wasCreatedIn?: (
    | CreationActReferenceView
    | AssemblyOfCompositePhysicalObjectReferenceView
  )[];
  isComponentAssembledIn?: AssemblyOfCompositePhysicalObjectReferenceView[];
};
export type CompositePhysicalObjectView = CompositePhysicalObjectEditView & {
  wasCreatedIn?: (
    | CreationActReferenceView
    | AssemblyOfCompositePhysicalObjectReferenceView
  )[];
  isComponentAssembledIn?: AssemblyOfCompositePhysicalObjectReferenceView[];
  assembledIn?: AssemblyOfCompositePhysicalObjectReferenceView[];
};
export type ConceptualEntityView = ConceptualEntityEditView & {
  wasCreatedIn?: (
    | CreationActReferenceView
    | AssemblyOfCompositePhysicalObjectReferenceView
  )[];
};
export type CompositeConceptualEntityView = CompositeConceptualEntityEditView;
export type PhysicalTextualObjectView = PhysicalTextualObjectEditView & {
  wasCreatedIn?: (
    | AssemblyOfCompositePhysicalObjectReferenceView
    | CreationActReferenceView
  )[];
  isComponentAssembledIn?: AssemblyOfCompositePhysicalObjectReferenceView[];
};
export type CompositePhysicalTextualObjectView =
  CompositePhysicalTextualObjectEditView & {
    wasCreatedIn?: (
      | AssemblyOfCompositePhysicalObjectReferenceView
      | CreationActReferenceView
    )[];
    isComponentAssembledIn?: AssemblyOfCompositePhysicalObjectReferenceView[];
    assembledIn?: AssemblyOfCompositePhysicalObjectReferenceView[];
  };
export type TextualWorkView = TextualWorkEditView & {
  wasCreatedIn?: (
    | AssemblyOfCompositePhysicalObjectReferenceView
    | CreationActReferenceView
  )[];
};
export type CompositeTextualWorkView = CompositeTextualWorkEditView;
export type StatementView = StatementEditView & {
  isStatementIn?: FactoidReferenceView[];
};
export type NamingView = NamingEditView & {
  isStatementIn?: FactoidReferenceView[];
};
export type CreationActView = CreationActEditView & {
  isStatementIn?: FactoidReferenceView[];
};
export type AssemblyOfCompositePhysicalObjectView =
  AssemblyOfCompositePhysicalObjectEditView & {
    isStatementIn?: FactoidReferenceView[];
  };
export type PaymentView = PaymentEditView & {
  isStatementIn?: FactoidReferenceView[];
  isOrderedIn?: OrderReferenceView[];
};
export type OrderView = OrderEditView & {
  isStatementIn?: FactoidReferenceView[];
};
export type DudeView = DudeEditView & {
  isNamedIn?: NamingReferenceView[];
  wasCreatorIn?: (
    | CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Dude__View
    | CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Dude__View
    | CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Dude__View
    | CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Dude__View
    | CreationAct__from__created_by__Identification__Actor____Dude__View
    | CreationAct__from__created_by__Identification__Person____Dude__View
  )[];
  isProxyIn?: (
    | CreationAct__from__proxy__created_by__Dude__View
    | CreationAct__from__proxy__created_by__Dude__View
    | Order__from__proxy__person_receiving_order__Dude__View
    | Order__from__proxy__person_receiving_order__Dude__View
    | Order__from__proxy__person_giving_order__Dude__View
    | Order__from__proxy__person_giving_order__Dude__View
    | Order__from__proxy__person_giving_order__Dude__View
    | CreationAct__from__proxy__created_by__Dude__View
    | Order__from__proxy__person_giving_order__Dude__View
    | Order__from__proxy__person_receiving_order__Dude__View
    | Order__from__proxy__person_receiving_order__Dude__View
    | CreationAct__from__proxy__created_by__Dude__View
  )[];
  givesOrder?: (
    | Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Dude__View
    | Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Dude__View
    | Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__View
    | Order__from__person_giving_order__Identification__Actor____Dude__View
    | Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Dude__View
    | Order__from__person_giving_order__Identification__Person____Dude__View
  )[];
  receivesOrder?: (
    | Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Dude__View
    | Order__from__person_receiving_order__Identification__Person____Dude__View
    | Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Dude__View
    | Order__from__person_receiving_order__Identification__Actor____Dude__View
    | Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Dude__View
    | Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__View
  )[];
};
export type AnimalView = AnimalEditView;

export type CompositePhysicalTextualObjectReferenceView = {
  type: "CompositePhysicalTextualObject";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type Order__from__proxy__person_receiving_order__Person__View = {
  uuid: string;
  type: "Order__from__proxy__person_receiving_order__Person__View";
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  personReceivingOrder: (
    | Identification__Actor__View
    | WithProxy__Identification__Person____View
    | Identification__Person__View
    | WithProxy__Identification__Actor____View
  )[];
  edgeProperties: Certainty;
};

export type Identification__Person__ = {
  target: (
    | (PersonReferenceSet & { edgeProperties: Certainty })
    | (DudeReferenceSet & { edgeProperties: Certainty })
  )[];
  type: "Identification[Person]";
};

export type DudeReferenceView = {
  type: "Dude";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type WithProxy__Identification__Person____ = {
  target: (Identification__Actor__ | Identification__Person__)[];
  type: "WithProxy[Identification[Person]]";
  proxy: (Identification__Actor__ | Identification__Person__)[];
};

export type OrganisationReferenceView = {
  type: "Organisation";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type Order__from__proxy__person_giving_order__Dude__View = {
  uuid: string;
  type: "Order__from__proxy__person_giving_order__Dude__View";
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  personGivingOrder: (
    | Identification__Actor__View
    | WithProxy__Identification__Person____View
    | Identification__Person__View
    | WithProxy__Identification__Actor____View
  )[];
  edgeProperties: Certainty;
};

export type Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Person__View =
  {
    uuid: string;
    type: "Order__from__person_receiving_order__Identification[Actor]__WithProxy[Identification[Actor]]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personReceivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type Order__from__person_giving_order__Identification__Actor____Person__View =
  {
    uuid: string;
    type: "Order__from__person_giving_order__Identification[Actor]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personGivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type CreationAct__from__proxy__created_by__Person__View = {
  uuid: string;
  type: "CreationAct__from__proxy__created_by__Person__View";
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  createdBy: (
    | WithProxy__Identification__Actor____View
    | WithProxy__Identification__Person____View
    | Identification__Person__View
    | Identification__Actor__View
  )[];
  edgeProperties: Certainty;
};

export type OrderReferenceView = {
  type: "Order";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type Order__from__proxy__person_receiving_order__Dude__View = {
  uuid: string;
  type: "Order__from__proxy__person_receiving_order__Dude__View";
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  personReceivingOrder: (
    | Identification__Actor__View
    | WithProxy__Identification__Person____View
    | Identification__Person__View
    | WithProxy__Identification__Actor____View
  )[];
  edgeProperties: Certainty;
};

export type ZoteroEntryReferenceSet = {
  type: "ZoteroEntry";
  uuid: string;
};

export type Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Dude__View =
  {
    uuid: string;
    type: "Order__from__person_receiving_order__Identification[Person]__WithProxy[Identification[Person]]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personReceivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type TextualWorkReferenceView = {
  type: "TextualWork";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type PhysicalObjectReferenceView = {
  type: "PhysicalObject";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type Order__from__person_giving_order__Identification__Actor____Dude__View =
  {
    uuid: string;
    type: "Order__from__person_giving_order__Identification[Actor]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personGivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type CreationAct__from__created_by__Identification__Actor____Person__View =
  {
    uuid: string;
    type: "CreationAct__from__created_by__Identification[Actor]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    createdBy: (
      | WithProxy__Identification__Actor____View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | Identification__Actor__View
    )[];
    edgeProperties: Certainty;
  };

export type TextualWorkReferenceSet = {
  type: "TextualWork";
  uuid: string;
};

export type Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__View =
  {
    uuid: string;
    type: "Order__from__person_receiving_order__Identification[Actor]__WithProxy[Identification[Actor]]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personReceivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type OrganisationReferenceSet = {
  type: "Organisation";
  uuid: string;
};

export type CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Person__View =
  {
    uuid: string;
    type: "CreationAct__from__created_by__Identification[Person]__WithProxy[Identification[Actor]]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    createdBy: (
      | WithProxy__Identification__Actor____View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | Identification__Actor__View
    )[];
    edgeProperties: Certainty;
  };

export type CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Dude__View =
  {
    uuid: string;
    type: "CreationAct__from__created_by__Identification[Person]__WithProxy[Identification[Actor]]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    createdBy: (
      | WithProxy__Identification__Actor____View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | Identification__Actor__View
    )[];
    edgeProperties: Certainty;
  };

export type CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Dude__View =
  {
    uuid: string;
    type: "CreationAct__from__created_by__Identification[Person]__WithProxy[Identification[Person]]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    createdBy: (
      | WithProxy__Identification__Actor____View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | Identification__Actor__View
    )[];
    edgeProperties: Certainty;
  };

export type CompositeTextualWorkReferenceView = {
  type: "CompositeTextualWork";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type CompositePhysicalObjectReferenceView = {
  type: "CompositePhysicalObject";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type Order__from__proxy__person_giving_order__Person__View = {
  uuid: string;
  type: "Order__from__proxy__person_giving_order__Person__View";
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  personGivingOrder: (
    | Identification__Actor__View
    | WithProxy__Identification__Person____View
    | Identification__Person__View
    | WithProxy__Identification__Actor____View
  )[];
  edgeProperties: Certainty;
};

export type Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Dude__View =
  {
    uuid: string;
    type: "Order__from__person_receiving_order__Identification[Person]__WithProxy[Identification[Actor]]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personReceivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type ConceptualEntityReferenceSet = {
  type: "ConceptualEntity";
  uuid: string;
};

export type CreationAct__from__created_by__Identification__Actor____Dude__View =
  {
    uuid: string;
    type: "CreationAct__from__created_by__Identification[Actor]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    createdBy: (
      | WithProxy__Identification__Actor____View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | Identification__Actor__View
    )[];
    edgeProperties: Certainty;
  };

export type CreationAct__from__proxy__created_by__Dude__View = {
  uuid: string;
  type: "CreationAct__from__proxy__created_by__Dude__View";
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  createdBy: (
    | WithProxy__Identification__Actor____View
    | WithProxy__Identification__Person____View
    | Identification__Person__View
    | Identification__Actor__View
  )[];
  edgeProperties: Certainty;
};

export type CreationAct__from__created_by__Identification__Person____Person__View =
  {
    uuid: string;
    type: "CreationAct__from__created_by__Identification[Person]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    createdBy: (
      | WithProxy__Identification__Actor____View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | Identification__Actor__View
    )[];
    edgeProperties: Certainty;
  };

export type Certainty = {
  value: number;
};

export type CreationAct__from__created_by__Identification__Person____Dude__View =
  {
    uuid: string;
    type: "CreationAct__from__created_by__Identification[Person]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    createdBy: (
      | WithProxy__Identification__Actor____View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | Identification__Actor__View
    )[];
    edgeProperties: Certainty;
  };

export type CitationReferenceView = {
  type: "Citation";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type Identification__Person__View = {
  type: "Identification[Person]";
  uuid: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  target: (
    | Identification__Person____target__Person__ReferenceView
    | Identification__Person____target__Dude__ReferenceView
  )[];
};

export type ConceptualEntityReferenceView = {
  type: "ConceptualEntity";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Dude__View =
  {
    uuid: string;
    type: "Order__from__person_giving_order__Identification[Actor]__WithProxy[Identification[Person]]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personGivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Person__View =
  {
    uuid: string;
    type: "Order__from__person_giving_order__Identification[Actor]__WithProxy[Identification[Person]]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personGivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type CreationActReferenceView = {
  type: "CreationAct";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type Identification__Actor__ = {
  target: (
    | (PersonReferenceSet & { edgeProperties: Certainty })
    | (DudeReferenceSet & { edgeProperties: Certainty })
  )[];
  type: "Identification[Actor]";
};

export type FactoidReferenceView = {
  type: "Factoid";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Person__View =
  {
    uuid: string;
    type: "CreationAct__from__created_by__Identification[Actor]__WithProxy[Identification[Actor]]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    createdBy: (
      | WithProxy__Identification__Actor____View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | Identification__Actor__View
    )[];
    edgeProperties: Certainty;
  };

export type Order__from__person_giving_order__Identification__Person____Person__View =
  {
    uuid: string;
    type: "Order__from__person_giving_order__Identification[Person]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personGivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Person__View =
  {
    uuid: string;
    type: "Order__from__person_giving_order__Identification[Person]__WithProxy[Identification[Person]]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personGivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Person__View =
  {
    uuid: string;
    type: "Order__from__person_giving_order__Identification[Person]__WithProxy[Identification[Actor]]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personGivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type CompositePhysicalTextualObjectReferenceSet = {
  type: "CompositePhysicalTextualObject";
  uuid: string;
};

export type WithProxy__Identification__Actor____ = {
  target: (Identification__Actor__ | Identification__Person__)[];
  type: "WithProxy[Identification[Actor]]";
  proxy: (Identification__Actor__ | Identification__Person__)[];
};

export type Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Person__View =
  {
    uuid: string;
    type: "Order__from__person_receiving_order__Identification[Actor]__WithProxy[Identification[Person]]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personReceivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Dude__View =
  {
    uuid: string;
    type: "Order__from__person_giving_order__Identification[Person]__WithProxy[Identification[Person]]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personGivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Dude__View =
  {
    uuid: string;
    type: "Order__from__person_giving_order__Identification[Person]__WithProxy[Identification[Actor]]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personGivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type WithProxy__Identification__Person____View = {
  type: "WithProxy[Identification[Person]]";
  uuid: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  target: (Identification__Actor__View | Identification__Person__View)[];
  proxy: (Identification__Actor__View | Identification__Person__View)[];
};

export type Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Person__View =
  {
    uuid: string;
    type: "Order__from__person_receiving_order__Identification[Person]__WithProxy[Identification[Actor]]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personReceivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type CompositeConceptualEntityReferenceView = {
  type: "CompositeConceptualEntity";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type Order__from__person_receiving_order__Identification__Actor____Person__View =
  {
    uuid: string;
    type: "Order__from__person_receiving_order__Identification[Actor]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personReceivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type CompositePhysicalObjectReferenceSet = {
  type: "CompositePhysicalObject";
  uuid: string;
};

export type CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Person__View =
  {
    uuid: string;
    type: "CreationAct__from__created_by__Identification[Actor]__WithProxy[Identification[Person]]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    createdBy: (
      | WithProxy__Identification__Actor____View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | Identification__Actor__View
    )[];
    edgeProperties: Certainty;
  };

export type Order__from__person_receiving_order__Identification__Actor____Dude__View =
  {
    uuid: string;
    type: "Order__from__person_receiving_order__Identification[Actor]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personReceivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type AssemblyOfCompositePhysicalObjectReferenceView = {
  type: "AssemblyOfCompositePhysicalObject";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type NamingReferenceView = {
  type: "Naming";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Dude__View =
  {
    uuid: string;
    type: "CreationAct__from__created_by__Identification[Actor]__WithProxy[Identification[Actor]]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    createdBy: (
      | WithProxy__Identification__Actor____View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | Identification__Actor__View
    )[];
    edgeProperties: Certainty;
  };

export type Order__from__person_receiving_order__Identification__Person____Dude__View =
  {
    uuid: string;
    type: "Order__from__person_receiving_order__Identification[Person]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personReceivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type EntityReferenceView = {
  type: "Entity";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type Order__from__person_giving_order__Identification__Person____Dude__View =
  {
    uuid: string;
    type: "Order__from__person_giving_order__Identification[Person]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personGivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type AnimalReferenceView = {
  type: "Animal";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type Identification__Person____target__Dude__ReferenceView = {
  type: "Dude";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  edgeProperties: Certainty;
};

export type ZoteroEntryReferenceView = {
  type: "ZoteroEntry";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  citation: string;
};

export type Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Dude__View =
  {
    uuid: string;
    type: "Order__from__person_receiving_order__Identification[Actor]__WithProxy[Identification[Person]]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personReceivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type WithProxy__Identification__Actor____View = {
  type: "WithProxy[Identification[Actor]]";
  uuid: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  target: (Identification__Actor__View | Identification__Person__View)[];
  proxy: (Identification__Actor__View | Identification__Person__View)[];
};

export type CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Dude__View =
  {
    uuid: string;
    type: "CreationAct__from__created_by__Identification[Actor]__WithProxy[Identification[Person]]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    createdBy: (
      | WithProxy__Identification__Actor____View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | Identification__Actor__View
    )[];
    edgeProperties: Certainty;
  };

export type CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Person__View =
  {
    uuid: string;
    type: "CreationAct__from__created_by__Identification[Person]__WithProxy[Identification[Person]]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    createdBy: (
      | WithProxy__Identification__Actor____View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | Identification__Actor__View
    )[];
    edgeProperties: Certainty;
  };

export type PersonReferenceView = {
  type: "Person";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__View =
  {
    uuid: string;
    type: "Order__from__person_giving_order__Identification[Actor]__WithProxy[Identification[Actor]]__Dude__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personGivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type PaymentReferenceView = {
  type: "Payment";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type PhysicalTextualObjectReferenceSet = {
  type: "PhysicalTextualObject";
  uuid: string;
};

export type PhysicalTextualObjectReferenceView = {
  type: "PhysicalTextualObject";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type DudeReferenceSet = {
  type: "Dude";
  uuid: string;
};

export type Order__from__person_receiving_order__Identification__Person____Person__View =
  {
    uuid: string;
    type: "Order__from__person_receiving_order__Identification[Person]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personReceivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Person__View =
  {
    uuid: string;
    type: "Order__from__person_receiving_order__Identification[Person]__WithProxy[Identification[Person]]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personReceivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type PlaceReferenceView = {
  type: "Place";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type PersonReferenceSet = {
  type: "Person";
  uuid: string;
};

export type StatementReferenceView = {
  type: "Statement";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
};

export type Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Person__View =
  {
    uuid: string;
    type: "Order__from__person_giving_order__Identification[Actor]__WithProxy[Identification[Actor]]__Person__View";
    label: string;
    headUuid?: string & tags.Format<"uuid">;
    headType?: string;
    personGivingOrder: (
      | Identification__Actor__View
      | WithProxy__Identification__Person____View
      | Identification__Person__View
      | WithProxy__Identification__Actor____View
    )[];
    edgeProperties: Certainty;
  };

export type PhysicalObjectReferenceSet = {
  type: "PhysicalObject";
  uuid: string;
};

export type Identification__Actor__View = {
  type: "Identification[Actor]";
  uuid: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  target: (
    | Identification__Actor____target__Person__ReferenceView
    | Identification__Actor____target__Dude__ReferenceView
  )[];
};

export type Identification__Actor____target__Person__ReferenceView = {
  type: "Person";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  edgeProperties: Certainty;
};

export type Identification__Person____target__Person__ReferenceView = {
  type: "Person";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  edgeProperties: Certainty;
};

export type Identification__Actor____target__Dude__ReferenceView = {
  type: "Dude";
  uuid: string;
  label: string;
  headUuid?: string & tags.Format<"uuid">;
  headType?: string;
  edgeProperties: Certainty;
};

export type CreationTypesMap = {
  Factoid: Factoid;
  Entity: Entity;
  Person: Person;
  Place: Place;
  Organisation: Organisation;
  PhysicalObject: PhysicalObject;
  CompositePhysicalObject: CompositePhysicalObject;
  ConceptualEntity: ConceptualEntity;
  CompositeConceptualEntity: CompositeConceptualEntity;
  PhysicalTextualObject: PhysicalTextualObject;
  CompositePhysicalTextualObject: CompositePhysicalTextualObject;
  TextualWork: TextualWork;
  CompositeTextualWork: CompositeTextualWork;
  Dude: Dude;
  Animal: Animal;
};

export type CreateableTypesNames = keyof CreationTypesMap;

type CreationValidatorsType = {
  [K in keyof CreationTypesMap]: (
    input: object,
  ) => typia.IValidation<CreationTypesMap[K]>;
};

/*
        export const creationValidators: CreationValidatorsType = {
            Factoid: typia.createValidate<Factoid>(),
	Entity: typia.createValidate<Entity>(),
	Person: typia.createValidate<Person>(),
	Place: typia.createValidate<Place>(),
	Organisation: typia.createValidate<Organisation>(),
	PhysicalObject: typia.createValidate<PhysicalObject>(),
	CompositePhysicalObject: typia.createValidate<CompositePhysicalObject>(),
	ConceptualEntity: typia.createValidate<ConceptualEntity>(),
	CompositeConceptualEntity: typia.createValidate<CompositeConceptualEntity>(),
	PhysicalTextualObject: typia.createValidate<PhysicalTextualObject>(),
	CompositePhysicalTextualObject: typia.createValidate<CompositePhysicalTextualObject>(),
	TextualWork: typia.createValidate<TextualWork>(),
	CompositeTextualWork: typia.createValidate<CompositeTextualWork>(),
	Dude: typia.createValidate<Dude>(),
	Animal: typia.createValidate<Animal>(),
        }
        */

export type HeadEditViewBase = {
  uuid: string & tags.Format<"uuid">;
  createdBy: string;
  createdWhen: string & tags.Format<"date-time">;
  modifiedBy: string;
  modifiedWhen: string & tags.Format<"date-time">;
};

export type ReferenceViewBase = {
  label: string;
  head_uuid: string & tags.Format<"uuid">;
  head_type: string;
};

export type EditViewBase = {
  uuid: string & tags.Format<"uuid">;
};

export type EditSetBase = {
  uuid: string & tags.Format<"uuid">;
};

export type EditViewTypesMap = {
  Factoid: FactoidEditView & HeadEditViewBase;
  Entity: EntityEditView & HeadEditViewBase;
  Person: PersonEditView & HeadEditViewBase;
  Place: PlaceEditView & HeadEditViewBase;
  Organisation: OrganisationEditView & HeadEditViewBase;
  PhysicalObject: PhysicalObjectEditView & HeadEditViewBase;
  CompositePhysicalObject: CompositePhysicalObjectEditView & HeadEditViewBase;
  ConceptualEntity: ConceptualEntityEditView & HeadEditViewBase;
  CompositeConceptualEntity: CompositeConceptualEntityEditView &
    HeadEditViewBase;
  PhysicalTextualObject: PhysicalTextualObjectEditView & HeadEditViewBase;
  CompositePhysicalTextualObject: CompositePhysicalTextualObjectEditView &
    HeadEditViewBase;
  TextualWork: TextualWorkEditView & HeadEditViewBase;
  CompositeTextualWork: CompositeTextualWorkEditView & HeadEditViewBase;
  Dude: DudeEditView & HeadEditViewBase;
  Animal: AnimalEditView & HeadEditViewBase;
};

export type EditableTypesNames = keyof EditViewTypesMap;

export type EditSetTypesMap = {
  Factoid: FactoidEditSet;
  Entity: EntityEditSet;
  Person: PersonEditSet;
  Place: PlaceEditSet;
  Organisation: OrganisationEditSet;
  PhysicalObject: PhysicalObjectEditSet;
  CompositePhysicalObject: CompositePhysicalObjectEditSet;
  ConceptualEntity: ConceptualEntityEditSet;
  CompositeConceptualEntity: CompositeConceptualEntityEditSet;
  PhysicalTextualObject: PhysicalTextualObjectEditSet;
  CompositePhysicalTextualObject: CompositePhysicalTextualObjectEditSet;
  TextualWork: TextualWorkEditSet;
  CompositeTextualWork: CompositeTextualWorkEditSet;
  Dude: DudeEditSet;
  Animal: AnimalEditSet;
};

export type EditValidatorType = {
  [K in keyof EditSetTypesMap]: (
    input: object,
  ) => typia.IValidation<EditSetTypesMap[K]>;
};

export type ViewTypesMap = {
  ZoteroEntry: ZoteroEntryView;
  Citation: CitationView;
  Factoid: FactoidView;
  Entity: EntityView;
  Person: PersonView;
  Place: PlaceView;
  Organisation: OrganisationView;
  PhysicalObject: PhysicalObjectView;
  CompositePhysicalObject: CompositePhysicalObjectView;
  ConceptualEntity: ConceptualEntityView;
  CompositeConceptualEntity: CompositeConceptualEntityView;
  PhysicalTextualObject: PhysicalTextualObjectView;
  CompositePhysicalTextualObject: CompositePhysicalTextualObjectView;
  TextualWork: TextualWorkView;
  CompositeTextualWork: CompositeTextualWorkView;
  Statement: StatementView;
  Naming: NamingView;
  CreationAct: CreationActView;
  AssemblyOfCompositePhysicalObject: AssemblyOfCompositePhysicalObjectView;
  Payment: PaymentView;
  Order: OrderView;
  Dude: DudeView;
  Animal: AnimalView;
};

export type HeadViewTypesMap = {
  [k in keyof ViewTypesMap]: k & HeadEditViewBase;
};

export type ViewableTypesNames = keyof ViewTypesMap;

type GenericListReturnType<T> = {
  results: T[];
  count: number;
  page: number;
  totalPages: number;
  nextPage: number;
  previousPage: number;
  nextUrl: string;
  previousUrl: string;
};

export type ListTypesMap = {
  ZoteroEntry: GenericListReturnType<ZoteroEntryReferenceView>;
  Citation: GenericListReturnType<CitationReferenceView>;
  Factoid: GenericListReturnType<FactoidReferenceView>;
  Entity: GenericListReturnType<
    | ConceptualEntityReferenceView
    | PhysicalObjectReferenceView
    | CompositePhysicalObjectReferenceView
    | CompositePhysicalTextualObjectReferenceView
    | DudeReferenceView
    | CompositeConceptualEntityReferenceView
    | PlaceReferenceView
    | TextualWorkReferenceView
    | PersonReferenceView
    | OrganisationReferenceView
    | CompositeTextualWorkReferenceView
    | PhysicalTextualObjectReferenceView
    | EntityReferenceView
  >;
  Person: GenericListReturnType<DudeReferenceView | PersonReferenceView>;
  Place: GenericListReturnType<PlaceReferenceView>;
  Organisation: GenericListReturnType<OrganisationReferenceView>;
  PhysicalObject: GenericListReturnType<
    | CompositePhysicalObjectReferenceView
    | PhysicalTextualObjectReferenceView
    | CompositePhysicalTextualObjectReferenceView
    | PhysicalObjectReferenceView
  >;
  CompositePhysicalObject: GenericListReturnType<
    | CompositePhysicalTextualObjectReferenceView
    | CompositePhysicalObjectReferenceView
  >;
  ConceptualEntity: GenericListReturnType<
    TextualWorkReferenceView | ConceptualEntityReferenceView
  >;
  CompositeConceptualEntity: GenericListReturnType<
    CompositeTextualWorkReferenceView | CompositeConceptualEntityReferenceView
  >;
  PhysicalTextualObject: GenericListReturnType<PhysicalTextualObjectReferenceView>;
  CompositePhysicalTextualObject: GenericListReturnType<CompositePhysicalTextualObjectReferenceView>;
  TextualWork: GenericListReturnType<TextualWorkReferenceView>;
  CompositeTextualWork: GenericListReturnType<CompositeTextualWorkReferenceView>;
  Statement: GenericListReturnType<
    | OrderReferenceView
    | AssemblyOfCompositePhysicalObjectReferenceView
    | CreationActReferenceView
    | PaymentReferenceView
    | NamingReferenceView
    | StatementReferenceView
  >;
  Naming: GenericListReturnType<NamingReferenceView>;
  CreationAct: GenericListReturnType<
    AssemblyOfCompositePhysicalObjectReferenceView | CreationActReferenceView
  >;
  AssemblyOfCompositePhysicalObject: GenericListReturnType<AssemblyOfCompositePhysicalObjectReferenceView>;
  Payment: GenericListReturnType<PaymentReferenceView>;
  Order: GenericListReturnType<OrderReferenceView>;
  Dude: GenericListReturnType<DudeReferenceView>;
  Animal: GenericListReturnType<AnimalReferenceView>;
};

export type ListableTypesNames = keyof ListTypesMap;

export type FieldDefinition = {
  metatype:
    | "Literal"
    | "ListField"
    | "OutgoingRelation"
    | "IncomingRelation"
    | "Embedded"
    | "MultiKeyField";
  type: string | string[];
  createInline?: boolean;
  editInline?: boolean;
  edgeModel?: string | null;
  validators?: object;
  defaultType?: string | null;
  autocompleteEndpoint?: string;
};

type FieldsObjects<T> = {
  [Property in keyof T]?: FieldDefinition;
};

type ConfigObject<T> = {
  metatype:
    | "BaseNode"
    | "MultiKeyFieldModel"
    | "ReifiedRelation"
    | "ReifiedNode"
    | "IncomingViaReified"
    | "EdgeModel";
  abstract?: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  view?: boolean;
  search?: boolean;
  fields: FieldsObjects<T>;
  labelField?: string | null;
  typeHierarchy?: TypeHierarchy | {};
};

type TypeHierarchy = {
  [Property in ViewableTypesNames]: TypeHierarchy | {};
};

const ZoteroEntryConfig: ConfigObject<ZoteroEntryView> = {
  create: false,
  edit: false,
  delete: false,
  view: true,
  search: true,
  labelField: "citation",
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    zoteroKey: { metatype: "Literal", type: "str", validators: {} },
    zoteroGroupId: { metatype: "Literal", type: "int", validators: {} },
    zoteroGroupName: { metatype: "Literal", type: "str", validators: {} },
    zoteroVersion: { metatype: "Literal", type: "int", validators: {} },
    zoteroUrl: { metatype: "Literal", type: "HttpUrl", validators: {} },
    csljson: { metatype: "Literal", type: "str", validators: {} },
    bib: { metatype: "Literal", type: "str", validators: {} },
    citation: { metatype: "Literal", type: "str", validators: {} },
    createdBy: { metatype: "Literal", type: "str", validators: {} },
    createdWhen: { metatype: "Literal", type: "datetime", validators: {} },
    modifiedBy: { metatype: "Literal", type: "str", validators: {} },
    modifiedWhen: { metatype: "Literal", type: "datetime", validators: {} },
    isSourceOf: { metatype: "IncomingRelation", type: ["Citation", "Factoid"] },
  },
  metatype: "BaseNode",
  typeHierarchy: {},
};
const CitationConfig: ConfigObject<CitationView> = {
  create: false,
  edit: false,
  delete: false,
  view: false,
  search: false,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    citedWork: {
      metatype: "OutgoingRelation",
      type: ["ZoteroEntry"],
      createInline: false,
      editInline: false,
      edgeModel: null,
      validators: {},
      defaultType: null,
      autocompleteEndpoint: "/ZoteroEntry/autocomplete/",
    },
    scope: { metatype: "Literal", type: "str", validators: {} },
  },
  metatype: "BaseNode",
  typeHierarchy: {},
};
const FactoidConfig: ConfigObject<FactoidView> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    citation: {
      metatype: "Embedded",
      type: ["Citation"],
      validators: { minLength: 1, maxLength: 1 },
    },
    statements: {
      metatype: "OutgoingRelation",
      type: [
        "Statement",
        "Order",
        "AssemblyOfCompositePhysicalObject",
        "CreationAct",
        "Payment",
        "Naming",
      ],
      createInline: true,
      editInline: true,
      edgeModel: null,
      validators: {},
      defaultType: null,
      autocompleteEndpoint: "/Statement/autocomplete/",
    },
  },
  metatype: "BaseNode",
  typeHierarchy: {},
};
const EntityConfig: ConfigObject<EntityView> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
  },
  metatype: "BaseNode",
  typeHierarchy: {
    Person: { Dude: {} },
    Place: {},
    Organisation: {},
    PhysicalObject: {
      CompositePhysicalObject: { CompositePhysicalTextualObject: {} },
      PhysicalTextualObject: {},
    },
    ConceptualEntity: { TextualWork: {} },
    CompositeConceptualEntity: { CompositeTextualWork: {} },
  },
};
const PersonConfig: ConfigObject<PersonView> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    isNamedIn: { metatype: "IncomingRelation", type: ["Naming"] },
    wasCreatorIn: {
      metatype: "IncomingRelation",
      type: [
        "CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Person__View",
        "CreationAct__from__created_by__Identification__Person____Person__View",
        "CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Person__View",
        "CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Person__View",
        "CreationAct__from__created_by__Identification__Actor____Person__View",
        "CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Person__View",
      ],
    },
    isProxyIn: {
      metatype: "IncomingRelation",
      type: [
        "Order__from__proxy__person_receiving_order__Person__View",
        "Order__from__proxy__person_receiving_order__Person__View",
        "Order__from__proxy__person_receiving_order__Person__View",
        "Order__from__proxy__person_receiving_order__Person__View",
        "Order__from__proxy__person_giving_order__Person__View",
        "Order__from__proxy__person_giving_order__Person__View",
        "Order__from__proxy__person_giving_order__Person__View",
        "CreationAct__from__proxy__created_by__Person__View",
        "CreationAct__from__proxy__created_by__Person__View",
        "CreationAct__from__proxy__created_by__Person__View",
        "CreationAct__from__proxy__created_by__Person__View",
        "Order__from__proxy__person_giving_order__Person__View",
      ],
    },
    givesOrder: {
      metatype: "IncomingRelation",
      type: [
        "Order__from__person_giving_order__Identification__Actor____Person__View",
        "Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Person__View",
        "Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Person__View",
        "Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Person__View",
        "Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Person__View",
        "Order__from__person_giving_order__Identification__Person____Person__View",
      ],
    },
    receivesOrder: {
      metatype: "IncomingRelation",
      type: [
        "Order__from__person_receiving_order__Identification__Person____Person__View",
        "Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Person__View",
        "Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Person__View",
        "Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Person__View",
        "Order__from__person_receiving_order__Identification__Actor____Person__View",
        "Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Person__View",
      ],
    },
  },
  metatype: "BaseNode",
  typeHierarchy: { Dude: {} },
};
const PlaceConfig: ConfigObject<PlaceView> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
  },
  metatype: "BaseNode",
  typeHierarchy: {},
};
const OrganisationConfig: ConfigObject<OrganisationView> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    assembledCompositeObject: {
      metatype: "IncomingRelation",
      type: ["AssemblyOfCompositePhysicalObject"],
    },
  },
  metatype: "BaseNode",
  typeHierarchy: {},
};
const PhysicalObjectConfig: ConfigObject<PhysicalObjectView> = {
  create: true,
  edit: true,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  abstract: true,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    wasCreatedIn: {
      metatype: "IncomingRelation",
      type: ["CreationAct", "AssemblyOfCompositePhysicalObject"],
    },
    isComponentAssembledIn: {
      metatype: "IncomingRelation",
      type: ["AssemblyOfCompositePhysicalObject"],
    },
  },
  metatype: "BaseNode",
  typeHierarchy: {
    CompositePhysicalObject: { CompositePhysicalTextualObject: {} },
    PhysicalTextualObject: {},
  },
};
const CompositePhysicalObjectConfig: ConfigObject<CompositePhysicalObjectView> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    view: true,
    search: true,
    labelField: null,
    fields: {
      type: { metatype: "Literal", type: "Literal", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      wasCreatedIn: {
        metatype: "IncomingRelation",
        type: ["CreationAct", "AssemblyOfCompositePhysicalObject"],
      },
      isComponentAssembledIn: {
        metatype: "IncomingRelation",
        type: ["AssemblyOfCompositePhysicalObject"],
      },
      assembledIn: {
        metatype: "IncomingRelation",
        type: ["AssemblyOfCompositePhysicalObject"],
      },
    },
    metatype: "BaseNode",
    typeHierarchy: { CompositePhysicalTextualObject: {} },
  };
const ConceptualEntityConfig: ConfigObject<ConceptualEntityView> = {
  create: true,
  edit: true,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  abstract: true,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    wasCreatedIn: {
      metatype: "IncomingRelation",
      type: ["CreationAct", "AssemblyOfCompositePhysicalObject"],
    },
  },
  metatype: "BaseNode",
  typeHierarchy: { TextualWork: {} },
};
const CompositeConceptualEntityConfig: ConfigObject<CompositeConceptualEntityView> =
  {
    create: true,
    edit: true,
    delete: true,
    view: true,
    search: true,
    labelField: null,
    abstract: true,
    fields: {
      type: { metatype: "Literal", type: "Literal", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
    },
    metatype: "BaseNode",
    typeHierarchy: { CompositeTextualWork: {} },
  };
const PhysicalTextualObjectConfig: ConfigObject<PhysicalTextualObjectView> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    wasCreatedIn: {
      metatype: "IncomingRelation",
      type: ["AssemblyOfCompositePhysicalObject", "CreationAct"],
    },
    isComponentAssembledIn: {
      metatype: "IncomingRelation",
      type: ["AssemblyOfCompositePhysicalObject"],
    },
  },
  metatype: "BaseNode",
  typeHierarchy: {},
};
const CompositePhysicalTextualObjectConfig: ConfigObject<CompositePhysicalTextualObjectView> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    view: true,
    search: true,
    labelField: null,
    fields: {
      type: { metatype: "Literal", type: "Literal", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      wasCreatedIn: {
        metatype: "IncomingRelation",
        type: ["AssemblyOfCompositePhysicalObject", "CreationAct"],
      },
      isComponentAssembledIn: {
        metatype: "IncomingRelation",
        type: ["AssemblyOfCompositePhysicalObject"],
      },
      assembledIn: {
        metatype: "IncomingRelation",
        type: ["AssemblyOfCompositePhysicalObject"],
      },
    },
    metatype: "BaseNode",
    typeHierarchy: {},
  };
const TextualWorkConfig: ConfigObject<TextualWorkView> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    wasCreatedIn: {
      metatype: "IncomingRelation",
      type: ["AssemblyOfCompositePhysicalObject", "CreationAct"],
    },
  },
  metatype: "BaseNode",
  typeHierarchy: {},
};
const CompositeTextualWorkConfig: ConfigObject<CompositeTextualWorkView> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
  },
  metatype: "BaseNode",
  typeHierarchy: {},
};
const StatementConfig: ConfigObject<StatementView> = {
  create: false,
  edit: false,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  abstract: true,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    isStatementIn: { metatype: "IncomingRelation", type: ["Factoid"] },
  },
  metatype: "BaseNode",
  typeHierarchy: {
    Naming: {},
    CreationAct: { AssemblyOfCompositePhysicalObject: {} },
    Payment: {},
    Order: {},
  },
};
const NamingConfig: ConfigObject<NamingView> = {
  abstract: false,
  create: false,
  edit: false,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    namedPerson: {
      metatype: "OutgoingRelation",
      type: ["Person", "Dude"],
      createInline: false,
      editInline: false,
      edgeModel: null,
      validators: {},
      defaultType: null,
      autocompleteEndpoint: "/Person/autocomplete/",
    },
    forename: { metatype: "Literal", type: "str", validators: {} },
    surname: { metatype: "Literal", type: "str", validators: {} },
    roleName: { metatype: "Literal", type: "str", validators: {} },
    addName: { metatype: "Literal", type: "str", validators: {} },
    genName: { metatype: "Literal", type: "str", validators: {} },
    isStatementIn: { metatype: "IncomingRelation", type: ["Factoid"] },
  },
  metatype: "BaseNode",
  typeHierarchy: {},
};
const CreationActConfig: ConfigObject<CreationActView> = {
  abstract: false,
  create: false,
  edit: false,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    thingCreated: {
      metatype: "OutgoingRelation",
      type: [
        "ConceptualEntity",
        "PhysicalObject",
        "CompositePhysicalObject",
        "CompositePhysicalTextualObject",
        "TextualWork",
        "PhysicalTextualObject",
      ],
      createInline: false,
      editInline: false,
      edgeModel: null,
      validators: {},
      defaultType: null,
      autocompleteEndpoint: "/ConceptualEntity|PhysicalObject/autocomplete/",
    },
    createdBy: {
      metatype: "OutgoingRelation",
      type: [
        "WithProxy__Identification__Actor____",
        "WithProxy__Identification__Person____",
        "Identification__Person__",
        "Identification__Actor__",
      ],
      createInline: false,
      editInline: false,
      edgeModel: null,
      validators: {},
      defaultType: null,
      autocompleteEndpoint: "//autocomplete/",
    },
    isStatementIn: { metatype: "IncomingRelation", type: ["Factoid"] },
  },
  metatype: "BaseNode",
  typeHierarchy: { AssemblyOfCompositePhysicalObject: {} },
};
const AssemblyOfCompositePhysicalObjectConfig: ConfigObject<AssemblyOfCompositePhysicalObjectView> =
  {
    abstract: false,
    create: false,
    edit: false,
    delete: true,
    view: true,
    search: true,
    labelField: null,
    fields: {
      type: { metatype: "Literal", type: "Literal", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      thingCreated: {
        metatype: "OutgoingRelation",
        type: [
          "ConceptualEntity",
          "PhysicalObject",
          "CompositePhysicalObject",
          "CompositePhysicalTextualObject",
          "TextualWork",
          "PhysicalTextualObject",
        ],
        createInline: false,
        editInline: false,
        edgeModel: null,
        validators: {},
        defaultType: null,
        autocompleteEndpoint: "/ConceptualEntity|PhysicalObject/autocomplete/",
      },
      componentParts: {
        metatype: "OutgoingRelation",
        type: [
          "CompositePhysicalObject",
          "CompositePhysicalTextualObject",
          "PhysicalObject",
          "PhysicalTextualObject",
        ],
        createInline: false,
        editInline: false,
        edgeModel: null,
        validators: {},
        defaultType: null,
        autocompleteEndpoint: "/PhysicalObject/autocomplete/",
      },
      compositeObjectCreated: {
        metatype: "OutgoingRelation",
        type: ["CompositePhysicalObject", "CompositePhysicalTextualObject"],
        createInline: false,
        editInline: false,
        edgeModel: null,
        validators: {},
        defaultType: null,
        autocompleteEndpoint: "/CompositePhysicalObject/autocomplete/",
      },
      assembledBy: {
        metatype: "OutgoingRelation",
        type: ["Organisation"],
        createInline: false,
        editInline: false,
        edgeModel: null,
        validators: {},
        defaultType: null,
        autocompleteEndpoint: "/Organisation/autocomplete/",
      },
      isStatementIn: { metatype: "IncomingRelation", type: ["Factoid"] },
    },
    metatype: "BaseNode",
    typeHierarchy: {},
  };
const PaymentConfig: ConfigObject<PaymentView> = {
  abstract: false,
  create: false,
  edit: false,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    isStatementIn: { metatype: "IncomingRelation", type: ["Factoid"] },
    isOrderedIn: { metatype: "IncomingRelation", type: ["Order"] },
  },
  metatype: "BaseNode",
  typeHierarchy: {},
};
const OrderConfig: ConfigObject<OrderView> = {
  abstract: false,
  create: false,
  edit: false,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    personGivingOrder: {
      metatype: "OutgoingRelation",
      type: [
        "Identification__Actor__",
        "WithProxy__Identification__Person____",
        "Identification__Person__",
        "WithProxy__Identification__Actor____",
      ],
      createInline: false,
      editInline: false,
      edgeModel: null,
      validators: {},
      defaultType: null,
      autocompleteEndpoint: "//autocomplete/",
    },
    personReceivingOrder: {
      metatype: "OutgoingRelation",
      type: [
        "Identification__Actor__",
        "WithProxy__Identification__Person____",
        "Identification__Person__",
        "WithProxy__Identification__Actor____",
      ],
      createInline: false,
      editInline: false,
      edgeModel: null,
      validators: {},
      defaultType: null,
      autocompleteEndpoint: "//autocomplete/",
    },
    thingOrdered: {
      metatype: "OutgoingRelation",
      type: ["Payment"],
      createInline: true,
      editInline: true,
      edgeModel: null,
      validators: {},
      defaultType: null,
      autocompleteEndpoint: "/Payment/autocomplete/",
    },
    isStatementIn: { metatype: "IncomingRelation", type: ["Factoid"] },
  },
  metatype: "BaseNode",
  typeHierarchy: {},
};
const DudeConfig: ConfigObject<DudeView> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
    isNamedIn: { metatype: "IncomingRelation", type: ["Naming"] },
    wasCreatorIn: {
      metatype: "IncomingRelation",
      type: [
        "CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Dude__View",
        "CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Dude__View",
        "CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Dude__View",
        "CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Dude__View",
        "CreationAct__from__created_by__Identification__Actor____Dude__View",
        "CreationAct__from__created_by__Identification__Person____Dude__View",
      ],
    },
    isProxyIn: {
      metatype: "IncomingRelation",
      type: [
        "CreationAct__from__proxy__created_by__Dude__View",
        "CreationAct__from__proxy__created_by__Dude__View",
        "Order__from__proxy__person_receiving_order__Dude__View",
        "Order__from__proxy__person_receiving_order__Dude__View",
        "Order__from__proxy__person_giving_order__Dude__View",
        "Order__from__proxy__person_giving_order__Dude__View",
        "Order__from__proxy__person_giving_order__Dude__View",
        "CreationAct__from__proxy__created_by__Dude__View",
        "Order__from__proxy__person_giving_order__Dude__View",
        "Order__from__proxy__person_receiving_order__Dude__View",
        "Order__from__proxy__person_receiving_order__Dude__View",
        "CreationAct__from__proxy__created_by__Dude__View",
      ],
    },
    givesOrder: {
      metatype: "IncomingRelation",
      type: [
        "Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Dude__View",
        "Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Dude__View",
        "Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__View",
        "Order__from__person_giving_order__Identification__Actor____Dude__View",
        "Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Dude__View",
        "Order__from__person_giving_order__Identification__Person____Dude__View",
      ],
    },
    receivesOrder: {
      metatype: "IncomingRelation",
      type: [
        "Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Dude__View",
        "Order__from__person_receiving_order__Identification__Person____Dude__View",
        "Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Dude__View",
        "Order__from__person_receiving_order__Identification__Actor____Dude__View",
        "Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Dude__View",
        "Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__View",
      ],
    },
  },
  metatype: "BaseNode",
  typeHierarchy: {},
};
const AnimalConfig: ConfigObject<AnimalView> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  view: true,
  search: true,
  labelField: null,
  fields: {
    type: { metatype: "Literal", type: "Literal", validators: {} },
    label: { metatype: "Literal", type: "str", validators: {} },
  },
  metatype: "BaseNode",
  typeHierarchy: {},
};
const Identification__Actor__Config: ConfigObject<Identification__Actor__> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  fields: {
    target: {
      metatype: "OutgoingRelation",
      type: ["Person", "Dude"],
      createInline: false,
      editInline: false,
      edgeModel: "Certainty",
      validators: {},
      defaultType: null,
      autocompleteEndpoint: "/Person/autocomplete/",
    },
    type: { metatype: "Literal", type: "Literal", validators: {} },
  },
  metatype: "ReifiedRelation",
};
const Order__from__proxy__person_receiving_order__Dude__ViewConfig: ConfigObject<Order__from__proxy__person_receiving_order__Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Dude__ViewConfig: ConfigObject<CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__proxy__person_receiving_order__Person__ViewConfig: ConfigObject<Order__from__proxy__person_receiving_order__Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Identification__Person__Config: ConfigObject<Identification__Person__> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  fields: {
    target: {
      metatype: "OutgoingRelation",
      type: ["Person", "Dude"],
      createInline: false,
      editInline: false,
      edgeModel: "Certainty",
      validators: {},
      defaultType: null,
      autocompleteEndpoint: "/Person/autocomplete/",
    },
    type: { metatype: "Literal", type: "Literal", validators: {} },
  },
  metatype: "ReifiedRelation",
};
const CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Person__ViewConfig: ConfigObject<CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Person__ViewConfig: ConfigObject<CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const WithProxy__Identification__Person____Config: ConfigObject<WithProxy__Identification__Person____> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      target: {
        metatype: "OutgoingRelation",
        type: ["Identification__Actor__", "Identification__Person__"],
        createInline: false,
        editInline: false,
        edgeModel: null,
        validators: {},
        defaultType: null,
        autocompleteEndpoint: "//autocomplete/",
      },
      type: { metatype: "Literal", type: "Literal", validators: {} },
      proxy: {
        metatype: "OutgoingRelation",
        type: ["Identification__Actor__", "Identification__Person__"],
        createInline: false,
        editInline: false,
        edgeModel: null,
        validators: {},
        defaultType: null,
        autocompleteEndpoint: "//autocomplete/",
      },
    },
    metatype: "ReifiedRelation",
  };
const CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Person__ViewConfig: ConfigObject<CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_giving_order__Identification__Person____Person__ViewConfig: ConfigObject<Order__from__person_giving_order__Identification__Person____Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Dude__ViewConfig: ConfigObject<Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Person__ViewConfig: ConfigObject<Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Dude__ViewConfig: ConfigObject<CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Dude__ViewConfig: ConfigObject<CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Person__ViewConfig: ConfigObject<Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__ViewConfig: ConfigObject<Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Dude__ViewConfig: ConfigObject<Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__proxy__person_giving_order__Person__ViewConfig: ConfigObject<Order__from__proxy__person_giving_order__Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const CreationAct__from__proxy__created_by__Dude__ViewConfig: ConfigObject<CreationAct__from__proxy__created_by__Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const CreationAct__from__proxy__created_by__Person__ViewConfig: ConfigObject<CreationAct__from__proxy__created_by__Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const WithProxy__Identification__Actor____Config: ConfigObject<WithProxy__Identification__Actor____> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      target: {
        metatype: "OutgoingRelation",
        type: ["Identification__Actor__", "Identification__Person__"],
        createInline: false,
        editInline: false,
        edgeModel: null,
        validators: {},
        defaultType: null,
        autocompleteEndpoint: "//autocomplete/",
      },
      type: { metatype: "Literal", type: "Literal", validators: {} },
      proxy: {
        metatype: "OutgoingRelation",
        type: ["Identification__Actor__", "Identification__Person__"],
        createInline: false,
        editInline: false,
        edgeModel: null,
        validators: {},
        defaultType: null,
        autocompleteEndpoint: "//autocomplete/",
      },
    },
    metatype: "ReifiedRelation",
  };
const Order__from__proxy__person_giving_order__Dude__ViewConfig: ConfigObject<Order__from__proxy__person_giving_order__Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Person__ViewConfig: ConfigObject<Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const CreationAct__from__created_by__Identification__Actor____Dude__ViewConfig: ConfigObject<CreationAct__from__created_by__Identification__Actor____Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const CreationAct__from__created_by__Identification__Person____Person__ViewConfig: ConfigObject<CreationAct__from__created_by__Identification__Person____Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Person__ViewConfig: ConfigObject<Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_giving_order__Identification__Actor____Person__ViewConfig: ConfigObject<Order__from__person_giving_order__Identification__Actor____Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Person__ViewConfig: ConfigObject<Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_receiving_order__Identification__Person____Person__ViewConfig: ConfigObject<Order__from__person_receiving_order__Identification__Person____Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Person__ViewConfig: ConfigObject<Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_receiving_order__Identification__Actor____Person__ViewConfig: ConfigObject<Order__from__person_receiving_order__Identification__Actor____Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Person__ViewConfig: ConfigObject<Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Person__ViewConfig: ConfigObject<CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_receiving_order__Identification__Actor____Dude__ViewConfig: ConfigObject<Order__from__person_receiving_order__Identification__Actor____Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Dude__ViewConfig: ConfigObject<CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_receiving_order__Identification__Person____Dude__ViewConfig: ConfigObject<Order__from__person_receiving_order__Identification__Person____Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_giving_order__Identification__Person____Dude__ViewConfig: ConfigObject<Order__from__person_giving_order__Identification__Person____Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const CertaintyConfig: ConfigObject<Certainty> = {
  abstract: false,
  create: true,
  edit: true,
  delete: true,
  fields: { value: { metatype: "Literal", type: "int", validators: {} } },
  metatype: "EdgeModel",
};
const Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Dude__ViewConfig: ConfigObject<Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const CreationAct__from__created_by__Identification__Person____Dude__ViewConfig: ConfigObject<CreationAct__from__created_by__Identification__Person____Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_giving_order__Identification__Actor____Dude__ViewConfig: ConfigObject<Order__from__person_giving_order__Identification__Actor____Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__ViewConfig: ConfigObject<Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Person__ViewConfig: ConfigObject<Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Dude__ViewConfig: ConfigObject<Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personReceivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Dude__ViewConfig: ConfigObject<Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const CreationAct__from__created_by__Identification__Actor____Person__ViewConfig: ConfigObject<CreationAct__from__created_by__Identification__Actor____Person__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      createdBy: {
        metatype: "OutgoingRelation",
        type: [
          "WithProxy__Identification__Actor____",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "Identification__Actor__",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };
const Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Dude__ViewConfig: ConfigObject<Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Dude__View> =
  {
    abstract: false,
    create: true,
    edit: true,
    delete: true,
    fields: {
      uuid: { metatype: "Literal", type: "UUID", validators: {} },
      type: { metatype: "Literal", type: "str", validators: {} },
      label: { metatype: "Literal", type: "str", validators: {} },
      headUuid: { metatype: "Literal", type: "Optional", validators: {} },
      headType: { metatype: "Literal", type: "Optional", validators: {} },
      personGivingOrder: {
        metatype: "OutgoingRelation",
        type: [
          "Identification__Actor__",
          "WithProxy__Identification__Person____",
          "Identification__Person__",
          "WithProxy__Identification__Actor____",
        ],
      },
      edgeProperties: {
        metatype: "Literal",
        type: "Certainty",
        validators: {},
      },
    },
    metatype: "IncomingViaReified",
  };

export const ModelConfigs = {
  ZoteroEntry: ZoteroEntryConfig,
  Citation: CitationConfig,
  Factoid: FactoidConfig,
  Entity: EntityConfig,
  Person: PersonConfig,
  Place: PlaceConfig,
  Organisation: OrganisationConfig,
  PhysicalObject: PhysicalObjectConfig,
  CompositePhysicalObject: CompositePhysicalObjectConfig,
  ConceptualEntity: ConceptualEntityConfig,
  CompositeConceptualEntity: CompositeConceptualEntityConfig,
  PhysicalTextualObject: PhysicalTextualObjectConfig,
  CompositePhysicalTextualObject: CompositePhysicalTextualObjectConfig,
  TextualWork: TextualWorkConfig,
  CompositeTextualWork: CompositeTextualWorkConfig,
  Statement: StatementConfig,
  Naming: NamingConfig,
  CreationAct: CreationActConfig,
  AssemblyOfCompositePhysicalObject: AssemblyOfCompositePhysicalObjectConfig,
  Payment: PaymentConfig,
  Order: OrderConfig,
  Dude: DudeConfig,
  Animal: AnimalConfig,
  Identification__Actor__: Identification__Actor__Config,
  Order__from__proxy__person_receiving_order__Dude__View:
    Order__from__proxy__person_receiving_order__Dude__ViewConfig,
  CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Dude__View:
    CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Dude__ViewConfig,
  Order__from__proxy__person_receiving_order__Person__View:
    Order__from__proxy__person_receiving_order__Person__ViewConfig,
  Identification__Person__: Identification__Person__Config,
  CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Person__View:
    CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Person__ViewConfig,
  CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Person__View:
    CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Person__ViewConfig,
  WithProxy__Identification__Person____:
    WithProxy__Identification__Person____Config,
  CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Person__View:
    CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Person__ViewConfig,
  Order__from__person_giving_order__Identification__Person____Person__View:
    Order__from__person_giving_order__Identification__Person____Person__ViewConfig,
  Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Dude__View:
    Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Dude__ViewConfig,
  Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Person__View:
    Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Person__ViewConfig,
  CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Dude__View:
    CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Actor______Dude__ViewConfig,
  CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Dude__View:
    CreationAct__from__created_by__Identification__Person____WithProxy__Identification__Person______Dude__ViewConfig,
  Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Person__View:
    Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Actor______Person__ViewConfig,
  Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__View:
    Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__ViewConfig,
  Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Dude__View:
    Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Dude__ViewConfig,
  Order__from__proxy__person_giving_order__Person__View:
    Order__from__proxy__person_giving_order__Person__ViewConfig,
  CreationAct__from__proxy__created_by__Dude__View:
    CreationAct__from__proxy__created_by__Dude__ViewConfig,
  CreationAct__from__proxy__created_by__Person__View:
    CreationAct__from__proxy__created_by__Person__ViewConfig,
  WithProxy__Identification__Actor____:
    WithProxy__Identification__Actor____Config,
  Order__from__proxy__person_giving_order__Dude__View:
    Order__from__proxy__person_giving_order__Dude__ViewConfig,
  Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Person__View:
    Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Person__ViewConfig,
  CreationAct__from__created_by__Identification__Actor____Dude__View:
    CreationAct__from__created_by__Identification__Actor____Dude__ViewConfig,
  CreationAct__from__created_by__Identification__Person____Person__View:
    CreationAct__from__created_by__Identification__Person____Person__ViewConfig,
  Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Person__View:
    Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Person__ViewConfig,
  Order__from__person_giving_order__Identification__Actor____Person__View:
    Order__from__person_giving_order__Identification__Actor____Person__ViewConfig,
  Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Person__View:
    Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Person__ViewConfig,
  Order__from__person_receiving_order__Identification__Person____Person__View:
    Order__from__person_receiving_order__Identification__Person____Person__ViewConfig,
  Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Person__View:
    Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Actor______Person__ViewConfig,
  Order__from__person_receiving_order__Identification__Actor____Person__View:
    Order__from__person_receiving_order__Identification__Actor____Person__ViewConfig,
  Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Person__View:
    Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Person__ViewConfig,
  CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Person__View:
    CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Person______Person__ViewConfig,
  Order__from__person_receiving_order__Identification__Actor____Dude__View:
    Order__from__person_receiving_order__Identification__Actor____Dude__ViewConfig,
  CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Dude__View:
    CreationAct__from__created_by__Identification__Actor____WithProxy__Identification__Actor______Dude__ViewConfig,
  Order__from__person_receiving_order__Identification__Person____Dude__View:
    Order__from__person_receiving_order__Identification__Person____Dude__ViewConfig,
  Order__from__person_giving_order__Identification__Person____Dude__View:
    Order__from__person_giving_order__Identification__Person____Dude__ViewConfig,
  Certainty: CertaintyConfig,
  Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Dude__View:
    Order__from__person_receiving_order__Identification__Person____WithProxy__Identification__Person______Dude__ViewConfig,
  CreationAct__from__created_by__Identification__Person____Dude__View:
    CreationAct__from__created_by__Identification__Person____Dude__ViewConfig,
  Order__from__person_giving_order__Identification__Actor____Dude__View:
    Order__from__person_giving_order__Identification__Actor____Dude__ViewConfig,
  Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__View:
    Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Actor______Dude__ViewConfig,
  Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Person__View:
    Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Actor______Person__ViewConfig,
  Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Dude__View:
    Order__from__person_receiving_order__Identification__Actor____WithProxy__Identification__Person______Dude__ViewConfig,
  Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Dude__View:
    Order__from__person_giving_order__Identification__Person____WithProxy__Identification__Person______Dude__ViewConfig,
  CreationAct__from__created_by__Identification__Actor____Person__View:
    CreationAct__from__created_by__Identification__Actor____Person__ViewConfig,
  Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Dude__View:
    Order__from__person_giving_order__Identification__Actor____WithProxy__Identification__Person______Dude__ViewConfig,
};

export const TopLevelModels = [
  "ZoteroEntry",
  "Citation",
  "Factoid",
  "Entity",
  "Statement",
  "Animal",
];
