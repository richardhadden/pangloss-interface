import { PersonEditSet } from "./generated/types";

import typia from "typia";

export const editValidators = {
  Person: typia.createValidate<PersonEditSet>(),
};
