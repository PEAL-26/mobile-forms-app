import { useState } from "react";
import { RadioGroup, RadioGroupItemWithLabel } from "../../radio-group";
import { ComponentExtra } from "./component-extras";

interface Props {
  defaultData?: string;
  onChange?(value: boolean): void;
  type: string;
  identifier?: string;
  extras?: string;
  defaultDataExtras?: any;
  onChangeExtras?: (data: any) => void;
}

export function RadioYesNo(props: Props) {
  const {
    defaultData,
    onChange,
    type,
    identifier,
    extras,
    defaultDataExtras,
    onChangeExtras,
  } = props;

  const [value, setValue] = useState(defaultData);

  function onPress(value: string) {
    return () => {
      setValue(value);
      onChange?.(value === "true");
    };
  }

  const handleChangeExtras = (data: any) => {
    onChangeExtras?.({
      ...data.parent, identifier,
      extras: { value: data.value, display: data.display },
    });
  };

  return (
    <>
      <RadioGroup value={value} onValueChange={onPress}>
        <RadioGroupItemWithLabel
          value={"true"}
          label="Sim"
          onLabelPress={onPress("true")}
        />
        <RadioGroupItemWithLabel
          value={"false"}
          label="Não"
          onLabelPress={onPress("false")}
        />
      </RadioGroup>
      <ComponentExtra
        parentIdentifier={identifier}
        type={type}
        extras={extras}
        value={value}
        defaultData={defaultDataExtras}
        onChange={handleChangeExtras}
      />
    </>
  );
}
