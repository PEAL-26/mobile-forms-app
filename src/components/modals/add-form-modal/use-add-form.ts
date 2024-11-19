import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaType, formSchema } from "./schema";
import uuid from 'react-native-uuid';

export function useAddForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const handleSubmit = (data: FormSchemaType) => {};

  const handleAddField = () => {
    append({
      identifier: uuid.v4(),
    });
  };

  const handleRemoveField = (ident: string) => {
    const index = fields.findIndex(({ identifier }) => identifier === ident);
    if (index > -1) {
      remove(index);
    }
  };

  return {
    form,
    fields,
    handleSubmit: form.handleSubmit(handleSubmit),
    handleAddField,
    handleRemoveField,
  };
}
