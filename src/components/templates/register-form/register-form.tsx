import { View, ScrollView } from "react-native";
import { EyeIcon, PlusIcon, TrashIcon } from "lucide-react-native";

import { cn } from "@/lib/utils";
import { FIELD_TYPE_MAP } from "@/db";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckboxGroupItemWithLabel } from "@/components/ui/checkbox";
import { PreviewFormModal } from "@/components/modals/preview-form-modal";

import { RegisterFormProps } from "./types";
import { useRegisterForm } from "./use-register-form";

export function RegisterForm(props: RegisterFormProps) {
  const { fields, handleSubmit, handleAddField, handleRemoveField } =
    useRegisterForm(props);

  return (
    <>
      <ScrollView>
        <View className="flex-1 p-3  w-full">
          <Label>Nome do formulário</Label>
          <Input placeholder="Nome do formulário" />

          <View className="flex flex-row items-center gap-2 my-5">
            <View className="h-[1px] bg-gray-300 w-full flex-1" />
            <Text className="text-gray-600">Campos</Text>
            <View className="h-[1px] bg-gray-300 w-full flex-1" />
          </View>

          <View className="flex flex-col gap-3 ">
            {fields.map((field) => (
              <View key={field.id} className="flex flex-col gap-2 ">
                <Input placeholder="Título *" />
                <Textarea placeholder="Descrição (opcional)" />
                {/* <Input placeholder="Secção (opcional)" />
                    <Input placeholder="Tipo *" /> */}
                {/* <Select items={sections} placeholder="Secção (opcional)" /> */}
                <Select
                  placeholder="Secção *"
                  items={Object.entries(FIELD_TYPE_MAP).map(([id, title]) => ({
                    id,
                    title,
                  }))}
                />
                <CheckboxGroupItemWithLabel
                  label="Campo obrigatório"
                  value="required-field"
                />
                <Input placeholder="Data" />
                <View className="flex flex-row items-center justify-center gap-3">
                  <Button
                    icon={EyeIcon}
                    // iconColor="#ef4444"
                    // onPress={() => handleRemoveField(field.identifier)}
                  />
                  <Button
                    icon={TrashIcon}
                    iconColor="#ef4444"
                    onPress={() => handleRemoveField(field.identifier)}
                  />
                </View>
                <View className="h-[1px] bg-gray-300 w-full flex-1 my-5" />
              </View>
            ))}
          </View>

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
    </>
  );
}
