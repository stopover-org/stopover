import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import React from "react";
import { Box, IconButton, Tooltip } from "@mui/joy";

import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import { CreateNotification_BookingFragment$key } from "artifacts/CreateNotification_BookingFragment.graphql";
import CreateNotificationModal from "./CreateNotificationModal";

interface CreateNotificationProps {
  bookingFragmentRef: CreateNotification_BookingFragment$key;
}

const CreateNotification = ({
  bookingFragmentRef,
}: CreateNotificationProps) => {
  const booking = useFragment(
    graphql`
      fragment CreateNotification_BookingFragment on Booking {
        ...CreateNotificationModal_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <Tooltip title={t("forms.createNotification.action")}>
          <IconButton
            size="sm"
            onClick={() => setModalOpened(true)}
            variant="solid"
            color="primary"
          >
            <NotificationAddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <CreateNotificationModal
        open={modalOpened}
        onClose={() => setModalOpened(false)}
        bookingFragmentRef={booking}
      />
    </>
  );
};

export default React.memo(CreateNotification);
