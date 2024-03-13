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
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import { ChangeAttendeeOptionAvailabilityModal_AttendeeOptionFragment$key } from "artifacts/ChangeAttendeeOptionAvailabilityModal_AttendeeOptionFragment.graphql";
import Button from "../../v2/Button";
import ChangeAttendeeOptionAvailability from "./ChangeAttendeeOptionAvailability";

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
  const { t } = useTranslation();

  return (
    <>
      <IconButton
        size="sm"
        color={attendeeOption.status === "available" ? "danger" : "success"}
        onClick={() => setModal(true)}
      >
        <Tooltip title={t("forms.changeOptionAvailability.tooltip")}>
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
              &nbsp; {t("forms.changeOptionAvailability.modal.header")}
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Stack>
              {attendeeOption.eventOption.builtIn ? (
                <Box>
                  {attendeeOption.status === "available"
                    ? t(
                        "forms.changeOptionAvailability.modal.toUnavailable.builtInExplanation",
                        { title: attendeeOption.eventOption.title }
                      )
                    : t(
                        "forms.changeOptionAvailability.modal.toAvailable.builtInExplanation",
                        { title: attendeeOption.eventOption.title }
                      )}
                </Box>
              ) : (
                <>
                  <Box>
                    {attendeeOption.status === "available"
                      ? t(
                          "forms.changeOptionAvailability.modal.toUnavailable.commonExplanation",
                          {
                            amount: getCurrencyFormat(
                              attendeeOption.attendeePrice?.cents,
                              attendeeOption.attendeePrice?.currency?.name
                            ),
                          }
                        )
                      : t(
                          "forms.changeOptionAvailability.modal.toAvailable.commonExplanation",
                          {
                            amount: getCurrencyFormat(
                              attendeeOption.attendeePrice?.cents,
                              attendeeOption.attendeePrice?.currency?.name
                            ),
                          }
                        )}
                  </Box>
                  {attendeeOption.status === "available" && (
                    <Box>
                      {t("forms.changeOptionAvailability.modal.explanation")}
                    </Box>
                  )}
                </>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              size="sm"
              color="neutral"
              onClick={() => setModal(false)}
              sx={{ marginRight: "10px" }}
            >
              {t("general.cancel")}
            </Button>
            <ChangeAttendeeOptionAvailability
              optionFragmentRef={attendeeOption}
              onSuccess={() => setModal(false)}
            />
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default React.memo(ChangeAttendeeOptionAvailabilityModal);
