import { getBooleanComponent } from "./boolean-component";
import { getCheckboxComponent } from "./checkbox-component";
import { getNumberComponent } from "./number-component";
import { getRadioComponent } from "./radio-component";
import { getSelectComponent } from "./select-component";
import { getTextComponent } from "./text-component";
import { getTextLongComponent } from "./text-long-component";

export const component = {
  number: getNumberComponent,
  boolean: getBooleanComponent,
  radio: getRadioComponent,
  checkbox: getCheckboxComponent,
  text: getTextComponent,
  text_long: getTextLongComponent,
  select: getSelectComponent,
};

export {
  getBooleanComponent,
  getCheckboxComponent,
  getNumberComponent,
  getRadioComponent,
  getSelectComponent,
  getTextComponent,
  getTextLongComponent,
};
