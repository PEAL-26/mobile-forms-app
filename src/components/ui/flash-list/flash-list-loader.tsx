import { ActivityIndicator, View } from "react-native";
import { FlashListError } from "./flash-list-error";
import { FlashListLoaderProps } from "./types";
import { cn } from "@/lib/utils";

export function FlashListLoader(props: FlashListLoaderProps) {
  const { isError, isLoading, refetch } = props;
  if (!isLoading && !isError) return null;

  if (isError) {
    return <FlashListError refetch={refetch} />;
  }

  if (isLoading) {
    return <ActivityIndicator animating size={16} color={"#000"} />;
  }
}

export function setFlashListLoader(
  isLoading?: boolean,
  isError?: boolean,
  refetch?: () => void,
  config?: { className: string }
) {
  const { className } = config || {};
  return (
    <View
      className={cn("px-4 pb-4 w-full justify-center items-center", className)}
    >
      <FlashListLoader
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
    </View>
  );
}
