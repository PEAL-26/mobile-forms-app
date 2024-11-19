import { View } from "react-native";
import { useEffect, useState } from "react";
import { CheckboxGroupItemWithLabel } from "../../checkbox";
import { ComponentExtra } from "./component-extras";

type Item = { value: string; label: string; checked: boolean };

interface Props {
  data: { value: string; label: string }[];
  identifier?: string;
  defaultValue?: string[];
  onChange?: (data: Item[] | null) => void;
  type: string;
  extras?: string;
  defaultDataExtras?: any;
  onChangeExtras?: (data: any) => void;
}

export function CheckboxGroupArray(props: Props) {
  const {
    identifier,
    data,
    defaultValue,
    onChange,
    type,
    extras,
    defaultDataExtras,
    onChangeExtras,
  } = props;

  const [currentData, setCurrentData] = useState<Item[]>([]);
  const [currentDataExtra, setCurrentDataExtra] = useState<any[]>([]);

  useEffect(() => {
    const parents: Item[] = [];
    const extras: any[] = [];
    data.forEach((item) => {
      const parent = { ...item, checked: false };
      parents.push(parent);
      extras.push({ ...parent, identifier, extras: null });
    });

    setCurrentData(parents);
    setCurrentDataExtra(extras);
  }, [data, identifier]);

  const handleChange = (data: any) => {
    let extrasData: any[] = [];
    let update = false;
    const newData = currentData.map((d) => {
      if (d.value === data.value && !data.checked) {
        extrasData = currentDataExtra.map((prev: any) => {
          if (prev.value === d.value) {
            update = prev.extras !== null;
            prev.extras = null;
          }

          return { ...prev };
        });
      }

      if (d.value === data.value) {
        return { ...data };
      }

      return { ...d };
    });

    onChange?.(newData);
    setCurrentData(newData);

    if (update) {
      onChangeExtras?.(extrasData);
      setCurrentDataExtra(extrasData);
    }
  };

  const handleChangeExtras = (data: any) => {
    const newData = currentDataExtra.map((d, index) => {
      if (d.value === data.parent.value) {
        return {
          ...d,
          ...currentData[index], identifier,
          extras: { value: data.value, display: data.display },
        };
      }

      return {
        ...d,
      };
    });

    onChangeExtras?.(newData);
    setCurrentDataExtra(newData);
  };

  return (
    <View className="flex-col gap-2">
      {data.map((item) => (
        <CheckboxCustom
          key={item.value}
          identifier={identifier}
          value={item.value}
          label={item.label}
          checked={!!defaultValue?.includes(item.value)}
          onChange={handleChange}
          type={type}
          extras={extras}
          defaultDataExtras={defaultDataExtras}
          onChangeExtras={handleChangeExtras}
        />
      ))}
    </View>
  );
}

interface CheckboxCustomPros {
  identifier?: string;
  label: string;
  value: string;
  checked?: boolean;
  type: string;
  extras?: string;
  defaultDataExtras?: any;
  onChange?(data: any): void;
  onChangeExtras?(data: any): void;
}

export function CheckboxCustom(props: CheckboxCustomPros) {
  const {
    identifier,
    value,
    label,
    checked,
    type,
    extras,
    defaultDataExtras,
    onChangeExtras,
    onChange,
  } = props;

  const [currentValue, setCurrentValue] = useState(false);
  function onPress(checked: boolean) {
    onChange?.({ value, label, checked });
    setCurrentValue(checked);
  }

  return (
    <>
      <CheckboxGroupItemWithLabel
        value={value}
        label={label}
        checked={!!checked}
        onChecked={(checked) => onPress(checked)}
      />
      <ComponentExtra
        parentIdentifier={identifier}
        type={type}
        extras={extras}
        value={{ value, label, checked: currentValue }}
        defaultData={defaultDataExtras}
        onChange={onChangeExtras}
      />
    </>
  );
}