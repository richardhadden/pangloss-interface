import typia, { tags } from "typia";

export type Thing = {
  type: string & tags.Constant<"Thing", {}>;
  name: string & tags.MaxLength<3>;
};

export const validators = { Thing: typia.createValidate<Thing>() };
