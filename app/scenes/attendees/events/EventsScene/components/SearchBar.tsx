import React, { ChangeEvent } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { graphql, useRefetchableFragment } from "react-relay";
import { Autocomplete, AutocompleteOption, Chip } from "@mui/joy";
import moment from "moment";
import { useRouter } from "next/router";
import { stringify } from "qs";
import Typography from "../../../../../components/v2/Typography/Typography";
import { SearchBar_EventsAutocompleteFragment$key } from "../../../../../artifacts/SearchBar_EventsAutocompleteFragment.graphql";
import { SearchBarAutocompleteQuery } from "../../../../../artifacts/SearchBarAutocompleteQuery.graphql";
import Link from "../../../../../components/v2/Link/Link";
import { useUpdateQuery, useQuery } from '../../../../../lib/hooks/useQuery'

interface SearchBarProps {
  eventsAutocompleteFragmentRef: SearchBar_EventsAutocompleteFragment$key;
}

const SearchBar = ({ eventsAutocompleteFragmentRef }: SearchBarProps) => {
  const updateQuery = useUpdateQuery('query')
  const updateInterest = useUpdateQuery('interests', [])
  const query = useQuery('query', '')
  const router = useRouter();
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
    if (requestRef.current) {
      clearTimeout(requestRef.current);

      requestRef.current = null;
    }
    requestRef.current = setTimeout(() => {
      refetch({ query }, { fetchPolicy: "store-and-network" });
    }, 500);
  }, [query]);

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
      e.preventDefault()
      e.stopPropagation()
    }

    updateQuery(query)
  }

  return (
    <Autocomplete
      disableClearable
      options={options}
      size="lg"
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.title
      }
      sx={{ borderRadius: "0", marginRight: "5px" }}
      groupBy={(option) => option.type}
      onBlur={onQueryChange}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          updateQuery((e.target as HTMLInputElement).value)
        }
      }}
      onInputChange={(e, value) => {
        updateQuery(value);
      }}
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          {option.link ? (
            <Link primary href={option.link}>
              <Typography>{option.title}</Typography>
            </Link>
          ) : (
            <Typography color='primary'>{option.title}</Typography>
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
      onChange={(evt, value) => {
        if (typeof value === 'string') {
          updateQuery(value)
          return
        }

        if (value.link) {
          router.push(value.link);
        } else if (value.type === 'interest' && value.query) {
          updateInterest(value.query)
        }
      }}
      inputValue={query}
      endDecorator={<SearchIcon />}
      freeSolo
    />
  );
};

export default React.memo(SearchBar);
