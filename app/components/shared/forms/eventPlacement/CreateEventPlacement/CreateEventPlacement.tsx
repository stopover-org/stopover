import { CreateEventPlacement_EventFragment$key } from "artifacts/CreateEventPlacement_EventFragment.graphql";
import { graphql, useFragment } from "react-relay";
import React from "react";
import { Box } from "@mui/joy";
import { useTranslation } from "react-i18next";
import CreateEventPlacementModal from "./CreateEventPlacementModal";
import Button from "../../../../v2/Button/Button";

interface CreateEventPlacementProps {
  eventFragmentRef: CreateEventPlacement_EventFragment$key;
}

const CreateEventPlacement = ({
  eventFragmentRef,
}: CreateEventPlacementProps) => {
  const event = useFragment<CreateEventPlacement_EventFragment$key>(
    graphql`
      fragment CreateEventPlacement_EventFragment on Event {
        ...CreateEventPlacementModal_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);

  return (
    <>
      <Box sx={{ marginBottom: "10px" }}>
        <Button
          size="sm"
          color="primary"
          variant="outlined"
          onClick={() => setModalOpened(true)}
        >
          {t("forms.createEventPlacement.action")}
        </Button>
      </Box>
      <CreateEventPlacementModal
        eventFragmentRef={event}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(CreateEventPlacement);
