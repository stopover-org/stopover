import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { graphql, useLazyLoadQuery, useRefetchableFragment } from "react-relay";
import { Autocomplete, AutocompleteOption, Chip } from "@mui/joy";
import moment from "moment";
import { useRouter } from "next/navigation";
import Typography from "components/v2/Typography/Typography";
import Link from "components/v2/Link/Link";
import { useQuery, useUpdateQuery } from "lib/hooks/useQuery";
import { SearchBar_EventsAutocompleteFragment$key } from "artifacts/SearchBar_EventsAutocompleteFragment.graphql";
import { SearchBarAutocompleteQuery } from "artifacts/SearchBarAutocompleteQuery.graphql";
import { SearchBar_AutocompleteQuery } from "artifacts/SearchBar_AutocompleteQuery.graphql";

interface SearchBarProps {
  redirect?: boolean;
}

const SearchBar = ({ redirect = false }: SearchBarProps) => {
  const router = useRouter();
  const updateQuery = useUpdateQuery("query");
  const updateInterest = useUpdateQuery("interests");
  const query = useQuery("query", "");
  const [internalQuery, setInternalQuery] = React.useState(query);
  const eventsAutocompleteFragmentRef =
    useLazyLoadQuery<SearchBar_AutocompleteQuery>(
      graphql`
        query SearchBar_AutocompleteQuery {
          ...SearchBar_EventsAutocompleteFragment
        }
      `,
      {}
    );

  const [data, refetch] = useRefetchableFragment<
    SearchBarAutocompleteQuery,
    SearchBar_EventsAutocompleteFragment$key
  >(
    graphql`
      fragment SearchBar_EventsAutocompleteFragment on Query
      @refetchable(queryName: "SearchBarAutocompleteQuery")
      @argumentDefinitions(query: { type: "String", defaultValue: "" }) {
        eventsAutocomplete(query: $query) {
          bookings {
            id
            bookedFor
            event {
              title
              id
            }
            trip {
              id
            }
          }
          events {
            id
            title
            ...EventCardCompacts_EventFragment
            ...EventCardWide_EventFragment
          }
          interests {
            id
            title
            slug
          }
        }
      }
    `,
    eventsAutocompleteFragmentRef
  );
  const requestRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    setInternalQuery(query);
  }, [query]);

  React.useEffect(() => {
    if (requestRef.current) {
      clearTimeout(requestRef.current);

      requestRef.current = null;
    }

    requestRef.current = setTimeout(() => {
      if (query !== internalQuery) {
        refetch({ query: internalQuery }, { fetchPolicy: "store-and-network" });
      }
    }, 500);
  }, [internalQuery]);

  const options = React.useMemo(
    () =>
      data
        ? [
            ...data.eventsAutocomplete.events.map((event) => ({
              id: event.id,
              title: event.title,
              date: null,
              type: "Event",
              link: `/events/${event.id}`,
              query: null,
            })),
            ...data.eventsAutocomplete.bookings.map((booking) => ({
              id: booking.id,
              title: booking.event.title,
              date: booking.bookedFor,
              type: "Booking",
              link: `/trips/${booking.trip.id}`,
              query: null,
            })),
            ...data.eventsAutocomplete.interests.map((interest) => ({
              id: interest.id,
              title: interest.title,
              date: null,
              type: "Interest",
              query: interest.slug,
              link: null,
            })),
          ]
        : [],
    [data]
  );

  const onQueryChange = (e?: React.SyntheticEvent<any, any>) => {
    if (e) {
      e.preventDefault();

      e.stopPropagation();
    }

    updateQuery(internalQuery);
  };

  return (
    <Autocomplete
      disableClearable
      options={options}
      size="lg"
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.title
      }
      groupBy={(option) => option.type}
      onBlur={(...rest) => {
        if (redirect) {
          router.push(`/events?query=${JSON.stringify(internalQuery)}`);
        } else {
          onQueryChange(...rest);
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          if (redirect) {
            router.push(`/events?query=${JSON.stringify(internalQuery)}`);
          } else {
            updateQuery(internalQuery);
          }
        }
      }}
      onInputChange={(e: any, value) => {
        setInternalQuery(value);
      }}
      renderOption={(props, option) => (
        <AutocompleteOption {...props} key={option.id}>
          {option.link ? (
            <Link primary href={option.link}>
              <Typography>{option.title}</Typography>
            </Link>
          ) : (
            <Typography color="primary">{option.title}</Typography>
          )}
          &nbsp;
          <Chip size="sm" variant="outlined">
            {option.type}
          </Chip>
          {option.date && (
            <Chip size="sm" variant="outlined">
              {moment(option.date).calendar()}
            </Chip>
          )}
        </AutocompleteOption>
      )}
      onChange={(evt: any, value) => {
        if (typeof value === "string") {
          setInternalQuery(value);
          return;
        }

        if (value.link) {
          router.push(value.link);
        } else if (value.type?.toLowerCase() === "interest" && value.query) {
          updateInterest([value.query]);
        }
      }}
      inputValue={internalQuery}
      endDecorator={<SearchIcon />}
      freeSolo
    />
  );
};

export default React.memo(SearchBar);
