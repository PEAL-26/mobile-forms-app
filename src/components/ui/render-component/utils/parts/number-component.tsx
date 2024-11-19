import { Input } from "@/components/ui/input";

export function getNumberComponent(
  defaultData?: string,
  onChange?: (data: any) => void
) {
  return (
    <Input
      value={defaultData}
      onChangeText={(text) => onChange?.(text ? Number(text) : undefined)}
      keyboardType="number-pad"
      returnKeyType="done"
    />
  );
}
