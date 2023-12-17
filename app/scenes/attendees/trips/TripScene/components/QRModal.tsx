import {
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import QRCode from "react-qr-code";
import React from "react";
import { useTranslation } from "react-i18next";
import { QRModal_FragmentReference$key } from "../../../../../artifacts/QRModal_FragmentReference.graphql";
import Typography from "../../../../../components/v2/Typography";

interface QRModalProps {
  bookingFragmentRef: QRModal_FragmentReference$key;
  opened: boolean;
  onClose: () => void;
}

const QRModal = ({ bookingFragmentRef, opened, onClose }: QRModalProps) => {
  const booking = useFragment(
    graphql`
      fragment QRModal_FragmentReference on Booking {
        id
        event {
          fullAddress
        }
      }
    `,
    bookingFragmentRef
  );
  const { t } = useTranslation();

  return (
    <Modal open={opened} onClose={onClose}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        sx={{ width: { xs: "100%", sm: "100%", md: "250px", lg: "250px" } }}
      >
        <ModalClose />
        <DialogTitle sx={{ marginRight: "30px" }}>
          {t("scenes.attendees.trips.tripScene.showQrCode.title")}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ overflowX: "hidden" }}>
          <QRCode
            value={`${window.location.protocol}${window.location.host}/my-firm/bookings/${booking.id}`}
            style={{ width: "100%" }}
          />
          <Divider />
          <Typography>{booking.event.fullAddress}</Typography>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(QRModal);
