import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { graphql, useRefetchableFragment } from "react-relay";
import { Autocomplete, AutocompleteOption } from "@mui/joy";
import Typography from "../../../../../components/v2/Typography/Typography";
import { SearchBar_EventsAutocompleteFragment$key } from "../../../../../artifacts/SearchBar_EventsAutocompleteFragment.graphql";
import { SearchBarAutocompleteQuery } from "../../../../../artifacts/SearchBarAutocompleteQuery.graphql";

interface SearchBarProps {
  eventsAutocompleteFragmentRef: SearchBar_EventsAutocompleteFragment$key;
}

const SearchBar = ({ eventsAutocompleteFragmentRef }: SearchBarProps) => {
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
          }
          events {
            id
            title
            ...EventCardCompacts_EventFragment
            ...EventCardWide_EventFragment
          }
        }
      }
    `,
    eventsAutocompleteFragmentRef
  );
  const requestRef = React.useRef<NodeJS.Timeout | null>(null);
  const [query, setQuery] = React.useState<string>("");

  React.useEffect(() => {
    if (requestRef.current) {
      clearTimeout(requestRef.current);

      requestRef.current = null;
    }
    requestRef.current = setTimeout(() => {
      refetch({ query });
    }, 750);
  }, [query]);

  const options = React.useMemo(
    () =>
      data
        ? [
            ...data.eventsAutocomplete.events.map((event) => ({
              id: event.id,
              title: event.title,
              date: null,
              type: "event",
            })),
            ...data.eventsAutocomplete.bookings.map((booking) => ({
              id: booking.id,
              title: booking.event.title,
              date: booking.bookedFor,
              type: "booking",
            })),
          ]
        : [],
    [data]
  );

  return (
    <Autocomplete
      disableClearable
      options={options}
      variant="plain"
      size="sm"
      getOptionLabel={(option) => option.title}
      sx={{ borderRadius: "0", marginRight: "5px" }}
      onInputChange={(_, value) => setQuery(value)}
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          <Typography>{option.title}</Typography>
        </AutocompleteOption>
      )}
      endDecorator={<SearchIcon />}
    />
  );
};

export default React.memo(SearchBar);
