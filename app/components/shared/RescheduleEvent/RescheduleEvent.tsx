import { graphql, useFragment } from "react-relay";
import React from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/joy";
import { RescheduleEvent_EventFragment$key } from "../../../artifacts/RescheduleEvent_EventFragment.graphql";
import Button from "../../v2/Button";
import RescheduleEventModal from "./RescheduleEventModal";

interface PublishEventProps {
  eventFragmentRef: RescheduleEvent_EventFragment$key;
}

const RescheduleEvent = ({ eventFragmentRef }: PublishEventProps) => {
  const event = useFragment(
    graphql`
      fragment RescheduleEvent_EventFragment on Event {
        ...RescheduleEventModal_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <Button size="sm" onClick={() => setModalOpened(true)}>
          {t("forms.rescheduleEvent.action")}
        </Button>
      </Box>
      <RescheduleEventModal
        eventFragmentRef={event}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(RescheduleEvent);
