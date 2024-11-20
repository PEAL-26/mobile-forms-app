import { ActivityIndicator, View } from "react-native";
import { FlashListError } from "./flash-list-error";
import { cn } from "@/lib/utils";
import { DimensionValue } from "react-native";

export interface FlashListLoaderProps {
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  dataLength?: number;
}

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
  config?: { className?: string; height?: DimensionValue }
) {
  const { className, height } = config || {};
  return (
    <View
      style={{ height }}
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
