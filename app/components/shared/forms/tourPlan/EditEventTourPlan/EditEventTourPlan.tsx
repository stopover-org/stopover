import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import React from "react";
import { Box, IconButton, Tooltip } from "@mui/joy";
import EditNoteIcon from "@mui/icons-material/Edit";
import { EditEventTourPlan_EventFragment$key } from "artifacts/EditEventTourPlan_EventFragment.graphql";
import EditEventTourPlanModal from "./EditEventTourPlanModal";

interface EditEventTourPlanProps {
  eventFragmentRef: EditEventTourPlan_EventFragment$key;
}

const EditEventTourPlan = ({ eventFragmentRef }: EditEventTourPlanProps) => {
  const event = useFragment<EditEventTourPlan_EventFragment$key>(
    graphql`
      fragment EditEventTourPlan_EventFragment on Event {
        ...EditEventTourPlanModal_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <Tooltip title={t("forms.editEventTourPlan.action")}>
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
      <EditEventTourPlanModal
        eventFragmentRef={event}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(EditEventTourPlan);
