import { View } from "react-native";

import { FieldType } from "@/db";
import { Label } from "../../label";
import { getComponentByType } from "./parts/utils";
import { parseJSON } from "@/helpers/json";

interface ComponentExtraProps {
  parentIdentifier?: string;
  extras?: string;
  type: string;
  value?: any;
  defaultData?: any;
  componentParentKey?: string;
  onChange?(data: any): void;
}
export function ComponentExtra(props: ComponentExtraProps) {
  const { parentIdentifier, extras, type, value, onChange, defaultData } =
    props;

  const fields = parseJSON<Extras>(extras);
  const triggerValue = getValueByType(type, value);
  const showComponent = checkTrigger(triggerValue, fields?.trigger);

  // useEffect(() => {
  //   if (!showComponent) {
  //     onChange?.(null);
  //   }
  // }, [showComponent, onChange]);

  if (!fields) return null;
  if (!extras || !value) return null;
  if (!showComponent) return null;

  const parentValue = {
    checkbox: value,
    boolean: { value },
  }[type];

  const component = getComponentByType({
    type: fields.type,
    defaultData,
    onChange: (valueExtra: any) => {
      const parent = {
        identifier: parentIdentifier,
        ...parentValue,
      };

      onChange?.({ value: valueExtra, display: fields?.display, parent });
    },
  });

  return (
    <View className="flex-col gap-2">
      <Label>{fields.display}</Label>
      {component}
    </View>
  );
}

type Trigger = "true" | "false" | "any";
type Extras = {
  display: "Quantidade";
  trigger: Trigger;
  type: FieldType;
};

export function checkTrigger(value: string | undefined, trigger?: Trigger) {
  if (!value || !trigger) return false;
  const newValue = String(value).trim();

  const show = {
    true: newValue === "true",
    false: newValue === "false",
    any:
      newValue !== "false" &&
      newValue !== "null" &&
      newValue !== "undefined" &&
      newValue !== "",
  }[trigger];

  return show;
}

export function getValueByType(type: string, value: any) {
  const result = {
    number: String(value ?? ""),
    boolean: String(value ?? ""),
    radio: String(value?.value ?? ""),
    checkbox: String(value?.checked ?? ""),
    text: String(value ?? ""),
    text_long: String(value ?? ""),
    select: String(value?.value ?? ""),
  }[type];

  return result;
}
