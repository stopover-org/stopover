import { useRouter } from "next/router";

export function useArrayValuesFromQuery(key: string): string[] {
  const router = useRouter();
  const q = { ...router.query };
  const queryValue: string | string[] | undefined = q[key];

  if (!queryValue) {
    return [];
  }

  const values = (Array.isArray(queryValue) ? queryValue : [queryValue]).filter(
    Boolean
  );

  return values;
}
