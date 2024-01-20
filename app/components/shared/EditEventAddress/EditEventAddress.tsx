import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import React from "react";
import { Box, IconButton, Tooltip } from "@mui/joy";
import EditNoteIcon from "@mui/icons-material/Edit";
import { EditEventAddress_EventFragment$key } from "artifacts/EditEventAddress_EventFragment.graphql";
import EditEventAddressModal from "./EditEventAddressModal";

interface EditFirmAddressProps {
  eventFragmentRef: EditEventAddress_EventFragment$key;
}

const EditEventAddress = ({ eventFragmentRef }: EditFirmAddressProps) => {
  const event = useFragment(
    graphql`
      fragment EditEventAddress_EventFragment on Event {
        ...EditEventAddressModal_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <Tooltip title={t("forms.editFirmAddress.action")}>
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
      <EditEventAddressModal
        eventFragmentRef={event}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(EditEventAddress);
