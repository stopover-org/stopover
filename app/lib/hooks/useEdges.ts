import React from "react";

function useEdges<T>(data: {
  readonly edges: ReadonlyArray<{ readonly node: T | null }>;
}): readonly T[] {
  return React.useMemo(() => {
    if (!data.edges) return [];
    return data.edges
      .filter((edge: { node: T | null }) => Boolean(edge.node))
      .map((edge: { node: T | null }) => edge.node) as T[];
  }, [data]);
}

export default useEdges;
