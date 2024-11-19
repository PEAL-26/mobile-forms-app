import {
  keepPreviousData,
  useInfiniteQuery as useInfiniteQueryRQ,
} from "@tanstack/react-query";
import { QueryFnContext, QueryPaginationProps } from "./types";

export function useQueryPagination<T>(props: QueryPaginationProps<T>) {
  const { queryKey, fn, ...restProps } = props;

  const queryFn = async ({ pageParam: page, ...rest }: QueryFnContext) => {
    return fn({ page, ...rest });
  };

  const {
    data = [],
    hasNextPage,
    hasPreviousPage,
    isLoading: responseIsLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isError,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
    ...rest
  } = useInfiniteQueryRQ({
    queryFn,
    queryKey,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage?.prev ?? undefined,
    select: (data) => data?.pages?.flatMap((page) => page?.data) ?? [],
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    ...restProps,
  });

  const nextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const prevPage = () => {
    if (hasPreviousPage && !isFetchingPreviousPage) {
      fetchPreviousPage();
    }
  };
  const isLoading =
    responseIsLoading || isFetchingNextPage || isFetchingPreviousPage;
  return {
    data,
    isLoading: responseIsLoading,
    isLoadingAll: isLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isError,
    nextPage,
    prevPage,
    refetch,
    loadNextPageData: nextPage,
    isEmpty: !isError && !isLoading && data.length === 0,
    ...rest,
  };
}
