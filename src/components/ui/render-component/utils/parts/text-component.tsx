import { Input } from "@/components/ui/input";

export function getTextComponent(
  defaultData: any,
  onChange?: (data: any) => void
) {
  return (
    <Input
      placeholder="Texto curto"
      defaultValue={defaultData}
      onChangeText={onChange}
    />
  );
}
