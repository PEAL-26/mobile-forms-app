import { Textarea } from "@/components/ui/textarea";

export function getTextLongComponent(
  defaultData: any,
  onChange?: (data: any) => void
) {
  return (
    <Textarea
      placeholder="Texto longo"
      defaultValue={defaultData}
      onChangeText={onChange}
    />
  );
}
