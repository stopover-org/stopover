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
import ChangeAttendeeOptionAvailability from "./ChangeAttendeeOptionAvailability";
import { ChangeAttendeeOptionAvailabilityModal_AttendeeOptionFragment$key } from "../../../artifacts/ChangeAttendeeOptionAvailabilityModal_AttendeeOptionFragment.graphql";

interface ChangeAttendeeOptionAvailabilityModalProps {
  optionFragmentRef: ChangeAttendeeOptionAvailabilityModal_AttendeeOptionFragment$key;
}

const ChangeAttendeeOptionAvailabilityModal = ({
  optionFragmentRef,
}: ChangeAttendeeOptionAvailabilityModalProps) => {
  const attendeeOption =
    useFragment<ChangeAttendeeOptionAvailabilityModal_AttendeeOptionFragment$key>(
      graphql`
        fragment ChangeAttendeeOptionAvailabilityModal_AttendeeOptionFragment on AttendeeOption {
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
          ...ChangeAttendeeOptionAvailability_AttendeeOptionFragment
        }
      `,
      optionFragmentRef
    );
  const [modal, setModal] = React.useState(false);

  return (
    <>
      <IconButton
        size="sm"
        color={attendeeOption.status === "available" ? "danger" : "success"}
        onClick={() => setModal(true)}
      >
        <Tooltip title="Change Availability">
          {attendeeOption.status === "available" ? (
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
              {attendeeOption.eventOption.builtIn ? (
                <Box>
                  {attendeeOption.eventOption.title} will be{" "}
                  {attendeeOption.status === "available"
                    ? "remove from"
                    : "added to"}{" "}
                  this booking
                </Box>
              ) : (
                <>
                  <Box>
                    The price for the booking will be{" "}
                    {attendeeOption.status === "available"
                      ? "decreased for"
                      : "increased to"}{" "}
                    {getCurrencyFormat(
                      attendeeOption.attendeePrice?.cents,
                      attendeeOption.attendeePrice?.currency?.name
                    )}
                  </Box>
                  <Box>If it was paid, then this option will be refunded</Box>
                </>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <ChangeAttendeeOptionAvailability
              optionFragmentRef={attendeeOption}
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

export default React.memo(ChangeAttendeeOptionAvailabilityModal);
