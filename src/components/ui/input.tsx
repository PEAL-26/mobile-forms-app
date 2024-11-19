import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { TextInput } from "react-native";
import { cn } from "@/lib/utils";

const Input = forwardRef<
  ElementRef<typeof TextInput>,
  ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        "h-8 web:flex web:w-full rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-ring web:focus-visible:ring-offset-0",
        props.editable === false && "opacity-50 web:cursor-not-allowed",
        className
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };