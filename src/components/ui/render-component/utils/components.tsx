import { Text } from "../../text";
import { getComponentByType } from "./parts/utils";

export interface ComponentProps {
  type: string;
  data?: any[];
  defaultData?: any;
  extras?: string;
  onChange?(data: any): void;
  defaultDataExtras?: any;
  onChangeExtras?(data: any): void;
  identifier?: string;
  isLoading?: boolean;
  onOpenOutside?(): void;
}

export function Component(props: ComponentProps) {
  const component = getComponentByType(props);
  if (!component) return <Text>Component Inválido</Text>;
  return component;
}
