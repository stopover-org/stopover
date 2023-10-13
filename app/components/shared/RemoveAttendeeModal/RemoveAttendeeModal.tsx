import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Modal,
  ModalDialog,
  Stack,
  Tooltip,
} from "@mui/joy";
import React from "react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { graphql, useFragment } from "react-relay";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <>
      <IconButton size="sm" color="danger" onClick={() => setModal(true)}>
        <Tooltip title={t("forms.removeAttendee.tooltip")}>
          <DeleteIcon />
        </Tooltip>
      </IconButton>
      <Modal open={modal} onClose={() => setModal(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <Stack flexDirection="row" alignItems="center">
              <WarningRoundedIcon />
              &nbsp; {t("forms.removeAttendee.modal.header")}
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Stack>
              <Box>
                {t("forms.removeAttendee.modal.priceExplanation", {
                  amount: getCurrencyFormat(
                    attendee.booking.event.attendeePricePerUom?.cents,
                    attendee.booking.event.attendeePricePerUom?.currency?.name
                  ),
                })}
              </Box>
              <Box>
                {t("forms.removeAttendee.modal.attendeeRefundExplanation")}
              </Box>
              <Divider sx={{ margin: 1 }} />
              <Box>
                {t("forms.removeAttendee.modal.optionsRefundExplanation")}
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <RemoveAttendee
              attendeeFragmentRef={attendee}
              onSuccess={() => setModal(false)}
            />
            <Button size="sm" color="neutral" onClick={() => setModal(false)}>
              {t("general.cancel")}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default React.memo(AddAttendeeModal);
