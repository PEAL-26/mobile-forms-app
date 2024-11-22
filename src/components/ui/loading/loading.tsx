import { Modal } from "react-native";
import { LoadingPage } from "./loading-page";

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
      <LoadingPage
        backgroundColor={backgroundColor}
        color={color}
        size={size}
      />
    </Modal>
  );
}
