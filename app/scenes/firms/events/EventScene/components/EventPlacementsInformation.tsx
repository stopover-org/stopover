import { graphql, useFragment } from "react-relay";
import { Stack, TabPanel } from "@mui/joy";
import React from "react";
import Table from "components/v2/Table/Table";
import { useTranslation } from "react-i18next";
import { EventPlacementsInformation_EventFragment$key } from "artifacts/EventPlacementsInformation_EventFragment.graphql";
import CreateEventPlacement from "components/shared/forms/eventPlacement/CreateEventPlacement";

interface EventPlacementsInformationProps {
  eventFragmentRef: EventPlacementsInformation_EventFragment$key;
  index: number;
}

const EventPlacementsInformation = ({
  eventFragmentRef,
  index,
}: EventPlacementsInformationProps) => {
  const event = useFragment<EventPlacementsInformation_EventFragment$key>(
    graphql`
      fragment EventPlacementsInformation_EventFragment on Event {
        ...CreateEventPlacement_EventFragment
        eventPlacements {
          title
          id
          widthPlaces
          heightPlaces
          places {
            available
          }
        }
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const headers = React.useMemo(
    () => [
      {
        key: "title",
        width: 150,
        label: t("models.eventPlacement.attributes.title"),
      },
      {
        key: "widthPlaces",
        width: 50,
        label: t("models.eventPlacement.attributes.widthPlaces"),
      },
      {
        key: "heightPlaces",
        width: 50,
        label: t("models.eventPlacement.attributes.heightPlaces"),
      },
    ],
    []
  );

  const data = React.useMemo(
    () =>
      event.eventPlacements.map(({ title, widthPlaces, heightPlaces }) => ({
        title,
        widthPlaces,
        heightPlaces,
      })),
    [event.eventPlacements]
  );

  return (
    <TabPanel value={index} size="sm" sx={{ paddingTop: "20px" }}>
      <Stack direction="row" justifyContent="flex-end">
        <CreateEventPlacement eventFragmentRef={event} />
      </Stack>
      <Table data={data} headers={headers} />
    </TabPanel>
  );
};

export default React.memo(EventPlacementsInformation);
