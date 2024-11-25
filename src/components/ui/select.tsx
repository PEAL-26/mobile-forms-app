import { useMemo, useRef, useState } from "react";
import { ChevronsUpDown } from "lucide-react-native";
import { cn } from "@/lib/utils";

import { Text } from "./text";
import { Button } from "./button";
import { SelectDataModal } from "../modals/select-data-modal";
import { ActivityIndicator, View } from "react-native";

type ItemType = {
  id: string;
  title: string;
};

interface Props<T extends ItemType> {
  defaultItem?: T;
  items?: T[];
  placeholder?: string;
  onSelect?(item: T | null): void;
  isLoading?: boolean;
  openOutside?: boolean;
  onOpenOutside?(): void;
  className?: string;
  containerClassName?: string;
}

export function Select<T extends ItemType>(props: Props<T>) {
  const {
    items = [],
    onSelect,
    isLoading,
    openOutside = false,
    onOpenOutside,
    placeholder = "Selecione um item",
    className,
    containerClassName,
  } = props;

  const defaultItem = useMemo(() => props?.defaultItem, [props?.defaultItem]);
  const [currentItem, setCurrentItem] = useState<T | undefined>();
  const [openModal, setOpenModal] = useState(false);

  const handleSelect = (data: T | null) => {
    setCurrentItem(data || undefined);
    onSelect?.(data || null);
  };

  const handleOpen = () => {
    if (isLoading) return;

    if (openOutside) {
      onOpenOutside?.();
      return;
    }

    setOpenModal(true);
  };

  const title = currentItem?.title
    ? currentItem?.title
    : defaultItem
    ? defaultItem.title
    : placeholder;

  return (
    <>
      <Button
        className={cn(
          "h-12 px-3 text-xs w-full rounded-md border border-input bg-background flex-row items-center justify-between",
          className
        )}
        containerClassName={cn("w-full", containerClassName)}
        onPress={handleOpen}
      >
        <>
          <Text
            className={cn(
              "text-xs",
              !currentItem?.title && !defaultItem?.title && "text-gray-500"
            )}
          >
            {title}
          </Text>
          <View className="flex-row gap-2 items-center">
            {isLoading && (
              <ActivityIndicator color="#9ca3af" animating size={14} />
            )}
            <ChevronsUpDown size={14} color="#9ca3af" />
          </View>
        </>
      </Button>

      {!openOutside && (
        <SelectDataModal
          // data={items}
          // onSelect={handleSelect}
          open={openModal}
          onClose={setOpenModal}
        />
      )}
    </>
  );
}
