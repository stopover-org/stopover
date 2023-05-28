import React from "react";
import useEdges from "./useEdges";

export function usePagedEdges<T>(
  data: {
    readonly edges: ReadonlyArray<{ readonly node: T | null }>;
  },
  page: number,
  perPage: number
) {
  const edges = useEdges<T>(data);

  return React.useMemo(
    () => edges.slice((page - 1) * perPage, page * perPage),
    [page, edges]
  );
}
