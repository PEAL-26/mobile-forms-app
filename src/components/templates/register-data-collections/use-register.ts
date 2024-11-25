import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import uuid from "react-native-uuid";

import { dataCollectionSchema, DataCollectionSchemaType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { RegisterDataCollectionsProps } from "./types";
import { Alert } from "react-native";
import { FIELD_TYPE_ENUM } from "@/db";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import { listFormsFields, ListFormsFieldsResponseData } from "@/services/forms";
import { createDataCollectionsService } from "@/services/data-collections";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export function useRegister(props: RegisterDataCollectionsProps) {
  const { form: collectionsForm, onLoadingPage: onLoading } = props;
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const {
    data,
    isEmpty,
    isError,
    isFetching,
    isLoadingAll,
    totalItems,
    refetch,
    loadNextPageData,
  } = useQueryPagination({
    fn: ({ page }) => listFormsFields({ page, formId: collectionsForm?.id }),
    queryKey: ["forms_fields", collectionsForm?.id],
  });

  const form = useForm<DataCollectionSchemaType>({
    resolver: zodResolver(dataCollectionSchema),
    mode: "onSubmit",
    defaultValues: {
      form: collectionsForm,
    },
  });

  const { fields: collections, update } = useFieldArray({
    control: form.control,
    name: "collections",
  });

  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const handleSubmitOnConfirm = async (input: DataCollectionSchemaType) => {
    // console.log(JSON.stringify(input.collections, null, 2));
    if (isSaving) return;

    const identifier = uuid.v4();

    const data = input.collections.map((item) => ({
      identifier,
      formFieldId: item.fields.formFieldId,
      field: item.fields.display,
      type: item.fields.type,
      value: item.value,
    }));

    try {
      setIsSaving(true);
      await createDataCollectionsService(data);
      queryClient.invalidateQueries({
        queryKey: ["data-collection-group-by-form", collectionsForm?.id],
      });
      router.push(`/(app)/forms/collect-data/${identifier}`);
    } catch (error) {
      Alert.alert(
        "Oops! Falha ao guardar!",
        "Falha ao guardar os dados, tente novamente, se o erro persistir entre em contanto com o suporte."
      );
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = (data: DataCollectionSchemaType) => {
    if (!data.form?.id) {
      return Alert.alert("Campos Obrigatórios.", "Selecione um formulário");
    }

    const requireFill = data.collections.some((collection, index) => {
      const required = collection.fields.required && !collection.value;
      form.setError(`collections.${index}.value`, {
        message: "Campo Obrigatório.",
      });

      return required;
    });

    if (requireFill) {
      Alert.alert(
        "Campos Obrigatórios.",
        "Alguns campos é de preenchimento Obrigatório."
      );

      return;
    }

    handleSubmitOnConfirm(data);
  };

  const onError = (errors: FieldErrors<DataCollectionSchemaType>) => {
    console.error({ errors: JSON.stringify(errors.collections, null, 2) });
  };

  const handleUpdate = (identifier: string, value: any) => {
    const findIndex = collections.findIndex(
      (c) => c.fields.identifier === identifier
    );
    const collection = collections[findIndex];
    if (!collection) return;

    console.warn(value);
    form.clearErrors(`collections.${findIndex}.value`);
    update(findIndex, {
      ...collection,
      value,
    });
  };

  const initialLoadingFinished = useCallback(() => {
    setIsLoadingPage(false);
    onLoading?.(false);
  }, [onLoading]);

  useEffect(() => {
    initialLoadingFinished();
  }, [initialLoadingFinished]);

  const startData = (
    props: Omit<ListFormsFieldsResponseData, "formFieldId">
  ) => {
    if (props.type === FIELD_TYPE_ENUM.number) {
      return 0;
    }

    if (props.type === FIELD_TYPE_ENUM.boolean) {
      return false;
    }

    if (props.type === FIELD_TYPE_ENUM.checkbox) {
      // Multipla escolha
      return {};
    }

    if (props.type === FIELD_TYPE_ENUM.radio) {
      // Única escolha
      return null;
    }

    if (props.type === FIELD_TYPE_ENUM.select) {
      // Única escolha
      return null;
    }

    return "";
  };

  useEffect(() => {
    const parseJSON = (str?: string | null) => {
      if (!str) return null;
      return JSON.parse(str);
    };

    const collections = form.getValues("collections");
    const dataCollections = data.map((item) => {
      return {
        fields: {
          ...item,
          formFieldId: item.id,
          required: !!item.required,
          data: parseJSON(item.data),
          dataWhere: parseJSON(item.dataWhere),
          extraField: parseJSON(item.extraField),
        },
        value:
          collections.find((c) => c.fields.identifier === item.identifier)
            ?.value ?? startData(item),
      };
    });

    form.setValue("collections", dataCollections);
  }, [form, data]);

  return {
    collections: data,
    form,
    isLoadingPage,
    handleSubmit: form.handleSubmit(handleSubmit, onError),
    handleUpdate,
    isLoadingAll,
    isEmpty,
    isError,
    refetch,
    loadNextPageData,
    isSaving,
    isFetching,
    totalItems,
  };
}
