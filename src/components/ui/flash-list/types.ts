import { QueryPaginationResponse } from "@/hooks/use-query-pagination";
import {
  RenderTarget,
  FlashListProps as ShopifyFlashListProps,
} from "@shopify/flash-list";

export type FlashListProps<T> = ShopifyFlashListProps<T>;

export interface FlashListRenderItemProps<T> {
  item: T;
  index?: number;
  target?: RenderTarget;
  extraData?: any;
}

export interface FlashListErrorProps {
  refetch?(): void;
}

export interface FlashListLoaderProps {
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  dataLength?: number;
}

type Component =
  | React.ComponentType<any>
  | React.ReactElement
  | null
  | undefined;

export interface FlashListTemplateProps<T> {
  header?: Component;
  isFiltered?: boolean;
  response: QueryPaginationResponse<T>;
}
