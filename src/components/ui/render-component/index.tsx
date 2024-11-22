import { useEffect, useState } from "react";
import { View } from "react-native";
import { createSlug } from "@/helpers/slug";
import { Label } from "@/components/ui/label";
import { Component, DataType, getData, getTypeAndValues } from "./utils";
import { FIELD_TYPE_ENUM } from "@/db";

export type Field = {
  display: string;
  type: FIELD_TYPE_ENUM;
  identifier: string;
  data?: string | null;
  dataFields?: string | null;
  dataWhere?: string | null;
  extraField?: string | null;
  description?: string | null;
};

interface Props {
  fields: Field;
  defaultData?: any;
  defaultDataExtras?: any;
  onChange?(id: any): void;
  onChangeExtras?(id: any): void;
  onOpenOutside?(): void;
}

export function RenderComponent(props: Props) {
  const {
    fields,
    defaultData,
    defaultDataExtras,
    onChange,
    onChangeExtras,
    onOpenOutside,
  } = props;

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     setIsLoading(true);
  //     if (fields.type === "select") {
  //       const response = await getData(fields?.data, fields);
  //       if (!response) return;

  //       const data = getTypeAndValues(fields.data || "");

  //       if (data?.type === DataType.Array) {
  //         setData(
  //           response.map((item) => ({
  //             id: createSlug(String(item ?? "").trim()),
  //             title: String(item ?? "").trim(),
  //           }))
  //         );
  //       }
  //       if (data?.type === DataType.Table) {
  //         setData(response);
  //       }
  //     }

  //     if (fields.type === "radio" || fields.type === "checkbox") {
  //       const response = await getData(fields?.data, fields);
  //       if (!response) return;

  //       const data = getTypeAndValues(fields.data || "");
  //       if (data?.type === DataType.Array) {
  //         setData(
  //           response.map((item) => ({
  //             value: createSlug(String(item ?? "").trim()),
  //             label: String(item ?? "").trim(),
  //           }))
  //         );
  //       }
  //       if (data?.type === DataType.Table) {
  //         setData(
  //           response.map((item: any) => ({
  //             value: item.id,
  //             label: item.title,
  //           }))
  //         );
  //       }
  //     }
  //   })().finally(() => {
  //     setIsLoading(false);
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <View className="flex-col gap-2">
      <Label className="text-base">{fields.display}</Label>
      <Component
        type={fields.type}
        extras={fields?.extraField || undefined}
        identifier={fields.identifier}
        data={data}
        defaultData={defaultData}
        onChange={onChange}
        defaultDataExtras={defaultDataExtras}
        onChangeExtras={onChangeExtras}
        onOpenOutside={onOpenOutside}
        isLoading={isLoading}
      />
    </View>
  );
}
