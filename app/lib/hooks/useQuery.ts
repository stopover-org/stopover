import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Parses the given value if it is a valid JSON string.
 *
 * @param {string} value - The value to be parsed.
 * @returns {any} - The parsed JSON or undefined if the value is undefined or not a valid JSON string.
 */
export function parseValue(value?: string) {
  if (value === undefined) {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn(error);
    return undefined;
  }
}

/**
 * Retrieves and parses the value of a URL query parameter.
 *
 * @param {string} key - The query parameter key.
 * @param {any} [defaultValue] - The default value to return if the query parameter is not found.
 * @param {(value: string) => any} [parse] - A custom parsing function to convert the query parameter value.
 * @return {any} - The parsed value of the query parameter or the default value if not found.
 */
export function useQuery(
  key: string,
  defaultValue?: any,
  parse?: (value: string) => any
) {
  const query = useSearchParams();
  const value = query.get(key);
  return React.useMemo(
    /**
     * Parses a value with optional custom parsing function
     *
     * @param {Function} parse - The custom parsing function (optional)
     * @param {string} key - The key of the value to parse
     * @param {string} value - The value to parse
     * @param {*} defaultValue - The default value if the parsed value is undefined (optional)
     * @returns {*} - The parsed value or null if parsing fails
     */
    () => {
      const useCustomParse = parse instanceof Function;

      if (key) {
        if (!value) {
          return typeof defaultValue === "undefined" ? null : defaultValue;
        }

        if (useCustomParse && value) {
          return parse(value);
        }

        if (value) {
          return parseValue(value);
        }
      }

      return null;
    },
    [parse, key, value, defaultValue]
  );
}

/**
 * Removes a query parameter from the current URL and updates the browser history.
 *
 * @returns {Function} A callback function that takes a string key as a parameter.
 */
export function useRemoveQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

  return React.useCallback(
    /**
     * Removes a key from the query string and updates the current URL.
     *
     * @param {string} key - The key to be removed from the query string.
     */
    (key: string) => {
      query.delete(key);

      let queryString = query.toString();

      if (!queryString) {
        queryString = "";
      }

      router.push(`${pathname}?${queryString}`);
    },
    [query]
  );
}

/**
 * Updates the query parameter in the URL and navigates to the updated URL.
 *
 * @param {string} key - The name of the query parameter.
 * @param {function} [format] - An optional function to format the value before updating the query parameter.
 * @returns {function} - A callback function that accepts a value and updates the query parameter.
 */
export function useUpdateQuery(key: string, format?: (value: any) => string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  /**
   * Represents a memoized query object for React.
   *
   * @class
   * @name Query
   *
   * @param {URLSearchParams} searchParams - The URL search parameters to be wrapped.
   *
   * @returns {Query} The memoized query object.
   */
  const query = React.useMemo(
    () => new URLSearchParams(Array.from(searchParams.entries())),
    [searchParams]
  );

  return React.useCallback(
    /**
     * Updates the URL query string with the given key-value pair.
     * If the value is falsy, the key is removed from the query string.
     * If a custom format function is provided, it will be used to format the value.
     * Otherwise, the value will be converted to JSON string.
     *
     * @param {string} key - The key of the query parameter.
     * @param {any} value - The value of the query parameter.
     * @param {Function} [format] - Custom format function for the value.
     */
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
    [format, query, router, pathname, key]
  );
}
