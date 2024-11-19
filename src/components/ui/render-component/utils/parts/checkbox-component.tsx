import { CheckboxGroupArray } from "../checkbox-array";

interface GetCheckboxComponentProps {
    type: string;
    data: { value: string; label: string }[];
    defaultData?: string[];
    onChange?: (data: any) => void;
    identifier?: string;
    extras?: string;
    defaultDataExtras?: any;
    onChangeExtras?: (data: any) => void;
  }
  
  export function getCheckboxComponent(props: GetCheckboxComponentProps) {
    const {
      type,
      data,
      defaultData,
      onChange,
      extras,
      defaultDataExtras,
      onChangeExtras,
      identifier,
    } = props;
    return (
      <CheckboxGroupArray
        identifier={identifier}
        data={data}
        defaultValue={defaultData}
        onChange={onChange}
        type={type}
        extras={extras}
        defaultDataExtras={defaultDataExtras}
        onChangeExtras={onChangeExtras}
      />
    );
  }