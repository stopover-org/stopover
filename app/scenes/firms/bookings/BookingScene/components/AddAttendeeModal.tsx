import { Box, Divider, Modal, ModalDialog, Stack } from "@mui/joy";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { graphql, useFragment } from "react-relay";
import Button from "../../../../../components/v2/Button";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import AddAttendee from "../../../../../components/shared/AddAttendee";
import { AddAttendeeModal_BookingFragment$key } from "../../../../../artifacts/AddAttendeeModal_BookingFragment.graphql";

interface AddAttendeeModalProps {
  bookingFragmentRef: AddAttendeeModal_BookingFragment$key;
}

const AddAttendeeModal = ({ bookingFragmentRef }: AddAttendeeModalProps) => {
  const booking = useFragment<AddAttendeeModal_BookingFragment$key>(
    graphql`
      fragment AddAttendeeModal_BookingFragment on Booking {
        event {
          attendeePricePerUom {
            cents
            currency {
              name
            }
          }
        }
        ...AddAttendee_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const [modal, setModal] = React.useState(false);

  return (
    <>
      <Button size="sm" color="neutral" onClick={() => setModal(true)}>
        Add Attendee
      </Button>
      <Modal open={modal} onClose={() => setModal(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <Stack flexDirection="row" alignItems="center">
              <WarningRoundedIcon />
              &nbsp; Booking changes confirmation
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Stack>
              <Box>
                The price for the booking will be increased to{" "}
                {getCurrencyFormat(
                  booking.event.attendeePricePerUom?.cents,
                  booking.event.attendeePricePerUom?.currency?.name
                )}
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <AddAttendee
              bookingFragmentRef={booking}
              onSuccess={() => setModal(false)}
            />
            <Button size="sm" color="neutral" onClick={() => setModal(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default React.memo(AddAttendeeModal);