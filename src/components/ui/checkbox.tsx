import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import { Platform } from "react-native";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react-native";
import { View } from "react-native";
import { Label } from "./label";

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "web:peer h-4 w-4 native:h-[20] native:w-[20] shrink-0 rounded-sm native:rounded border border-primary web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        props.checked && "bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("items-center justify-center h-full w-full")}
      >
        <Check
          size={12}
          strokeWidth={Platform.OS === "web" ? 2.5 : 3.5}
          className="text-primary-foreground"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

function CheckboxGroupItemWithLabel({
  checked,
  value,
  label,
  onChecked,
}: Readonly<{
  value: string;
  checked: boolean;
  label: string;
  onChecked: (checked: boolean) => void;
}>) {
  const [currentChecked, setChecked] = useState(checked);

  const handleChecked = (checked: boolean) => {
    setChecked(checked);
    onChecked?.(checked);
  };

  return (
    <View className={"flex-row gap-2 items-center"}>
      <Checkbox
        aria-labelledby={"label-for-" + value}
        checked={currentChecked}
        onCheckedChange={handleChecked}
      />
      <Label
        nativeID={"label-for-" + value}
        onPress={() => handleChecked(!currentChecked)}
      >
        {label}
      </Label>
    </View>
  );
}

export { Checkbox, CheckboxGroupItemWithLabel };