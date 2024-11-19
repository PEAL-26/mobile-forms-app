import { Select } from "@/components/ui/select";

export function getSelectComponent(
    data: any[],
    defaultData: any,
    onChange?: (data: any) => void
  ) {
    return <Select items={data} defaultItem={defaultData} onSelect={onChange} />;
  }
  