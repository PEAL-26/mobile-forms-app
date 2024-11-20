import { useFieldArray, useForm } from "react-hook-form";
import {
  DataCollectionFieldSchemaType,
  dataCollectionSchema,
  DataCollectionSchemaType,
  DataUpdate,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { fieldsSeed, sectionsSeed } from "@/db/data";
import { useCallback, useEffect, useState } from "react";
import { RegisterDataCollectionsProps } from "./types";
import { Alert } from "react-native";
import { db, FIELD_TYPE_ENUM, FormFieldSelectSchemaType } from "@/db";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import {
  FormFieldListResponseData,
  useFormFieldsListing,
} from "./use-listing-form-fields";

// TODO START remover essa linha posteriormente
type QueryDataProps = {
  formId?: string;
};

function useQueryData(props?: QueryDataProps) {
  // const { formId } = props || {};

  // Aplicar a pesquisa dos campos pro formulário
  let response = {
    data: fieldsSeed.map((item) => ({
      id: item.id,
      section: sectionsSeed.find(({ id }) => id === item.sectionId),
      display: item.display,
      type: item.type as FIELD_TYPE_ENUM,
      identifier: item.identifier,
      data: item.data,
      dataFields: item?.dataFields,
      dataWhere: item?.dataWhere,
      extraField: item?.extraField,
      description: item?.description,
    })),
  };

  return { response };
}
// TODO END remover essa linha posteriormente

export function useRegister(props: RegisterDataCollectionsProps) {
  const { form: collectionsForm, onLoading } = props;
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

  // const { response } = useQueryData();
  const {
    data,
    isEmpty,
    isError,
    isFetching,
    isLoadingAll,
    totalItems,
    refetch,
    loadNextPageData,
  } = useFormFieldsListing({
    formId: collectionsForm?.id,
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
      return Alert.alert("Dados em falta.", "Selecione um formulário");
    }

    const requireFill = collections.some((collection) => !collection.value);
    if (requireFill) {
      Alert.alert(
        "Dados em falta.",
        "Alguns dados não foram preenchidos, continuar mesmo assim?",
        [
          {
            text: "Sim",
            onPress: () => {
              handleSubmitOnConfirm(data);
            },
          },
          { text: "Não" },
        ]
      );
    }
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

  const loadingFormToRender = useCallback(
    async (state: boolean) => {
      setIsLoadingPage(state);
      onLoading?.(state);
    },
    [onLoading]
  );

  useEffect(() => {
    loadingFormToRender(false);
  }, [loadingFormToRender]);

  const startData = (props: Omit<FormFieldListResponseData, "formFieldId">) => {
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
      append({
        fields: {
          ...item,
          formFieldId: item.id,
          section: null,
        },
        value: startData(item),
      });
    }
  }, [append, data]);

  return {
    collections,
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
