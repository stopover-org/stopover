import { graphql, useFragment } from "react-relay";
import React from "react";
import { Box } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { RemoveEvent_EventFragment$key } from "artifacts/RemoveEvent_EventFragment.graphql";
import Button from "components/v2/Button";
import { ButtonProps } from "components/v2/Button/Button";
import RemoveEventModal from "./RemoveEventModal";

interface PublishEventProps extends ButtonProps {
  eventFragmentRef: RemoveEvent_EventFragment$key;
}

const RemoveEvent = ({ eventFragmentRef, ...props }: PublishEventProps) => {
  const event = useFragment(
    graphql`
      fragment RemoveEvent_EventFragment on Event {
        ...RemoveEventModal_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <Button
          size="sm"
          color="danger"
          onClick={() => setModalOpened(true)}
          {...props}
        >
          {t("forms.removeEvent.action")}
        </Button>
      </Box>
      <RemoveEventModal
        eventFragmentRef={event}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(RemoveEvent);
