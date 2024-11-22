import { Select } from "@/components/ui/select";

interface Props {
  data: any[];
  defaultData: any;
  onChange?: (data: any) => void;
  isLoading?: boolean;
  onOpenOutside?(): void;
}

export function getSelectComponent(props: Props) {
  const { data, defaultData, onChange, isLoading, onOpenOutside } = props;
  return (
    <Select
      items={data}
      defaultItem={defaultData}
      onSelect={onChange}
      isLoading={isLoading}
      openOutside
      onOpenOutside={onOpenOutside}
    />
  );
}
