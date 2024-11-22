import { View, ScrollView } from "react-native";
import { PlusIcon } from "lucide-react-native";

import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FlashList } from "@/components/ui/flash-list";
import { PreviewFormModal } from "@/components/modals/preview-form-modal";

import { RegisterFormProps } from "./types";
import { useRegisterForm } from "./use-register-form";
import { FieldComponent } from "./field-component";
import { SeparatorWithLabel } from "@/components/ui/separator";
import { DataTypeModal } from "@/components/modals/data-type-modal";
import { useState } from "react";
import { FIELD_TYPE_ENUM } from "@/db";

export function RegisterForm(props: RegisterFormProps) {
  const {
    fields,
    handleSubmit,
    handleAddField,
    handleUpdateField,
    handleRemoveField,
    handleUpdateDataTypeField,
  } = useRegisterForm(props);

  const [openDataTypeModal, setOpenDataTypeModal] = useState(false);
  const [fieldSelect, setFieldSelect] = useState<string | undefined>();

  const handleSelectDataType = (type: FIELD_TYPE_ENUM) => {
    if (fieldSelect) {
      handleUpdateDataTypeField(fieldSelect, type);
    }
  };

  // console.log(fields);

  return (
    <>
      <ScrollView>
        <View className="flex-1 p-3  w-full pb-16">
          <Label>Nome do formulário</Label>
          <Input placeholder="Nome do formulário" />

          <SeparatorWithLabel label="Campos" />

          <FlashList
            data={fields}
            renderItem={({ item }) => (
              <FieldComponent
                field={item}
                onRemoveField={() => handleRemoveField(item.identifier)}
                onOpenDataTypeModal={() => {
                  setFieldSelect(item.identifier);
                  setOpenDataTypeModal(true);
                }}
              />
            )}
          />

          <Button
            icon={PlusIcon}
            className="flex-row items-center gap-3 justify-center p-2 bg-white rounded border border-gray-200"
            containerClassName="mt-5"
            onPress={handleAddField}
          >
            Adicionar
          </Button>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-end p-3 ">
        <Button
          className={cn("rounded p-2  px-3 bg-blue-700")}
          textClassName="text-white"
          onPress={handleSubmit}
        >
          Guardar
        </Button>
      </View>
      <PreviewFormModal fields={{}} />
      {openDataTypeModal && (
        <DataTypeModal
          open={openDataTypeModal}
          onClose={setOpenDataTypeModal}
          onSelect={handleSelectDataType}
        />
      )}
    </>
  );
}
