import { cn } from "@/lib/utils";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  forwardRef,
  isValidElement,
  ReactNode,
} from "react";
import {
  TouchableOpacityProps,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

interface CustomProps extends TouchableOpacityProps{
  textClassName?: string;
  containerClassName?: string;
  iconClassName?: string;
  icon?: ElementType;
  iconColor?: string;
  children?: ReactNode;
  className?: string;
  style?: ViewStyle;
}

export const Button = forwardRef<
  ElementRef<typeof TouchableOpacity>,
  CustomProps
>((props, ref) => {
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
      ref={ref}
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
});

Button.displayName = "Button";
