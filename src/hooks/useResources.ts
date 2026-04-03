// /hooks/useResources.ts
import useSWRInfinite from 'swr/infinite';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export const useResources = (category?: string) => {
  const getKey = (pageIndex: number, prev: any) => {
    if (prev && !prev.hasMore) return null;
    return `/api/v2/resources?page=${pageIndex + 1}${category ? `&category=${category}` : ''}`;
  };

  const { data, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    { revalidateFirstPage: false }
  );

  return {
    resources: data ? data.flatMap(p => p.data) : [],
    isValidating,
    setSize,
    hasMore: data ? data[data.length - 1]?.hasMore : true,
  };
};
