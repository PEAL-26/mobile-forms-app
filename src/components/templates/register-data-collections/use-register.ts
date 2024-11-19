import { useFieldArray, useForm } from "react-hook-form";
import {
  dataCollectionSchema,
  DataCollectionSchemaType,
  DataUpdate,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { fieldsSeed, formsSeed } from "@/db/data";
import { useCallback, useEffect, useState } from "react";
import { RegisterDataCollectionsProps } from "./types";
import { Alert } from "react-native";

export const DATA = {
  form: formsSeed[0],
  collections: fieldsSeed.map((field: any) => ({
    fields: {
      id: field.id,
      formId: field.formId,
      sectionId: field?.sectionId,
      display: field.display,
      type: field.type,
      identifier: field.identifier,
      data: field?.data,
      dataFields: field?.dataFields,
      dataWhere: field?.dataWhere,
      extraField: field?.extraField,
      description: field?.description,
    },
    value: "",
  })),
};

type QueryDataProps = {
  formId?: string;
};

function useQueryData(props?: QueryDataProps) {
  // const { formId } = props || {};

  // Aplicar a pesquisa dos campos pro formulário
  let response = {
    data: DATA.collections,
  };

  return { response };
}

export function useRegister(props: RegisterDataCollectionsProps) {
  const { form: collectionsForm, onLoading } = props;
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const form = useForm<DataCollectionSchemaType>({
    resolver: zodResolver(dataCollectionSchema),
    mode: "onChange",
    defaultValues: {
      form: collectionsForm,
    },
  });

  const { fields: collections, update } = useFieldArray({
    control: form.control,
    name: "collections",
  });

  const { response } = useQueryData();

  const handleSubmitOnConfirm = (data: DataCollectionSchemaType) => {
    console.log(data);
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

  const onError = (error: any) => {
    console.error(error);
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

  useEffect(() => {
    setIsLoadingPage(false);
    onLoading?.(false);
  }, [onLoading]);

  const loadingFormToRender = useCallback(async () => {
    // Carregar formulário
    setIsLoadingPage(false);
    onLoading?.(false);
  }, [onLoading]);

  useEffect(() => {
    loadingFormToRender();
  }, [form, loadingFormToRender]);

  return {
    collections,
    form,
    response,
    isLoadingPage,
    handleSubmit: form.handleSubmit(handleSubmit, onError),
    handleUpdate,
    isLoadingAll: false,
    isEmpty: false,
    refetch: () => {},
    loadNextPageData: () => {},
  };
}
