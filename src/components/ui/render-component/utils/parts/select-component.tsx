import { Select } from "@/components/ui/select";

interface Props {
  data: any[];
  defaultData: any;
  onChange?: (data: any) => void;
  isLoading?: boolean;
}

export function getSelectComponent(props: Props) {
  const { data, defaultData, onChange, isLoading } = props;
  return (
    <Select
      items={data}
      defaultItem={defaultData}
      onSelect={onChange}
      isLoading={isLoading}
    />
  );
}
