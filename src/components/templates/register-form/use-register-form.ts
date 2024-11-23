import { useState } from "react";
import uuid from "react-native-uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";

import { FIELD_TYPE_ENUM } from "@/db";
import { createFormService, listFormsFields } from "@/services/forms";
import { useQueryPagination } from "@/hooks/use-query-pagination";

import { FormFieldSchemaType, FormSchemaType, formSchema } from "./schema";
import { RegisterFormProps } from "./types";
import { useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { router } from "expo-router";

export function useRegisterForm(props: RegisterFormProps) {
  const { form: mainForm } = props;

  const [fieldData, setFieldData] = useState<
    | {
        identifier: string;
        type: "list" | "data_table";
        src: string;
      }
    | undefined
  >(undefined);

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
    defaultValues: {
      name: mainForm?.name,
      description: mainForm?.description,
      fields: formFields.data.map((item) => ({
        identifier: item.identifier,
        require: item.required,
        section: item.section || undefined,
        type: item.type,
        display: item.display,
        description: item.description || undefined,
        data: item.data ? JSON.parse(item.data) : undefined,
        dataWhere: item.dataWhere ? JSON.parse(item.dataWhere) : undefined,
        extraField: item.extraField ? JSON.parse(item.extraField) : undefined,
      })),
    },
  });

  const { append, remove, update } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const fields = form.watch("fields");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const handleSubmit = async (data: FormSchemaType) => {
    if (isSaving) return;

    try {
      setIsSaving(true);
      setError(null);
      await createFormService({
        name: data.name,
        description: data?.description,
        fields: data.fields.map((field) => ({
          identifier: field.identifier,
          required: field.required,
          sectionId: field.section?.id,
          type: field.type,
          display: field.display,
          description: field?.description,
          data: field?.data,
          dataWhere: field?.dataWhere,
          extraField: field?.extraField,
        })),
      });
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
      router.push("/(app)/settings");
    } catch (error) {
      console.log(error);
      setError("Oops! Falha ao salvar formulário.");
      Alert.alert(
        "Erro ao Salvar!",
        "Oops! Falha ao salvar o formulário, tente novamente."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const onError = (errors: FieldErrors<FormSchemaType>) => {
    console.warn(errors);
  };

  const handleAddField = () => {
    append({
      identifier: uuid.v4(),
      type: FIELD_TYPE_ENUM.text,
      display: "",
      section: fields.slice(-1)?.[0]?.section,
      required: false,
    });
  };

  const handleUpdateField = (
    identifier: string,
    data: Partial<FormFieldSchemaType>
  ) => {
    const index = fields.findIndex((f) => f.identifier === identifier);
    const field = fields[index];
    if (field) {
      update(index, { ...field, ...data });
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
    handleSubmit: form.handleSubmit(handleSubmit, onError),
    handleAddField,
    handleUpdateField,
    handleRemoveField,
    setFieldData,
    formFields,
    isSaving,
  };
}
