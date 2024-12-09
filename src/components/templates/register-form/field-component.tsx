import { memo } from "react";
import { View } from "react-native";
import { EyeIcon, TrashIcon } from "lucide-react-native";

import { FIELD_TYPE_MAP } from "@/db";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckboxWithLabel } from "@/components/ui/checkbox";

import { FormFieldSchemaType } from "./schema";
import {
  FieldComponentData,
  FieldComponentDataType,
} from "./field-component-data";
import { FieldComponentCondicional } from "./field-component-conditional";
import { Text } from "@/components/ui/text";

interface Props {
  field: FormFieldSchemaType;
  number?: number;
  onRemoveField?(): void;
  onOpenDataTypeModal?(): void;
  onOpenSectionModal?(): void;
  onUpdateData?(data: FieldComponentDataType): void;
  onOpenDataTableModal?(): void;
  onChangeRequiredField?(checked: boolean): void;
  onChangeTitle?(text: string): void;
  onChangeDescription?(text: string): void;
}

export const FieldComponent = memo((props: Props) => {
  const {
    field,
    number,
    onRemoveField,
    onOpenDataTypeModal,
    onOpenSectionModal,
    onUpdateData,
    onOpenDataTableModal,
    onChangeRequiredField,
    onChangeTitle,
    onChangeDescription,
  } = props;

  return (
    <View className="flex flex-col gap-2 ">
      <View className="flex-row items-center justify-between w-full">
        <CheckboxWithLabel
          label="Campo obrigatório?"
          value="required-field"
          checked={field.required}
          onChecked={onChangeRequiredField}
        />
        {number && <Text className="font-bold">{number}</Text>}
      </View>
      <Input
        placeholder="Título *"
        // defaultValue={field.display}
        onChangeText={onChangeTitle}
      />
      <Textarea
        placeholder="Descrição (opcional)"
        // defaultValue={field.description}
        onChangeText={onChangeDescription}
      />
      <Select
        placeholder="Secção (opcional)"
        containerClassName="flex-1"
        openOutside
        defaultItem={
          field.section
            ? { id: String(field.section.id), title: field.section.name }
            : undefined
        }
        onOpenOutside={onOpenSectionModal}
      />
      <Select
        placeholder="Tipo de dados"
        openOutside
        // defaultItem={Object.entries(FIELD_TYPE_MAP)
        //   .map(([id, title]) => ({ id, title }))
        //   .find((f) => f.id === field.type)}
        onOpenOutside={onOpenDataTypeModal}
      />
      <FieldComponentData
        // defaultData={field}
        type={field.type}
        onUpdate={onUpdateData}
        onOpenDataTableModal={onOpenDataTableModal}
      />
      {field.type === "boolean" && <FieldComponentCondicional />}
      <View className="flex flex-row items-center justify-center gap-3 mt-4 mb-5">
        <Button
          icon={EyeIcon}
          // onPress={() => handleRemoveField(field.identifier)}
        />
        <Button icon={TrashIcon} iconColor="#ef4444" onPress={onRemoveField} />
      </View>
      <View className="h-[1px] bg-gray-300 w-full flex-1" />
    </View>
  );
});

FieldComponent.displayName = "FieldComponent";
