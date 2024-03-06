import { Box } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import { PlacesFieldset_EventFragment$key } from "artifacts/PlacesFieldset_EventFragment.graphql";
import Typography from "components/v2/Typography/Typography";
import { PlacesFieldset_ScheduleFragment$key } from "artifacts/PlacesFieldset_ScheduleFragment.graphql";
import SelectPlacesModal from "./SelectPlacesModal";

interface PlacesFieldsetProps {
  eventFragmentRef: PlacesFieldset_EventFragment$key;
  scheduleFragmentRef: PlacesFieldset_ScheduleFragment$key;
  booked: boolean;
}

const PlacesFieldset = ({
  eventFragmentRef,
  scheduleFragmentRef,
  booked,
}: PlacesFieldsetProps) => {
  const event = useFragment<PlacesFieldset_EventFragment$key>(
    graphql`
      fragment PlacesFieldset_EventFragment on Event {
        eventPlacements {
          ...SelectPlacesModal_EventPlacementFragment
        }
      }
    `,
    eventFragmentRef
  );

  const schedule = useFragment<PlacesFieldset_ScheduleFragment$key>(
    graphql`
      fragment PlacesFieldset_ScheduleFragment on Schedule {
        ...SelectPlacesModal_ScheduleFragment
      }
    `,
    scheduleFragmentRef
  );
  const eventPlacement = React.useMemo(() => event.eventPlacements[0], [event]);
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);

  return (
    <Box sx={{ marginBottom: "10px" }}>
      <Typography
        underline
        fontSize="sm"
        onClick={() => setModalOpened(true)}
        sx={{ cursor: "pointer" }}
        color="primary"
      >
        {t("scenes.attendees.events.eventScene.selectPlaces")}
      </Typography>
      {modalOpened && (
        <SelectPlacesModal
          eventPlacementFragmentRef={eventPlacement}
          scheduleFragmentRef={schedule}
          open={modalOpened}
          onClose={() => setModalOpened(false)}
          readonly={booked}
        />
      )}
    </Box>
  );
};

export default React.memo(PlacesFieldset);
