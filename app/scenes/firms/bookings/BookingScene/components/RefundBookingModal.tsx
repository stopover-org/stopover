import { Box, Divider, Modal, ModalDialog, Stack, DialogActions, DialogContent, DialogTitle } from "@mui/joy";
import React from "react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { graphql, useFragment } from "react-relay";
import RefundBookingForm from "../../../../../components/shared/RefundBooking/RefundBookingForm";
import Button from "../../../../../components/v2/Button";
import { RefundBookingModal_BookingFragment$key } from "../../../../../artifacts/RefundBookingModal_BookingFragment.graphql";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Typography from "../../../../../components/v2/Typography";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation()

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <Stack flexDirection="row" alignItems="center">
            <WarningRoundedIcon />
            &nbsp; {t('forms.refundBooking.modal.header')}
          </Stack>
        </DialogTitle>
        <Divider />
        {booking && (
          <>
            <DialogContent>
              <Stack>
                <Box>
                  <Typography level="title-lg">
                    {booking.cancellationTerms}
                  </Typography>
                </Box>
                <Divider sx={{margin: 1}} />
                <Box>
                  {t('forms.refundBooking.modal.refundExplanation', { amount: getCurrencyFormat(
                    booking.possibleRefundAmount?.cents,
                    booking.possibleRefundAmount?.currency?.name
                  )})}
                </Box>
                <Box>
                  {t('forms.refundBooking.modal.penaltyExplanation', { amount: getCurrencyFormat(
                    booking.possiblePenaltyAmount?.cents,
                    booking.possiblePenaltyAmount?.currency?.name
                  )})}
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <RefundBookingForm
                bookingFragmentRef={booking}
                onSuccess={onClose}
              />
              <Button variant="plain" color="neutral" onClick={() => onClose()}>
                {t('general.cancel')}
              </Button>
            </DialogActions>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(RefundBookingModal);
