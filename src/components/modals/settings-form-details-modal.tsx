import { View, XIcon } from "lucide-react-native";
import { Modal } from "react-native";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

interface Props {
  formId?: number;
  open?: boolean;
  onClose?(state: false): void;
}
export function SettingsFormDetailsModal(props: Props) {
  const { formId, open, onClose } = props;
  return null;
  
  if (!formId || !open) return null;

  const handleClose = () => {
    onClose?.(false);
  };

  return (
    <Modal
      visible={open}
      onRequestClose={handleClose}
      transparent
      statusBarTranslucent
    >
      <View style={{backgroundColor: '#00000050'}} className="flex-1 justify-center items-center bg-black/50 p-10">
        <View className="rounded-md bg-white shadow overflow-hidden h-[400px] w-full">
          {/* Header */}
          {/* <View className="flex flex-row items-center justify-between p-3 border-b border-b-gray-200">
            <Text className="font-bold">Detalhe do Formulário</Text>
            <Button onPress={handleClose} icon={XIcon} />
          </View> */}

          {/* <View className="flex-1 items-center justify-center">
            <Text className="text-centerF">Em Desenvolvimento</Text>
          </View> */}
        </View>
      </View>
    </Modal>
  );
}
