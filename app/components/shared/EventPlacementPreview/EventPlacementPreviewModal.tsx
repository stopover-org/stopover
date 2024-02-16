import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import {
  Box,
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import React from "react";
import { EventPlacementPreviewModal_EventPlacementFragment$key } from "artifacts/EventPlacementPreviewModal_EventPlacementFragment.graphql";

interface CreateEventPlacementModalProps {
  eventPlacementFragmentRef: EventPlacementPreviewModal_EventPlacementFragment$key;
  open: boolean;
  onClose: () => void;
}

const CreateEventPlacementModal = ({
  eventPlacementFragmentRef,
  open,
  onClose,
}: CreateEventPlacementModalProps) => {
  const eventPlacement =
    useFragment<EventPlacementPreviewModal_EventPlacementFragment$key>(
      graphql`
        fragment EventPlacementPreviewModal_EventPlacementFragment on EventPlacement {
          places {
            available
            coordinates
          }
        }
      `,
      eventPlacementFragmentRef
    );
  const { t } = useTranslation();
  const schema = React.useMemo(
    () =>
      eventPlacement.places.reduce((acc: boolean[][], place) => {
        const { coordinates, available } = place;
        if (!acc[coordinates[0]]) {
          acc[coordinates[0]] = [];
        }
        acc[coordinates[0]][coordinates[1]] = available;

        return acc;
      }, []),
    [eventPlacement]
  );

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        sx={{
          overflow: "scroll",
        }}
      >
        <ModalClose />
        <DialogTitle sx={{ marginRight: "30px", marginLeft: "30px" }}>
          <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
            {t(
              "scenes.firms.events.eventScene.placementsInformation.placesPreview"
            )}
          </Stack>
        </DialogTitle>
        <Divider />
        <Box
          sx={{
            minWidth: `${schema[0].length * 60}px`,
            minHeight: `${schema.length + 60}px`,
            margin: "auto",
          }}
        >
          {schema.map((row, rowIndex) => (
            <Stack direction="row">
              {row.map((place, columnIndex) => (
                <Box
                  sx={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: `var(--joy-palette-primary-${
                      place ? 500 : 100
                    }, #D3232F)`,
                    margin: "10px",
                    borderRadius: "5px",
                    textAlign: "center",
                    lineHeight: "50px",
                    color: "white",
                  }}
                >
                  {rowIndex}
                  {columnIndex}
                </Box>
              ))}
            </Stack>
          ))}
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(CreateEventPlacementModal);
