import { View } from "react-native";

import { ExtraFieldTriggerType, ExtraFieldType, FieldType } from "@/db";
import { Label } from "../../label";
import { getComponentByType } from "./parts/utils";
import { parseJSON } from "@/helpers/json";

interface ComponentExtraProps {
  parentIdentifier?: string;
  extras?: ExtraFieldType;
  type: string;
  value?: any;
  defaultData?: any;
  componentParentKey?: string;
  onChange?(data: any): void;
}
export function ComponentExtra(props: ComponentExtraProps) {
  const { parentIdentifier, extras, type, value, onChange, defaultData } =
    props;

  // const fields = parseJSON<Extras>(extras);
  const triggerValue = getValueByType(type, value);
  const showComponent = checkTrigger(triggerValue, extras?.trigger);

  // useEffect(() => {
  //   if (!showComponent) {
  //     onChange?.(null);
  //   }
  // }, [showComponent, onChange]);

  if (!extras) return null;
  if (!value) return null;
  if (!showComponent) return null;

  const parentValue = {
    checkbox: value,
    boolean: { value },
  }[type];

  const component = getComponentByType({
    type: extras.type,
    defaultData,
    onChange: (valueExtra: any) => {
      const parent = {
        identifier: parentIdentifier,
        ...parentValue,
      };

      onChange?.({ value: valueExtra, display: extras?.display, parent });
    },
  });

  return (
    <View className="flex-col gap-2">
      <Label>{extras.display}</Label>
      {component}
    </View>
  );
}

export function checkTrigger(
  value: string | undefined,
  trigger?: ExtraFieldTriggerType
) {
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
