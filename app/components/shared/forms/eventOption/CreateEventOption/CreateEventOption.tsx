import { useTranslation } from "react-i18next";
import React from "react";
import { Box } from "@mui/joy";
import Button from "components/v2/Button";
import { graphql, useFragment } from "react-relay";
import { CreateEventOption_EventFragment$key } from "artifacts/CreateEventOption_EventFragment.graphql";
import CreateEventOptionModal from "./CreateEventOptionModal";

interface CreateEventOptionProps {
  eventFragmentRef: CreateEventOption_EventFragment$key;
}

const CreateEventOption = ({ eventFragmentRef }: CreateEventOptionProps) => {
  const event = useFragment(
    graphql`
      fragment CreateEventOption_EventFragment on Event {
        ...CreateEventOptionModal_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <Button size="sm" color="primary" onClick={() => setModalOpened(true)}>
          {t("forms.createEventOption.action")}
        </Button>
      </Box>
      <CreateEventOptionModal
        eventFragmentRef={event}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(CreateEventOption);
