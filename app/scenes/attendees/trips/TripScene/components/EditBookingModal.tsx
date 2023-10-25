import { graphql, useFragment } from "react-relay"
import { useBookingDisabled, useBookingDisabledReason } from "../../../../../lib/hooks/useBookingStates"
import { EditBookingModal_BookingFragment$key } from "../../../../../artifacts/EditBookingModal_BookingFragment.graphql"
import { Box, DialogContent, DialogTitle, Divider, Modal, ModalClose, ModalDialog, Sheet, Stack } from "@mui/joy"
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { useTranslation } from "react-i18next";
import React from "react";
import BookingEditForm from "./BookingEditForm";

interface EditBookingModalProps {
	bookingFragmentRef: EditBookingModal_BookingFragment$key
	opened: boolean
	onClose: () => void
}

const EditBookingModal = ({ opened, onClose, bookingFragmentRef }: EditBookingModalProps) => {
	const booking = useFragment(graphql`
    fragment EditBookingModal_BookingFragment on Booking {
      ...useBookingStates_BookingFragment
      ...useBookingStates_ReasonBookingFragment
      ...BookingEditForm_BookingFragment
    }
  `, bookingFragmentRef)

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
          <BookingEditForm bookingFragmentRef={booking} />
        </DialogContent>
      </ModalDialog>
    </Modal>
  )
}

export default React.memo(EditBookingModal)