import { graphql, useFragment } from "react-relay";
import React from "react";
import { Box } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { SyncStripe_EventFragment$key } from "../../../artifacts/SyncStripe_EventFragment.graphql";
import Button from "../../v2/Button";
import SyncStripeModal from "./SyncStripeModal";

interface SyncStripeProps {
  eventFragmentRef: SyncStripe_EventFragment$key;
}

const SyncStripe = ({ eventFragmentRef }: SyncStripeProps) => {
  const event = useFragment(
    graphql`
      fragment SyncStripe_EventFragment on Event {
        ...SyncStripeModal_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <Button size="sm" color="neutral" onClick={() => setModalOpened(true)}>
          {t("forms.syncStripe.action")}
        </Button>
      </Box>
      <SyncStripeModal
        eventFragmentRef={event}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(SyncStripe);
