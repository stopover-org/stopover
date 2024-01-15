import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import React from "react";
import { Box, IconButton, Tooltip } from "@mui/joy";
import { EditFirmAddress_AddressFragment$key } from "artifacts/EditFirmAddress_AddressFragment.graphql";
import EditNoteIcon from "@mui/icons-material/Edit";
import EditFirmAddressModal from "./EditFirmAddressModal";

interface EditFirmAddressProps {
  addressFragmentRef: EditFirmAddress_AddressFragment$key;
}

const EditFirmAddress = ({ addressFragmentRef }: EditFirmAddressProps) => {
  const address = useFragment(
    graphql`
      fragment EditFirmAddress_AddressFragment on Address {
        ...EditFirmAddressModal_AddressFragment
      }
    `,
    addressFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <Tooltip title={t("forms.editFirmAddress.action")}>
          <IconButton
            size="sm"
            color="primary"
            variant="outlined"
            onClick={() => setModalOpened(true)}
          >
            <EditNoteIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <EditFirmAddressModal
        addressFragmentRef={address}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(EditFirmAddress);
