import { useRef, useState } from "react";
import { RadioGroup, RadioGroupItemWithLabel } from "../../radio-group";

export function RadioGroupArray({
  data,
  defaultValue,
  onChange,
}: Readonly<{
  data: { value: string; label: string }[];
  defaultValue: string;
  onChange?: (data: { value: string; label: string } | null) => void;
}>) {
  const valueRef = useRef<string | undefined>();
  const [value, setValue] = useState(defaultValue);

  function onPress(value: string) {
    if (valueRef.current === value) return;

    const itemSelect = data.find((i) => i.value === value);
    return () => {
      valueRef.current = value;
      setValue(value);
      onChange?.(itemSelect || null);
    };
  }

  return (
    <RadioGroup value={value} onValueChange={onPress}>
      {data.map((item) => (
        <RadioGroupItemWithLabel
          key={item.value}
          value={item.value}
          label={item.label}
          onLabelPress={onPress(item.value)}
        />
      ))}
    </RadioGroup>
  );
}
