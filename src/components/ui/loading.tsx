import { Modal, View } from "react-native";
import { ActivityIndicator } from "react-native";

interface Props {
  show?: boolean;
  backgroundColor?: string;
  color?: string;
  size?: number | "small" | "large";
}

export function Loading(props: Props) {
  const {
    show = true,
    backgroundColor = "#00000050",
    color = "#FFF",
    size = "small",
  } = props;

  return (
    <Modal
      visible={show}
      onRequestClose={() => {}}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View
        style={[
          {
            backgroundColor,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator color={color} size={size} />
      </View>
    </Modal>
  );
}
