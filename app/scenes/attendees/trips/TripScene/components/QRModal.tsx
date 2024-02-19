"use client";

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
import { QRModal_FragmentReference$key } from "artifacts/QRModal_FragmentReference.graphql";
import Typography from "components/v2/Typography";
import GoogleMap from "components/shared/GoogleMap/GoogleMap";

interface QRModalProps {
  bookingFragmentRef: QRModal_FragmentReference$key;
  opened: boolean;
  onClose: () => void;
}

const QRModal = ({ bookingFragmentRef, opened, onClose }: QRModalProps) => {
  const booking = useFragment<QRModal_FragmentReference$key>(
    graphql`
      fragment QRModal_FragmentReference on Booking {
        id
        event {
          id
          address {
            fullAddress
            country
            city
            street
            houseNumber
            latitude
            longitude
          }
        }
      }
    `,
    bookingFragmentRef
  );
  const { t } = useTranslation();
  const QRUrl = React.useMemo(() => {
    if (typeof window === typeof undefined) {
      return "";
    }

    return `${window.location.protocol}${window.location.host}/events/${booking.event.id}`;
  }, []);

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
        <Divider sx={{ margin: 1 }} />
        <DialogContent sx={{ overflowX: "hidden" }}>
          <QRCode value={QRUrl} style={{ width: "100%" }} />
          <Divider sx={{ margin: 1 }} />
          {booking.event.address && (
            <>
              <Typography>{booking.event.address?.fullAddress}</Typography>
              <Typography>{booking.event.address?.country}</Typography>
              <Typography>{booking.event.address?.city}</Typography>
              <Typography>{booking.event.address?.street}</Typography>
              <Typography>{booking.event.address?.houseNumber}</Typography>
              {booking.event.address?.latitude &&
                booking.event.address?.longitude && (
                  <>
                    <Divider sx={{ margin: 1 }} />
                    <GoogleMap
                      center={{
                        lat: booking.event.address?.latitude!,
                        lng: booking.event.address?.longitude!,
                      }}
                      markers={[
                        {
                          lat: booking.event.address?.latitude!,
                          lng: booking.event.address?.longitude!,
                        },
                      ]}
                    />
                  </>
                )}
            </>
          )}
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(QRModal);
