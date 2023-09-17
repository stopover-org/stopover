import { Box, Divider, Modal, ModalDialog, Stack } from "@mui/joy";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { graphql, useFragment } from "react-relay";
import RefundBookingForm from "./RefundBookingForm";
import Button from "../../../../../components/v2/Button";
import { RefundBookingModal_BookingFragment$key } from "../../../../../artifacts/RefundBookingModal_BookingFragment.graphql";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Typography from "../../../../../components/v2/Typography";

interface RefundBookingModalProps {
  open: boolean;
  onClose: () => void;
  bookingFragmentRef: RefundBookingModal_BookingFragment$key;
}

const RefundBookingModal = ({
  open,
  onClose,
  bookingFragmentRef,
}: RefundBookingModalProps) => {
  const booking = useFragment(
    graphql`
      fragment RefundBookingModal_BookingFragment on Booking {
        cancellationTerms
        possiblePenaltyAmount {
          cents
          currency {
            name
          }
        }
        possibleRefundAmount {
          cents
          currency {
            name
          }
        }
        ...RefundBookingForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <Stack flexDirection="row" alignItems="center">
            <WarningRoundedIcon />
            &nbsp; Booking refund
          </Stack>
        </DialogTitle>
        <Divider />
        {booking && (
          <>
            <DialogContent>
              <Stack>
                <Box>
                  <Typography level="h5">
                    {booking.cancellationTerms}
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  Refund Amount:{" "}
                  {getCurrencyFormat(
                    booking.possibleRefundAmount?.cents,
                    booking.possibleRefundAmount?.currency?.name
                  )}
                </Box>
                <Box>
                  Penalty:{" "}
                  {getCurrencyFormat(
                    booking.possiblePenaltyAmount?.cents,
                    booking.possiblePenaltyAmount?.currency?.name
                  )}
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <RefundBookingForm
                bookingFragmentRef={booking}
                onSuccess={onClose}
              />
              <Button variant="plain" color="neutral" onClick={() => onClose()}>
                Cancel
              </Button>
            </DialogActions>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(RefundBookingModal);
