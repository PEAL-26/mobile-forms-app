import { memo } from "react";
import { View } from "react-native";
import { EyeIcon, TrashIcon } from "lucide-react-native";

import { FIELD_TYPE_MAP } from "@/db";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckboxGroupItemWithLabel } from "@/components/ui/checkbox";

import { FormFieldSchemaType } from "./schema";

interface Props {
  field: FormFieldSchemaType;
  onRemoveField?(): void;
  onOpenDataTypeModal?(): void;
}

export const FieldComponent = memo((props: Props) => {
  const { field, onRemoveField, onOpenDataTypeModal } = props;

  return (
    <View className="flex flex-col gap-2 ">
      <Input placeholder="Título *" />
      <Textarea placeholder="Descrição (opcional)" />
      <Select
        items={[]}
        placeholder="Secção (opcional)"
        containerClassName="flex-1"
      />
      <Select
        placeholder="Tipo de dados"
        openOutside
        defaultItem={Object.entries(FIELD_TYPE_MAP)
          .map(([id, title]) => ({ id, title }))
          .find((f) => f.id === field.type)}
        onOpenOutside={onOpenDataTypeModal}
      />
      <Input placeholder="Data" />
      <CheckboxGroupItemWithLabel
        label="Campo obrigatório"
        value="required-field"
      />
      <View className="flex flex-row items-center justify-center gap-3 mt-4">
        <Button
          icon={EyeIcon}
          // onPress={() => handleRemoveField(field.identifier)}
        />
        <Button icon={TrashIcon} iconColor="#ef4444" onPress={onRemoveField} />
      </View>
      <View className="h-[1px] bg-gray-300 w-full flex-1 my-5" />
    </View>
  );
});

FieldComponent.displayName = "FieldComponent";
