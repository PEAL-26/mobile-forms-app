import uuid from "react-native-uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { FormSchemaType, formSchema } from "./schema";

import { RegisterFormProps } from "./types";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import { listFormsFields } from "@/services/forms";
import { FIELD_TYPE_ENUM } from "@/db";

export function useRegisterForm(props: RegisterFormProps) {
  const { form: mainForm } = props;

  const formFields = useQueryPagination({
    fn: () =>
      mainForm
        ? listFormsFields({ formId: mainForm?.id, size: mainForm?.totalFields })
        : undefined,
    queryKey: ["forms-fields", mainForm?.id],
  });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const { append, remove, update } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const fields = form.watch("fields");

  const handleSubmit = (data: FormSchemaType) => {};

  const handleAddField = () => {
    append({
      identifier: uuid.v4(),
      type: FIELD_TYPE_ENUM.text,
    });
  };

  const handleUpdateField = (identifier: string, data: any) => {
    const index = fields.findIndex((f) => f.identifier === identifier);
    const field = fields[index];
    if (field) {
      update(index, { ...field });
    }
  };

  const handleUpdateDataTypeField = (
    identifier: string,
    type: FIELD_TYPE_ENUM
  ) => {
    const index = fields.findIndex((f) => f.identifier === identifier);
    const field = fields[index];
    if (field) {
      update(index, { ...field, type });
    }
  };

  const handleRemoveField = (identifier: string) => {
    const index = fields.findIndex((f) => f.identifier === identifier);
    if (index > -1) {
      remove(index);
    }
  };

  return {
    form,
    fields,
    handleSubmit: form.handleSubmit(handleSubmit),
    handleAddField,
    handleUpdateField,
    handleRemoveField,
    handleUpdateDataTypeField,
  };
}
