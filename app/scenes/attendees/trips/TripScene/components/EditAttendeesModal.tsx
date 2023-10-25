import { Box, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalClose, ModalDialog, Sheet, Stack } from "@mui/joy"
import React from "react"
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { graphql, useFragment } from "react-relay"
import { EditAttendeesModal_BookingFragment$key } from "../../../../../artifacts/EditAttendeesModal_BookingFragment.graphql";
import { useTranslation } from "react-i18next";
import Button from "../../../../../components/v2/Button";
import AttendeeEditForm from "./AttendeeEditForm";
import moment from "moment";
import { useBookingDisabled, useBookingDisabledReason } from "../../../../../lib/hooks/useBookingStates";

interface EditAttendeesModalProps {
	bookingFragmentRef: EditAttendeesModal_BookingFragment$key
	opened: boolean
	onClose: () => void
}

const EditAttendeesModal = ({ opened, onClose, bookingFragmentRef }: EditAttendeesModalProps) => {
	const booking = useFragment(graphql`
		fragment EditAttendeesModal_BookingFragment on Booking {
			...useBookingStates_BookingFragment
      ...useBookingStates_ReasonBookingFragment
      attendees(filters: { status: [registered, not_registered] }) {
        ...AttendeeEditForm_AttendeeFragment
			}
      ...AddAttendee_BookingFragment
		}
	`,
	bookingFragmentRef)

  const disabled = useBookingDisabled(booking)
  const reason = useBookingDisabledReason(booking)

	const { t } = useTranslation()

	return (
    <Modal open={opened} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog" sx={{ width: { xs: '100%', sm: '100%', md: 'unset', lg: 'unset' } }}>
        <ModalClose />
        <DialogTitle sx={{marginRight: '30px'}}>
          <Stack flexDirection="row" alignItems="center" spacing={2} useFlexGap>
            <WarningRoundedIcon />
            {t("forms.changeOptionAvailability.modal.header")}
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {disabled && (
            <>
              <Sheet color='warning' variant='soft'>
                <Box p={2}>
                  {reason}
                  <br />
                  Для внесения изменений свяжитесь со службой поддержки
                </Box>
              </Sheet>
            </>
          )}
          {booking.attendees.map((attendee, index) => (
            <AttendeeEditForm index={index} attendeeFragmentRef={attendee} disabled={disabled} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            size="sm"
            color="neutral"
            onClick={onClose}
            sx={{ marginRight: "10px" }}
          >
            {t("general.cancel")}
          </Button>
        </DialogActions>
      </ModalDialog>
  	</Modal>
  )
}

export default React.memo(EditAttendeesModal)