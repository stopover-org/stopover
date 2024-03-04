import { useTranslation } from "react-i18next";
import React from "react";
import { Box, IconButton, Tooltip } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { EditInterest_InterestFragment$key } from "artifacts/EditInterest_InterestFragment.graphql";
import EditIcon from "@mui/icons-material/Edit";
import EditInterestModal from "./EditInterestModal";

interface EditInterestProps {
  interestFragmentRef: EditInterest_InterestFragment$key;
}

const EditInterest = ({ interestFragmentRef }: EditInterestProps) => {
  const interest = useFragment(
    graphql`
      fragment EditInterest_InterestFragment on Interest {
        ...EditInterestModal_InterestFragment
      }
    `,
    interestFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <Tooltip title={t("general.edit")}>
          <IconButton
            size="sm"
            color="primary"
            onClick={() => setModalOpened(true)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <EditInterestModal
        interestFragmentRef={interest}
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(EditInterest);
