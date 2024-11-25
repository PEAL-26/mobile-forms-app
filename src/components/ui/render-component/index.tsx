import { memo, ReactNode, useMemo } from "react";
import { ActivityIndicator } from "react-native";

import {
  ExtraFieldType,
  FIELD_TYPE_ENUM,
  FieldDataType,
  FieldDataWhereType,
} from "@/db";

import { Input } from "../input";
import { Textarea } from "../textarea";
import { CheckboxGroupArray } from "./utils/checkbox-array";
import { RadioYesNo } from "./utils/radio-yes-no";
import { RadioGroupArray } from "./utils/radio-array";
import { SelectData } from "./utils/select-data";
import { useRenderCount } from "@uidotdev/usehooks";

type DataType = {
  value: string;
  label: string;
};

interface Props {
  data?: DataType[];
  isLoading?: boolean;
  type: FIELD_TYPE_ENUM;
  extras?: ExtraFieldType;
  selectData?: FieldDataType | null;
  dataWhere?: FieldDataWhereType | null;
  identifier: string;
  defaultValue?: any;
  // defaultValueExtraField?: any;
  onChange?(value: any): void;
  onChangeExtraField?(value: any): void;
  // onOpenOutside?(): void;
  onClearSelect?(index: number): void;
  collections?: any;
}

export const RenderComponent = memo((props: Props) => {
  const {
    data = [],
    isLoading,
    type,
    extras,
    identifier,
    defaultValue, // No default value já virá com os dados do campo extra
    onChange,
    onChangeExtraField,
    onClearSelect,
    collections = [],
    dataWhere,
    selectData,
  } = props;
  const render = useRenderCount();
  console.log({ render });

  const component: ReactNode = useMemo(() => {
    if (type === FIELD_TYPE_ENUM.number) {
      return (
        <Input
          defaultValue={defaultValue}
          placeholder="Número"
          onChangeText={(text) => onChange?.(text ? Number(text) : undefined)}
          keyboardType="number-pad"
          returnKeyType="done"
        />
      );
    }

    if (type === FIELD_TYPE_ENUM.boolean) {
      return (
        <RadioYesNo
          defaultData={String(defaultValue)}
          onChange={onChange}
          identifier={identifier}
          type={type}
          extras={extras}
          defaultDataExtras={defaultValue?.extras}
          onChangeExtras={onChangeExtraField}
        />
      );
    }

    if (type === FIELD_TYPE_ENUM.radio) {
      return (
        <RadioGroupArray
          data={data}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      );
    }

    if (type === FIELD_TYPE_ENUM.checkbox) {
      return (
        <CheckboxGroupArray
          identifier={identifier}
          data={data}
          defaultValue={defaultValue}
          onChange={onChange}
          type={type}
          extras={extras}
          defaultDataExtras={defaultValue?.extras}
          onChangeExtras={onChangeExtraField}
        />
      );
    }

    if (type === FIELD_TYPE_ENUM.text) {
      return (
        <Input
          placeholder="Texto curto"
          defaultValue={defaultValue}
          onChangeText={onChange}
        />
      );
    }

    if (type === FIELD_TYPE_ENUM.text_long) {
      return (
        <Textarea
          placeholder="Texto longo"
          defaultValue={defaultValue}
          onChangeText={onChange}
        />
      );
    }

    if (type === FIELD_TYPE_ENUM.select) {
      return (
        <SelectData
          identifier={identifier}
          data={selectData}
          dataWhere={dataWhere}
          defaultValue={defaultValue}
          onChange={onChange}
          onClearSelect={onClearSelect}
          collections={collections}
        />
      );
    }
  }, [
    collections,
    data,
    dataWhere,
    defaultValue,
    extras,
    identifier,
    onChange,
    onChangeExtraField,
    onClearSelect,
    selectData,
    type,
  ]);

  if (isLoading) {
    return <ActivityIndicator animating size="small" color="#000" />;
  }

  return component;
});

RenderComponent.displayName = "RenderComponent";
