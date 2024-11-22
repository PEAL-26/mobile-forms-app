import { useFieldArray, useForm } from "react-hook-form";
import {
  dataCollectionSchema,
  DataCollectionSchemaType,
  DataUpdate,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { RegisterDataCollectionsProps } from "./types";
import { Alert } from "react-native";
import { FIELD_TYPE_ENUM } from "@/db";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import { listFormsFields, ListFormsFieldsResponseData } from "@/services/forms";

export function useRegister(props: RegisterDataCollectionsProps) {
  const { form: collectionsForm, onLoadingPage: onLoading } = props;
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<DataCollectionSchemaType>({
    resolver: zodResolver(dataCollectionSchema),
    mode: "onChange",
    defaultValues: {
      form: collectionsForm,
    },
  });

  const {
    fields: collections,
    update,
    append,
  } = useFieldArray({
    control: form.control,
    name: "collections",
  });

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
    queryKey: ["forms_fields"],
  });

  const handleSubmitOnConfirm = async (input: DataCollectionSchemaType) => {
    const data = input.collections.map((item) => ({
      formFieldId: item.fields.formFieldId,
      field: item.fields.display,
      type: item.fields.type,
      value: item.value,
    }));

    try {
      setIsSaving(true);
      // await db.insertBulk(data);

      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
    } catch (error) {
      Alert.alert(
        "Oops! Falha ao guardar!",
        "Falha ao guardar os dados, tente novamente, se o erro persistir entre em contanto com o suporte."
      );
      console.error(error);
    } finally {
      // setIsSaving(false);
    }
  };

  const handleSubmit = (data: DataCollectionSchemaType) => {
    const { form, collections } = data;
    if (!form?.id) {
      return Alert.alert("Campos Obrigatórios.", "Selecione um formulário");
    }

    const requireFill = collections.some(
      (collection) => collection.fields.required && !collection.value
    );
    if (requireFill) {
      Alert.alert(
        "Campos Obrigatórios.",
        "Alguns campos é de preenchimento Obrigatórios."
      );

      return;
    }

    handleSubmitOnConfirm(data);
  };

  const handleUpdate = (identifier: string, data: DataUpdate) => {
    const findIndex = collections.findIndex(
      (c) => c.fields.identifier === identifier
    );
    const collection = collections[findIndex];
    if (!collection) return;

    update(findIndex, {
      ...collection,
      ...data,
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
      return {};
    }

    if (props.type === FIELD_TYPE_ENUM.select) {
      // Única escolha
      return {};
    }

    return "";
  };

  useEffect(() => {
    for (const item of data) {
      // append({
      //   fields: {
      //     ...item,
      //     formFieldId: item.id,
      //   },
      //   value: startData(item),
      // });
    }
  }, [append, data]);

  return {
    collections: data,
    form,
    isLoadingPage,
    handleSubmit: form.handleSubmit(handleSubmit),
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
