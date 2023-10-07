import React from "react";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/joy";
import { VerifyEventInformation_EventFragment$key } from "../../../artifacts/VerifyEventInformation_EventFragment.graphql";
import Button from "../../v2/Button";
import VerifyEventModal from "./VerifyEventModal";
import { ButtonProps } from "../../v2/Button/Button";

interface VerifyEventProps extends ButtonProps {
  eventFragmentRef: VerifyEventInformation_EventFragment$key;
}

const VerifyEvent = ({ eventFragmentRef, ...props }: VerifyEventProps) => {
  const event = useFragment(
    graphql`
      fragment VerifyEventInformation_EventFragment on Event {
        ...VerifyEventModal_EventFragment
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
          {t("forms.verifyEvent.action")}
        </Button>
      </Box>
      <VerifyEventModal
        eventFragmentRef={event}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(VerifyEvent);
