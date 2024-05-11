import { parseValue } from "lib/hooks/useQuery";
import { GetVariablesFn } from "components/shared/relay/PreloadedQueryWrapper";
import moment from "moment";
import { EventsFilter } from "artifacts/scene_EventsPage_Query.graphql";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";
import { filterObject } from "filestack-js";

/**
 * @typedef {Object} EventsFilter
 *
 * @property {EventsFilter.query} query - Parses the given value into an EventsFilter query.
 * @property {EventsFilter.interests} interests - Parse the given value to construct an "interests" filter object.
 * @property {EventsFilter.minPrice} minPrice - Converts the provided value into an integer and returns it as the minimum price for filtering events.
 * @property {EventsFilter.maxPrice} maxPrice - Converts a string value to a maximum price number.
 * @property {EventsFilter.city} city - Parses the given value to form a valid "city" property value for the EventsFilter object.
 * @property {EventsFilter.endDate} endDate - Parses a value and returns the end date for an events filter.
 * @property {EventsFilter.startDate} startDate - Parses a string value into a start date for the EventsFilter.
 */
export const filterParsers: Record<
  string,
  (value: string, key?: string) => any
> = {
  /**
   * Parses the given value into an EventsFilter query.
   *
   * @param {string} value - The value to be parsed. Should be stringified string
   * @returns {EventsFilter["query"]} - The parsed query.
   */
  query: (value: string): EventsFilter["query"] => parseValue(value),
  /**
   * Parse the given value to construct an "interests" filter object.
   *
   * @param {string} value - The value representing the interests. Should be stringified array of strings
   * @returns {EventsFilter["interests"]} - The parsed interests filter object.
   */
  interests: (value: string): EventsFilter["interests"] => parseValue(value),
  /**
   * Converts the provided value into an integer and returns it as the minimum price for filtering events.
   *
   * @param {string} value - The value to be converted into an integer. Should be stringified integer number
   * @returns {EventsFilter["minPrice"]} - The minimum price value as an integer.
   */
  minPrice: (value: string): EventsFilter["minPrice"] => parseInt(value, 10),
  /**
   * Converts a string value to a maximum price number.
   *
   * @param {string} value - The value to convert to a maximum price. Should be stringified integer number.
   * @returns {EventsFilter["maxPrice"]} - The maximum price as a number.
   */
  maxPrice: (value: string): EventsFilter["maxPrice"] => parseInt(value, 10),
  /**
   * Parses the given value to form a valid "city" property value for the EventsFilter object.
   *
   * @param {string} value - The value to be parsed.
   * @returns {EventsFilter["city"]} - The parsed "city" property value.
   */
  city: (value: string): EventsFilter["city"] => parseValue(value),
  /**
   * Parses a value and returns the end date for an events filter.
   *
   * @param {string} value - The value to be parsed. Should be stringified array of two valid dates
   * @returns {EventsFilter["endDate"]} - The end date if the value is successfully parsed, otherwise undefined.
   */
  endDate: (value: string): EventsFilter["endDate"] => {
    const dates = parseValue(value);
    if (Array.isArray(dates) && dates.length === 2) {
      return dates
        .map((date) => moment(date))
        .filter((date) => date.isValid())
        .sort((a, b) => b.valueOf() - a.valueOf())[1];
    }
    return undefined;
  },
  /**
   * Parses a string value into a start date for the EventsFilter.
   *
   * @param {string} value - The value to parse. Should be stringified array of two valid dates
   * @returns {EventsFilter["startDate"]} - The start date for the EventsFilter.
   */
  startDate: (value: string): EventsFilter["startDate"] => {
    const dates = parseValue(value);
    if (Array.isArray(dates) && dates.length === 2) {
      return dates
        .map((date) => moment(date))
        .filter((date) => date.isValid())
        .sort((a, b) => b.valueOf() - a.valueOf())[0];
    }
    return undefined;
  },
};

/**
 * The string representing the title of a web page.
 *
 * @type {string}
 * @constant
 * @default "seo.events.title"
 */
export const PAGE_TITLE: string = "seo.events.title";
export const getVariables: GetVariablesFn = ({ params, searchParams }) => {
  const query = Object.entries(searchParams).reduce(
    (acc: EventsFilter, entry: [string, any]) => {
      try {
        if (entry[0] === "dates") {
          /**
           * Converts the given dates to Moment objects, filters out invalid dates, and sorts them in ascending order.
           *
           * @param {Array} dates - An array of dates.
           * @returns {Array} - An array of Moment objects representing valid dates sorted in ascending order.
           */
          const dates = [
            filterParsers.startDate(entry[1]),
            filterParsers.endDate(entry[1]),
          ]
            .filter(Boolean)
            .map((date) => moment(date))
            .filter((date) => date.isValid())
            .sort((a, b) => b.valueOf() - a.valueOf());

          if (dates.length !== 2) {
            return acc;
          }

          if (params.humanReadable) {
            acc.startDate = dates[1].calendar();

            acc.endDate = dates[0].calendar();
          } else {
            acc.startDate = dates[1].toISOString();

            acc.endDate = dates[0].toISOString();
          }
        } else {
          const key: keyof EventsFilter = entry[0] as keyof EventsFilter;
          const value = entry[1];
          const parser = filterParsers[key];
          if (parser) {
            acc[key] = parser(value);
          }
        }
        return acc;
      } catch (error) {
        console.warn(error);
        return acc;
      }
    },
    {}
  );
  return { filters: query };
};

/**
 * Represents the revalidate flag.
 *
 * @type {number}
 * @description The revalidate flag indicates whether revalidation is required.
 *              A value of 0 indicates revalidation is not required.
 */
export const revalidate: number = 0;

/**
 * Generates metadata for a given set of properties.
 *
 * @param {Object} props - The properties used to generate the metadata.
 * @param {Object} props.searchParams - The search parameters.
 * @param {Object} props.params - The parameters.
 * @param {string} props.params.language - The language.
 * @returns {Promise<Object>} - A Promise resolving to the generated metadata.
 */
export const generateMetadata = async (props: {
  searchParams: Record<string, string>;
  params: { language: string };
}): Promise<Metadata> => {
  const defaultVariables = {
    city: "Serbia",
    startDate: moment().calendar(),
    endDate: moment().endOf("day").calendar(),
    interests: [],
  };

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.events.description",
      keywords: "seo.events.keywords",
    },
    (rest) => getVariables(rest).filters,
    {
      params: { ...props.params, humanReadable: true },
      searchParams: props.searchParams,
    },
    false,
    defaultVariables
  );
};
