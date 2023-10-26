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
        id
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
            {t("scenes.attendees.trips.tripScene.editAttendeeModal.title")}
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ overflow: 'hidden' }}>
          {disabled && (
            <>
              <Sheet color='warning' variant='soft'>
                <Box p={2}>
                  {reason}
                  <br />
                  {t("scenes.attendees.trips.tripScene.editAttendeeModal.callSupport")}
                </Box>
              </Sheet>
            </>
          )}
          {booking.attendees.map((attendee, index) => (
            <AttendeeEditForm key={attendee.id} index={index} attendeeFragmentRef={attendee} disabled={disabled} />
          ))}
        </DialogContent>
      </ModalDialog>
  	</Modal>
  )
}

export default React.memo(EditAttendeesModal)