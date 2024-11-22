import { Modal, Text, View } from "react-native";
import { XIcon } from "lucide-react-native";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Form = {
  id: number;
  name: string;
  descriptions: string | null;
};

interface Props {
  onSelect?(data: Form): void;
  open?: boolean;
  onClose?(state: false): void;
}

export function ListingFormsModal(props: Props) {
  const { open, onClose, onSelect } = props;

  const handleClose = () => {
    onClose?.(false);
  };

  const handleSelect = (form: Form) => {
    onSelect?.(form);
  };

  return (
    <Modal
      visible={open}
      onRequestClose={handleClose}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/50 p-10">
        <View className="rounded-md bg-white shadow overflow-hidden h-80 w-full">
          {/* Header */}
          <View className="flex flex-row items-center justify-between p-3 border-b border-b-gray-200">
            <Text className="font-bold">Selecione um formulário</Text>
            <Button onPress={handleClose} icon={XIcon} />
          </View>

          {/* Body */}
          <View className="flex-1 p-3">
            {/* <Input placeholder="Pesquisar" /> */}
            <View className="justify-center items-center">
              <Text>Em Desenvolvimento (Brevemente)</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
