import { useEffect, useState } from "react";
import { View } from "react-native";
import { createSlug } from "@/helpers/slug";
import { Label } from "@/components/ui/label";
import { Component, DataType, getData, getTypeAndValues } from "./utils";

export type Field = {
  display: string;
  type: string;
  identifier: string;
  data?: string;
  dataFields?: string;
  dataWhere?: string;
  extraField?: string;
  description?: string;
};

interface Props {
  fields: Field;
  defaultData?: any;
  defaultDataExtras?: any;
  onChange?(id: any): void;
  onChangeExtras?(id: any): void;
}

export function RenderComponent(props: Props) {
  const { fields, defaultData, defaultDataExtras, onChange, onChangeExtras } =
    props;

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      if (fields.type === "select") {
        const response = await getData(fields?.data, fields);
        if (!response) return;

        const data = getTypeAndValues(fields.data || "");

        if (data?.type === DataType.Array) {
          setData(
            response.map((item) => ({
              id: createSlug(String(item ?? "").trim()),
              title: String(item ?? "").trim(),
            }))
          );
        }
        if (data?.type === DataType.Table) {
          setData(response);
        }
      }

      if (fields.type === "radio" || fields.type === "checkbox") {
        const response = await getData(fields?.data, fields);
        if (!response) return;

        const data = getTypeAndValues(fields.data || "");
        if (data?.type === DataType.Array) {
          setData(
            response.map((item) => ({
              value: createSlug(String(item ?? "").trim()),
              label: String(item ?? "").trim(),
            }))
          );
        }
        if (data?.type === DataType.Table) {
          setData(
            response.map((item: any) => ({
              value: item.id,
              label: item.title,
            }))
          );
        }
      }
    })();

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <View className="flex-col gap-2">
      <Label className="text-base">{fields.display}</Label>
      <Component
        type={fields.type}
        extras={fields?.extraField}
        identifier={fields.identifier}
        data={data}
        defaultData={defaultData}
        onChange={onChange}
        defaultDataExtras={defaultDataExtras}
        onChangeExtras={onChangeExtras}
      />
    </View>
  );
}
