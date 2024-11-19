import { cn } from "@/lib/utils";
import { ElementType, isValidElement } from "react";
import {
  TouchableOpacityProps,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CustomProps extends TouchableOpacityProps {
  textClassName?: string;
  containerClassName?: string;
  iconClassName?: string;
  icon?: ElementType;
  iconColor?: string;
}

export function Button(props: CustomProps) {
  const {
    children,
    className,
    textClassName,
    iconClassName,
    containerClassName,
    style,
    icon: Icon,
    iconColor = "#000",
    ...rest
  } = props;

  isValidElement(children);

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.6}
      className={cn("w-fit", containerClassName)}
    >
      <View style={[style]} className={cn(className)}>
        {Icon && (
          <Icon style={{ color: iconColor }} className={cn(iconClassName)} />
        )}
        {children && (
          <>
            {isValidElement(children) ? (
              children
            ) : (
              <Text className={cn(textClassName)}>{String(children)}</Text>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
