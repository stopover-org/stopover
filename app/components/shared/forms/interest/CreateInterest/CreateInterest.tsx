import { useTranslation } from "react-i18next";
import React from "react";
import { Box } from "@mui/joy";
import Button from "components/v2/Button";
import CreateInterestModal from "./CreateInterestModal";

const CreateInterest = () => {
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <Button size="sm" color="primary" onClick={() => setModalOpened(true)}>
          {t("forms.createInterest.action")}
        </Button>
      </Box>
      <CreateInterestModal
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(CreateInterest);
