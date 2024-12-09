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

export interface CustomProps extends TouchableOpacityProps {
  textClassName?: string;
  containerClassName?: string;
  iconClassName?: string;
  icon?: ElementType;
  iconColor?: string;
  iconSize?: number;
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
    iconSize,
    disabled,
    ...rest
  } = props;

  isValidElement(children);

  return (
    <TouchableOpacity
      {...rest}
      disabled={disabled}
      ref={ref}
      activeOpacity={0.6}
      className={cn("w-fit", containerClassName)}
    >
      <View style={[style]} className={cn(className)}>
        {Icon && (
          <Icon
            size={iconSize}
            style={{ color: disabled ? "#6b7280" : iconColor }}
            className={cn(iconClassName)}
          />
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
