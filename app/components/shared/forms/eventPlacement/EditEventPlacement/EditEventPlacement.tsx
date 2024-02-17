import { graphql, useFragment } from "react-relay";
import React from "react";
import { Box } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { EditEventPlacement_EventPlacementFragment$key } from "artifacts/EditEventPlacement_EventPlacementFragment.graphql";
import Typography from "components/v2/Typography";
import EditEventPlacementModal from "./EditEventPlacementModal";

interface CreateEventPlacementProps {
  eventPlacementFragmentRef: EditEventPlacement_EventPlacementFragment$key;
}

const EditEventPlacement = ({
  eventPlacementFragmentRef,
}: CreateEventPlacementProps) => {
  const eventPlacement =
    useFragment<EditEventPlacement_EventPlacementFragment$key>(
      graphql`
        fragment EditEventPlacement_EventPlacementFragment on EventPlacement {
          ...EditEventPlacementModal_EventPlacementFragment
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
          {t("forms.editEventPlacement.action")}
        </Typography>
      </Box>
      <EditEventPlacementModal
        eventPlacementFragmentRef={eventPlacement}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(EditEventPlacement);
