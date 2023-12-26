import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQuery(
  key: string,
  defaultValue?: any,
  parse?: (value: string) => any
) {
  const query = useSearchParams();
  const value = query.get(key);
  return React.useMemo(() => {
    const useCustomParse = parse instanceof Function;

    if (key) {
      if (!value) {
        return typeof defaultValue === "undefined" ? null : defaultValue;
      }

      if (useCustomParse && value) {
        return parse(value);
      }

      if (value) {
        return JSON.parse(value);
      }
    }

    return null;
  }, [query, value, key]);
}

export function useUpdateQuery(key: string, format?: (value: any) => string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

  return React.useCallback(
    (value: any) => {
      const useCustomFormat = format instanceof Function;

      if (!value) {
        query.delete(key);
      } else {
        if (useCustomFormat) {
          value = format(value);
        } else {
          value = JSON.stringify(value);
        }

        query.set(key, value);
      }

      let queryString = query.toString();

      if (!queryString) {
        queryString = "";
      }

      router.push(`${pathname}?${queryString}`);
    },
    [key, query, pathname, searchParams, router]
  );
}
