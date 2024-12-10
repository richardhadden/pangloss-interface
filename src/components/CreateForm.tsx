import { t } from "~/contexts/translation";
import { EntityTypes } from "../../ProjectConfig";

type CreateFormProps = {
  entityType: EntityTypes;
};

export function CreateForm(props: CreateFormProps) {
  return (
    <>A Form for making a new {t(`${props.entityType}.__model.verbose_name`)}</>
  );
}
