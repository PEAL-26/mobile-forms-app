import { useState } from "react";
import { ChevronsUpDown } from "lucide-react-native";
import { cn } from "@/lib/utils";

import { Text } from "./text";
import { Button } from "./button";
import { SelectDataModal } from "../modals/select-data-modal";

type ItemType = {
  id: string;
  title: string;
};

interface Props<T extends ItemType> {
  defaultItem?: T;
  items?: T[];
  placeholder?: string;
  onSelect?(item: T | null): void;
}

export function Select<T extends ItemType>(props: Props<T>) {
  const { items = [], defaultItem, onSelect } = props;

  const [currentItem, setCurrentItem] = useState<T | undefined>(defaultItem);
  const [openModal, setOpenModal] = useState(false);

  const handleSelect = (data: T | null) => {
    setCurrentItem(data || undefined);
    onSelect?.(data || null);

    console.log(data);
  };

  return (
    <>
      <Button
        className="h-12 px-3 text-xs w-full rounded-md border border-input bg-background flex-row items-center justify-between"
        containerClassName="w-full "
        onPress={() => setOpenModal(true)}
      >
        <>
          <Text
            className={cn("text-xs", !currentItem?.title && "text-gray-500")}
          >
            {currentItem?.title ?? "Selecione um item"}
          </Text>
          <ChevronsUpDown size={14} color="#9ca3af" />
        </>
      </Button>

      <SelectDataModal
        data={items}
        onSelect={handleSelect}
        open={openModal}
        onClose={setOpenModal}
      />
    </>
  );
}
