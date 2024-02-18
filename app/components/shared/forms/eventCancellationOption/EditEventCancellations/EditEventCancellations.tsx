import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import React from "react";
import { Box, IconButton, Tooltip } from "@mui/joy";
import EditNoteIcon from "@mui/icons-material/Edit";
import { EditEventCancellations_EventFragment$key } from "artifacts/EditEventCancellations_EventFragment.graphql";
import EditEventCancellationsModal from "./EditEventCancellationsModal";

interface EditEventCancellationProps {
  eventFragmentRef: EditEventCancellations_EventFragment$key;
}

const EditEventCancellations = ({
  eventFragmentRef,
}: EditEventCancellationProps) => {
  const event = useFragment(
    graphql`
      fragment EditEventCancellations_EventFragment on Event {
        ...EditEventCancellationsModal_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <Tooltip title={t("forms.editBookingCancellationsForm.action")}>
          <IconButton
            size="sm"
            color="primary"
            variant="outlined"
            onClick={() => setModalOpened(true)}
          >
            <EditNoteIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <EditEventCancellationsModal
        eventFragmentRef={event}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(EditEventCancellations);
