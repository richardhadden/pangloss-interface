import * as v from "valibot";

const PersonReference = v.object({
  uid: v.string([v.uuid()]),
  label: v.string([v.maxLength(1000)]),
  realType: v.literal("Person"),
});

type Birth = v.Output<typeof BirthSchema>;
const BirthSchema = v.object({
  personBorn: v.array(PersonReference),
});

const b = v.parse(BirthSchema, {
  personBorn: [{ uid: "aasdf", label: "person", realType: "Person" }],
});
