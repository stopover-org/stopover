import {
  Box,
  Divider,
  IconButton,
  Modal,
  ModalDialog,
  Stack,
  Tooltip,
} from "@mui/joy";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { graphql, useFragment } from "react-relay";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveAttendee from "./RemoveAttendee";
import { RemoveAttendeeModal_BookingFragment$key } from "../../../artifacts/RemoveAttendeeModal_BookingFragment.graphql";
import Button from "../../v2/Button";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";

interface RemoveAttendeeModalProps {
  attendeeFragmentRef: RemoveAttendeeModal_BookingFragment$key;
}

const AddAttendeeModal = ({
  attendeeFragmentRef,
}: RemoveAttendeeModalProps) => {
  const attendee = useFragment<RemoveAttendeeModal_BookingFragment$key>(
    graphql`
      fragment RemoveAttendeeModal_BookingFragment on Attendee {
        booking {
          event {
            attendeePricePerUom {
              cents
              currency {
                name
              }
            }
          }
        }
        ...RemoveAttendee_AttendeeFragment
      }
    `,
    attendeeFragmentRef
  );
  const [modal, setModal] = React.useState(false);

  return (
    <>
      <IconButton size="sm" color="danger" onClick={() => setModal(true)}>
        <Tooltip title="Remove this attendee and refund it">
          <DeleteIcon />
        </Tooltip>
      </IconButton>
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
                The price for the booking will be decreased to{" "}
                {getCurrencyFormat(
                  attendee.booking.event.attendeePricePerUom?.cents,
                  attendee.booking.event.attendeePricePerUom?.currency?.name
                )}
                .
              </Box>
              <Box>If it was paid, then this attendee will be refunded</Box>
              <Divider />
              <Box>
                All attendee options that was added or paid will be removed and
                refunded.
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <RemoveAttendee
              attendeeFragmentRef={attendee}
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
