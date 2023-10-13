import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/v2/Button";
import { useRemoveFirm } from "../useRemoveFirm";
import SubmitButton from "../../../../components/shared/SubmitButton";
import RemoveFirmModal from "./RemoveFirmModal";

const RemoveFirm = () => {
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <Button
        onClick={() => setModalOpened(true)}
        color="danger"
        variant="plain"
      >
        {t("forms.removeFirm.action")}
      </Button>
      <RemoveFirmModal
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};
export default React.memo(RemoveFirm);
