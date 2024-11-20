import { getBooleanComponent } from "./boolean-component";
import { getCheckboxComponent } from "./checkbox-component";
import { getNumberComponent } from "./number-component";
import { getRadioComponent } from "./radio-component";
import { getSelectComponent } from "./select-component";
import { getTextComponent } from "./text-component";
import { getTextLongComponent } from "./text-long-component";

export function getComponentByType(props: any) {
  const {
    type,
    identifier,
    data = [],
    defaultData,
    extras,
    onChange,
    defaultDataExtras,
    onChangeExtras,
    isLoading
  } = props;

  const component = {
    number: getNumberComponent(defaultData, onChange),
    boolean: getBooleanComponent(props),
    radio: getRadioComponent(data, defaultData, onChange),
    checkbox: getCheckboxComponent({
      identifier,
      data,
      defaultData,
      onChange,
      type,
      extras,
      defaultDataExtras,
      onChangeExtras,
    }),
    text: getTextComponent(defaultData, onChange),
    text_long: getTextLongComponent(defaultData, onChange),
    select: getSelectComponent({data, defaultData, onChange, isLoading}),
  }[String(type)];

  return component;
}
