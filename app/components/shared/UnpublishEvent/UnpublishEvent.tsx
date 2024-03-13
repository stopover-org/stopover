import { graphql, useFragment } from "react-relay";
import React from "react";
import { Box } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { UnpublishEvent_EventFragment$key } from "artifacts/UnpublishEvent_EventFragment.graphql";
import Button from "components/v2/Button";
import { ButtonProps } from "components/v2/Button/Button";
import UnpublishEventModal from "./UnpublishEventModal";

interface PublishEventProps extends ButtonProps {
  eventFragmentRef: UnpublishEvent_EventFragment$key;
}

const UnpublishEvent = ({ eventFragmentRef, ...props }: PublishEventProps) => {
  const event = useFragment(
    graphql`
      fragment UnpublishEvent_EventFragment on Event {
        ...UnpublishEventModal_EventFragment
      }
    `,
    eventFragmentRef
  );
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <>
      <Box>
        <Button size="sm" onClick={() => setModalOpened(true)} {...props}>
          {t("forms.unpublishEvent.action")}
        </Button>
      </Box>
      <UnpublishEventModal
        eventFragmentRef={event}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(UnpublishEvent);
