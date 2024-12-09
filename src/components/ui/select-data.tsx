import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ActivityIndicator } from "react-native";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";

interface Props<T> {
  data: T[];
  defaultValue?: T;
  onSelect?(selectedItem: T, index: number): void;
  placeholder?: string;
  labelField?: keyof T;
  className?: string;
  containerClassName?: string;
  search?: boolean;
  dropdownWith?: number;
}

export function SelectData<T>(props: Props<T>) {
  const {
    data,
    onSelect,
    placeholder = "Selecione um item",
    labelField = "name" as keyof T,
    search = false,
    className,
    containerClassName,
    defaultValue,
    dropdownWith,
  } = props;

  return (
    <SelectDropdown
      data={data}
      defaultValue={defaultValue}
      onSelect={(item, index) => onSelect?.(item, index)}
      dropdownOverlayColor="transparent"
      search={search ? true : undefined}
      searchPlaceHolder={search ? "Pesquisar" : undefined}
      searchPlaceHolderColor={search ? "#6b7280" : undefined}
      renderButton={(selectedItem, isOpened) => {
        return (
          <Button
            className={cn(
              "h-12 px-3 text-xs w-full rounded-md border border-input bg-background flex-row items-center justify-between gap-2",
              className
            )}
            containerClassName={cn(containerClassName)}
            // onPress={handleOpen}
          >
            <>
              <Text
                className={cn(
                  "text-xs whitespace-nowrap",
                  !selectedItem && "text-gray-500"
                )}
              >
                {(selectedItem && selectedItem[labelField]) || placeholder}
              </Text>
              <View className="flex-row gap-2 items-center">
                {/* {isLoading && (
                  <ActivityIndicator color="#9ca3af" animating size={14} />
                )} */}
                {isOpened ? (
                  <ChevronUpIcon size={14} color="#9ca3af" />
                ) : (
                  <ChevronDownIcon size={14} color="#9ca3af" />
                )}
              </View>
            </>
          </Button>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <TouchableOpacity activeOpacity={0.6}>
            <View className="bg-white px-3 py-2">
              <Text>{item[labelField] || ""}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={{ ...styles.dropdownMenuStyle, width: dropdownWith }}
    />
  );
}

const styles = StyleSheet.create({
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
    marginTop: -25,
  },
});
