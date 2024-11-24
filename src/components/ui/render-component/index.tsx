import { View } from "react-native";

import { FIELD_TYPE_ENUM } from "@/db";
import { Label } from "@/components/ui/label";

import { Component } from "./utils";

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
  onChangeExtra?(id: any): void;
  onOpenOutside?(): void;
}

export function RenderComponent(props: Props) {
  const {
    fields,
    defaultData,
    defaultDataExtras,
    onChange,
    onChangeExtra: onChangeExtras,
    onOpenOutside,
  } = props;

  return (
    <View className="flex-col gap-2">
      <Label className="text-base">{fields.display}</Label>
      <Component
        type={fields.type}
        extras={fields?.extraField || undefined}
        identifier={fields.identifier}
        defaultData={defaultData}
        onChange={onChange}
        defaultDataExtras={defaultDataExtras}
        onChangeExtras={onChangeExtras}
        onOpenOutside={onOpenOutside}
      />
    </View>
  );
}
