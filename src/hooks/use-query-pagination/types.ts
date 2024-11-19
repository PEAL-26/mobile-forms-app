import { QueryFunctionContext } from '@tanstack/react-query';
import { ListResponseData } from '~/types/list-response';

type QueryKey = readonly unknown[];
type TPageParam = number;
export type QueryFnContext = QueryFunctionContext<QueryKey, TPageParam>;
export type FnProps = Omit<Partial<QueryFnContext>, 'pageParam'> & {
  page?: number;
};

export interface QueryPaginationProps<D, R = ListResponseData<D>> {
  queryKey: QueryKey;
  fn(props: FnProps): Promise<R>;
  refetchOnWindowFocus?: boolean;
}

export interface QueryPaginationResponse<T> {
  data: T[];
  loadNextPageData?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  isRefetching?: boolean;
  isFetching?: boolean;
  refetch?: () => void;
}
