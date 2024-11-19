import { RadioYesNo } from "../radio-yes-no";

interface GetBooleanComponentProps {
    defaultData?: boolean;
    onChange?: (data: boolean) => void;
    type: string;
    identifier?: string;
    extras?: string;
    defaultDataExtras?: any;
    onChangeExtras?: (data: any) => void;
  }
  
  export function getBooleanComponent(props: GetBooleanComponentProps) {
    const {
      type,
      defaultData,
      onChange,
      identifier,
      extras,
      defaultDataExtras,
      onChangeExtras,
    } = props;
  
    return (
      <RadioYesNo
        defaultData={String(defaultData)}
        onChange={onChange}
        identifier={identifier}
        type={type}
        extras={extras}
        defaultDataExtras={defaultDataExtras}
        onChangeExtras={onChangeExtras}
      />
    );
  }
  