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
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useTranslation } from "react-i18next";
import Button from "components/v2/Button";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import { ChangeBookingOptionAvailabilityModal_BookingOptionFragment$key } from "artifacts/ChangeBookingOptionAvailabilityModal_BookingOptionFragment.graphql";
import ChangeBookingOptionAvailability from "./ChangeBookingOptionAvailability";

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
  const { t } = useTranslation();

  return (
    <>
      <IconButton
        size="sm"
        color={bookingOption.status === "available" ? "danger" : "success"}
        onClick={() => setModal(true)}
      >
        <Tooltip title={t("forms.changeOptionAvailability.tooltip")}>
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
              &nbsp; {t("forms.changeOptionAvailability.modal.header")}
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Stack>
              {bookingOption.eventOption.builtIn ? (
                <Box>
                  {bookingOption.status === "available"
                    ? t(
                        "forms.changeOptionAvailability.modal.toUnavailable.builtInExplanation",
                        { title: bookingOption.eventOption.title }
                      )
                    : t(
                        "forms.changeOptionAvailability.modal.toAvailable.builtInExplanation",
                        { title: bookingOption.eventOption.title }
                      )}
                </Box>
              ) : (
                <>
                  <Box>
                    {bookingOption.status === "available"
                      ? t(
                          "forms.changeOptionAvailability.modal.toUnavailable.commonExplanation",
                          {
                            amount: getCurrencyFormat(
                              bookingOption.attendeePrice?.cents,
                              bookingOption.attendeePrice?.currency?.name
                            ),
                          }
                        )
                      : t(
                          "forms.changeOptionAvailability.modal.toAvailable.commonExplanation",
                          {
                            amount: getCurrencyFormat(
                              bookingOption.attendeePrice?.cents,
                              bookingOption.attendeePrice?.currency?.name
                            ),
                          }
                        )}
                  </Box>
                  <Box>
                    {t("forms.changeOptionAvailability.modal.explanation")}
                  </Box>
                </>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button size="sm" color="neutral" onClick={() => setModal(false)}>
              {t("general.cancel")}
            </Button>
            <ChangeBookingOptionAvailability
              optionFragmentRef={bookingOption}
              onSuccess={() => setModal(false)}
            />
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default React.memo(ChangeBookingOptionAvailabilityModal);
