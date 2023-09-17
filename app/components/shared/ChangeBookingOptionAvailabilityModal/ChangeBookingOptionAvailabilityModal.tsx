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
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import Button from "../../v2/Button";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";
import ChangeBookingOptionAvailability from "./ChangeBookingOptionAvailability";
import { ChangeBookingOptionAvailabilityModal_BookingOptionFragment$key } from "../../../artifacts/ChangeBookingOptionAvailabilityModal_BookingOptionFragment.graphql";

interface ChangeBookingOptionAvailabilityModalProps {
  optionFragmentRef: ChangeBookingOptionAvailabilityModal_BookingOptionFragment$key;
}

const ChangeBookingOptionAvailabilityModal = ({
  optionFragmentRef,
}: ChangeBookingOptionAvailabilityModalProps) => {
  const bookingOption =
    useFragment<ChangeBookingOptionAvailabilityModal_BookingOptionFragment$key>(
      graphql`
        fragment ChangeBookingOptionAvailabilityModal_BookingOptionFragment on BookingOption {
          eventOption {
            builtIn
            title
          }
          status
          attendeePrice {
            cents
            currency {
              name
            }
          }
          ...ChangeBookingOptionAvailability_BookingOptionFragment
        }
      `,
      optionFragmentRef
    );
  const [modal, setModal] = React.useState(false);

  return (
    <>
      <IconButton
        size="sm"
        color={bookingOption.status === "available" ? "danger" : "success"}
        onClick={() => setModal(true)}
      >
        <Tooltip title="Change Availability">
          {bookingOption.status === "available" ? (
            <DoNotDisturbIcon />
          ) : (
            <PlaylistAddIcon />
          )}
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
              {bookingOption.eventOption.builtIn ? (
                <Box>
                  {bookingOption.eventOption.title} will be{" "}
                  {bookingOption.status === "available"
                    ? "remove from"
                    : "added to"}{" "}
                  this booking
                </Box>
              ) : (
                <>
                  <Box>
                    The price for the booking will be{" "}
                    {bookingOption.status === "available"
                      ? "decreased for"
                      : "increased to"}{" "}
                    {getCurrencyFormat(
                      bookingOption.attendeePrice?.cents,
                      bookingOption.attendeePrice?.currency?.name
                    )}
                  </Box>
                  <Box>If it was paid, then this option will be refunded</Box>
                </>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <ChangeBookingOptionAvailability
              optionFragmentRef={bookingOption}
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

export default React.memo(ChangeBookingOptionAvailabilityModal);
