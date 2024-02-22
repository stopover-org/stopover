import React from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/joy";
import Button, { ButtonProps } from "components/v2/Button/Button";
import InviteUserModal from "./InviteUserModal";

interface VerifyEventProps extends ButtonProps {}

const InviteUser = ({ ...props }: VerifyEventProps) => {
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <Button size="sm" onClick={() => setModalOpened(true)} {...props}>
          {t("forms.inviteUser.action")}
        </Button>
      </Box>
      <InviteUserModal
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(InviteUser);
