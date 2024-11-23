import { View } from "react-native";
import { ActivityIndicator } from "react-native";

interface Props {
  backgroundColor?: string;
  color?: string;
  size?: number | "small" | "large";
}

export function LoadingPage(props: Props) {
  const {
    backgroundColor = "transparent",
    color = "#000",
    size = "small",
  } = props;

  return (
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
  );
}
