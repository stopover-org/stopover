import { EventPlacementPreview_EventPlacementFragment$key } from "artifacts/EventPlacementPreview_EventPlacementFragment.graphql";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { Box } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Typography from "components/v2/Typography/Typography";
import EventPlacementPreviewModal from "./EventPlacementPreviewModal";

interface EventPlacementPreviewProps {
  eventPlacementFragmentRef: EventPlacementPreview_EventPlacementFragment$key;
}

const EventPlacementPreview = ({
  eventPlacementFragmentRef,
}: EventPlacementPreviewProps) => {
  const eventPlacement =
    useFragment<EventPlacementPreview_EventPlacementFragment$key>(
      graphql`
        fragment EventPlacementPreview_EventPlacementFragment on EventPlacement {
          ...EventPlacementPreviewModal_EventPlacementFragment
        }
      `,
      eventPlacementFragmentRef
    );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);

  return (
    <>
      <Box sx={{ marginBottom: "10px" }}>
        <Typography
          underline
          fontSize="sm"
          onClick={() => setModalOpened(true)}
          sx={{ cursor: "pointer" }}
        >
          {t("scenes.firms.events.eventScene.placementsInformation.places")}
        </Typography>
      </Box>
      {modalOpened && (
        <EventPlacementPreviewModal
          eventPlacementFragmentRef={eventPlacement}
          open={modalOpened}
          onClose={() => setModalOpened(false)}
        />
      )}
    </>
  );
};

export default React.memo(EventPlacementPreview);
