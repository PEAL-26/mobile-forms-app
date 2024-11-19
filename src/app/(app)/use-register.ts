import { useFieldArray, useForm } from "react-hook-form";
import {
  dataCollectionSchema,
  DataCollectionSchemaType,
  DataUpdate,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { fieldsSeed, formsSeed } from "@/db/data";
import { useEffect, useState } from "react";

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

export function useRegister() {
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const form = useForm<DataCollectionSchemaType>({
    resolver: zodResolver(dataCollectionSchema),
    mode: "onChange",
    defaultValues: DATA,
  });

  const { fields: collections, update } = useFieldArray({
    control: form.control,
    name: "collections",
  });

  const { response } = useQueryData();

  const handleSubmit = (data: DataCollectionSchemaType) => {
    console.log(JSON.stringify(data, null, 5));
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
  }, []);

  return {
    collections,
    form,
    response,
    isLoadingPage,
    handleSubmit: form.handleSubmit(handleSubmit, onError),
    handleUpdate,
  };
}
