import { graphql, useLazyLoadQuery, useRefetchableFragment } from "react-relay";
import React from "react";
import {
  Autocomplete,
  AutocompleteOption,
  FormControl,
  FormLabel,
} from "@mui/joy";
import { EventsAutocompleteEventsAutocompleteQuery } from "artifacts/EventsAutocompleteEventsAutocompleteQuery.graphql";
import { parseValue, useQuery, useUpdateQuery } from "lib/hooks/useQuery";
import { EventsAutocomplete_AutocompleteQuery } from "artifacts/EventsAutocomplete_AutocompleteQuery.graphql";
import { EventsAutocomplete_EventsAutocompleteFragment$key } from "artifacts/EventsAutocomplete_EventsAutocompleteFragment.graphql";
import Checkbox from "components/v2/Checkbox";
import { useTranslation } from "react-i18next";

interface EventsAutocompleteProps {
  queryKey: string;
  label: string;
}

const EventsAutocomplete = ({ queryKey, label }: EventsAutocompleteProps) => {
  const eventIds: string[] = useQuery(queryKey, [], (value) =>
    Array.from(parseValue(value))
  );
  const updateEvents = useUpdateQuery(queryKey);
  const [query, setQuery] = React.useState("");
  const queryRef = useLazyLoadQuery<EventsAutocomplete_AutocompleteQuery>(
    graphql`
      query EventsAutocomplete_AutocompleteQuery($ids: [ID!], $query: String!) {
        currentUser {
          account {
            firm {
              ...EventsAutocomplete_EventsAutocompleteFragment
            }
          }
        }
      }
    `,
    { ids: eventIds, query: "" }
  );

  const [data, refetch] = useRefetchableFragment<
    EventsAutocompleteEventsAutocompleteQuery,
    EventsAutocomplete_EventsAutocompleteFragment$key
  >(
    graphql`
      fragment EventsAutocomplete_EventsAutocompleteFragment on Firm
      @refetchable(queryName: "EventsAutocompleteEventsAutocompleteQuery") {
        eventsAutocomplete(query: $query, ids: $ids) {
          events {
            id
            title
          }
        }
      }
    `,
    queryRef.currentUser.account.firm!
  );
  const requestRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (requestRef.current) {
      clearTimeout(requestRef.current);

      requestRef.current = null;
    }

    requestRef.current = setTimeout(() => {
      refetch({ query, ids: eventIds }, { fetchPolicy: "store-and-network" });
    }, 500);
  }, [query]);

  const selectedValue = React.useMemo(() => {
    const filteredValues = data.eventsAutocomplete.events
      .filter((event) => eventIds.includes(event.id))
      .map((event) => ({
        id: event.id,
        title: `${event.title.slice(0, 10)}...`,
      }));

    return filteredValues;
  }, [eventIds]);
  const { t } = useTranslation();

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Autocomplete
        disableClearable
        value={selectedValue}
        options={data.eventsAutocomplete.events || []}
        size="sm"
        getOptionLabel={(option) => option.title}
        onInputChange={(e: any, value) => {
          setQuery(value);
        }}
        limitTags={1}
        onChange={(_e, values) => updateEvents(values.map((event) => event.id))}
        placeholder={t("placeholders.bookings.eventIds")}
        renderOption={(props, option) => (
          <AutocompleteOption
            {...props}
            key={option.id}
            onClick={(e) => {
              e.preventDefault();

              e.stopPropagation();
              if (eventIds.includes(option.id)) {
                updateEvents(eventIds.filter((id) => option.id !== id));
              } else {
                updateEvents([...eventIds, option.id]);
              }
            }}
          >
            <Checkbox
              label={option.title}
              size="sm"
              checked={eventIds.includes(option.id)}
            />
          </AutocompleteOption>
        )}
        multiple
      />
    </FormControl>
  );
};

export default EventsAutocomplete;
