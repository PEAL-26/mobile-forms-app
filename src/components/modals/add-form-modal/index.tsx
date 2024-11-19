import { Modal, ScrollView, Text, View } from "react-native";
import { PlusIcon, TrashIcon, XIcon } from "lucide-react-native";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useAddForm } from "./use-add-form";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FIELD_TYPE_MAP } from "@/db";

interface Props {
  open?: boolean;
  onClose?(state: false): void;
}

export function AddFormModal(props: Props) {
  const { open, onClose } = props;

  const handleClose = () => {
    onClose?.(false);
  };

  const { fields, handleAddField, handleRemoveField } = useAddForm();

  const sections = [{ id: "1", title: "Secção 1" }];

  return (
    <Modal
      visible={open}
      onRequestClose={handleClose}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/50 p-10">
        <View className="flex-1 rounded-md bg-white shadow overflow-hidden w-full">
          {/* Header */}
          <View className="flex flex-row items-center justify-between p-3 border-b border-b-gray-200">
            <Text className="font-bold">Adicionar formulário</Text>
            <Button onPress={handleClose} icon={XIcon} />
          </View>

          {/* Body */}
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
                    <Select items={sections} placeholder="Secção (opcional)" />
                    <Select
                      placeholder="Secção *"
                      items={Object.entries(FIELD_TYPE_MAP).map(
                        ([id, title]) => ({ id, title })
                      )}
                    />
                    <Input placeholder="Data" />
                    <View className="flex flex-row items-center justify-center">
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

              <Button>Guardar</Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
