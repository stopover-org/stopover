import { graphql, useFragment } from "react-relay";
import React from "react";
import { Box } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { PublishEvent_EventFragment$key } from "artifacts/PublishEvent_EventFragment.graphql";
import Button from "components/v2/Button";
import { ButtonProps } from "components/v2/Button/Button";
import PublishEventModal from "./PublishEventModal";

interface PublishEventProps extends ButtonProps {
  eventFragmentRef: PublishEvent_EventFragment$key;
}

const PublishEvent = ({ eventFragmentRef, ...props }: PublishEventProps) => {
  const event = useFragment(
    graphql`
      fragment PublishEvent_EventFragment on Event {
        ...PublishEventModal_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <Button size="sm" onClick={() => setModalOpened(true)} {...props}>
          {t("forms.publishEvent.action")}
        </Button>
      </Box>
      <PublishEventModal
        eventFragmentRef={event}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(PublishEvent);
