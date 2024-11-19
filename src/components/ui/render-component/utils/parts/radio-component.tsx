import { RadioGroupArray } from "../radio-array";

export function getRadioComponent(
  data: { value: string; label: string }[],
  defaultData?: any,
  onChange?: (data: any | null) => void
) {
  return (
    <RadioGroupArray
      data={data}
      defaultValue={defaultData}
      onChange={onChange}
    />
  );
}
