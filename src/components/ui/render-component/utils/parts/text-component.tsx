import { Input } from "@/components/ui/input";

export function getTextComponent(
  defaultData: any,
  onChange?: (data: any) => void
) {
  return <Input value={defaultData} onChangeText={onChange} />;
}
