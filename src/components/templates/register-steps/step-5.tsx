import { Text, View, ViewProps } from "react-native";

type Data = {};

interface Props extends ViewProps {
  step: number;
  onChange?(props: {data: Data, isError: boolean}): void;
}

export function RegisterStep5(props: Props) {
  const { ...rest } = props;

  return (
    <View {...rest}>
      <Text>{`Formulário 5`}</Text>
    </View>
  );
}
