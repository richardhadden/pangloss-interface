import typia, { tags } from "typia";

type Person = {
  name: string;
};

export type Thing = {
  type: "Thing";
  name: string & tags.MaxLength<3>;
};

type X = Thing & { one: string };

const t: X = {
  type: "Thing",
  name: "asdf",
  one: "asdf",
};

export const validators = { Thing: typia.createValidate<Thing>() };

// This is just a playground! REMOVE!
