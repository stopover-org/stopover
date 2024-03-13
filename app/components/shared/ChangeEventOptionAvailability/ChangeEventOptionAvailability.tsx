import { graphql, useFragment } from "react-relay";
import React from "react";
import { Box, IconButton, Tooltip } from "@mui/joy";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useTranslation } from "react-i18next";
import { ChangeEventOptionAvailability_EventOptionFragment$key } from "artifacts/ChangeEventOptionAvailability_EventOptionFragment.graphql";
import ChangeEventOptionAvailabilityModal from "./ChangeEventOptionAvailabilityModal";

interface RegisterAttendeeProps {
  optionFragmentRef: ChangeEventOptionAvailability_EventOptionFragment$key;
}

const ChangeEventOptionAvailability = ({
  optionFragmentRef,
}: RegisterAttendeeProps) => {
  const eventOption =
    useFragment<ChangeEventOptionAvailability_EventOptionFragment$key>(
      graphql`
        fragment ChangeEventOptionAvailability_EventOptionFragment on EventOption {
          ...ChangeEventOptionAvailabilityModal_EventOptionFragment
        }
      `,
      optionFragmentRef
    );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <IconButton
          size="sm"
          color="danger"
          onClick={() => setModalOpened(true)}
        >
          <Tooltip title={t("forms.changeOptionAvailability.tooltip")}>
            <DoNotDisturbIcon />
          </Tooltip>
        </IconButton>
      </Box>
      <ChangeEventOptionAvailabilityModal
        eventOptionFragmentRef={eventOption}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(ChangeEventOptionAvailability);
