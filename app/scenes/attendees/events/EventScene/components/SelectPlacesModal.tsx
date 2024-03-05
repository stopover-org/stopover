import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import useFormContext from "lib/hooks/useFormContext";
import { Box, DialogTitle, Divider, Modal, ModalDialog, Stack } from "@mui/joy";
import React from "react";
import { SelectPlacesModal_EventPlacementFragment$key } from "artifacts/SelectPlacesModal_EventPlacementFragment.graphql";
import { SelectPlacesModal_ScheduleFragment$key } from "artifacts/SelectPlacesModal_ScheduleFragment.graphql";
import SubmitButton from "components/shared/SubmitButton/SubmitButton";
import Input from "../../../../../components/v2/Input/Input";

interface SelectPlacesModalProps {
  eventPlacementFragmentRef: SelectPlacesModal_EventPlacementFragment$key;
  scheduleFragmentRef: SelectPlacesModal_ScheduleFragment$key;
  readonly: boolean;
  open: boolean;
  onClose: () => void;
}

const SelectPlacesModal = ({
  eventPlacementFragmentRef,
  scheduleFragmentRef,
  readonly,
  open,
  onClose,
}: SelectPlacesModalProps) => {
  const { useFormField, ...form } = useFormContext();
  const eventPlacement =
    useFragment<SelectPlacesModal_EventPlacementFragment$key>(
      graphql`
        fragment SelectPlacesModal_EventPlacementFragment on EventPlacement {
          places {
            available
            coordinates
          }
        }
      `,
      eventPlacementFragmentRef
    );

  const schedule = useFragment<SelectPlacesModal_ScheduleFragment$key>(
    graphql`
      fragment SelectPlacesModal_ScheduleFragment on Schedule {
        availablePlacesPlacement {
          coordinates
        }
      }
    `,
    scheduleFragmentRef
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
  const selectedPlacesField = useFormField("places");
  const selectedPlaces: number[][] = selectedPlacesField.value;
  const attendeesCountField = useFormField("attendeesCount");
  const findPlace = React.useCallback(
    (
      placeCoordinates: number[] | readonly number[],
      rowIndex: number,
      columnIndex: number
    ) =>
      placeCoordinates[0] === rowIndex && placeCoordinates[1] === columnIndex,
    [eventPlacement, schedule]
  );

  const availablePlaces = React.useMemo(
    () =>
      schedule.availablePlacesPlacement?.map(
        ({ coordinates }) => coordinates
      ) || [],
    [schedule]
  );

  const setSelectedPlaces = React.useCallback(
    (rowIndex: number, columnIndex: number) => {
      let places = [];
      if (
        !selectedPlaces.find((placeCoord) =>
          findPlace(placeCoord, rowIndex, columnIndex)
        )
      ) {
        places = [...selectedPlaces, [rowIndex, columnIndex]];
      } else {
        places = selectedPlaces.filter(
          (placeCoord) => !findPlace(placeCoord, rowIndex, columnIndex)
        );
      }
      selectedPlacesField.onChange(places);

      attendeesCountField.onChange(places.length);
    },
    [selectedPlaces]
  );

  return (
    <Modal open={open} onClose={onClose} disablePortal>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        sx={{
          overflow: "scroll",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            left: 0,
          }}
        >
          <DialogTitle
            sx={{
              marginRight: "30px",
              marginLeft: "30px",
            }}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              useFlexGap
              spacing={1}
            >
              {t("scenes.attendees.events.eventScene.selectPlaces")}
            </Stack>
          </DialogTitle>
          <Divider />
        </Box>
        <Box
          sx={{
            minWidth: `${schema[0].length * 60}px`,
            minHeight: `${schema.length + 60}px`,
            margin: "auto",
            position: "relative",
          }}
        >
          {schema.map((row, rowIndex) => (
            <Stack direction="row">
              {row.map((place, columnIndex) => (
                <Box
                  onClick={() => setSelectedPlaces(rowIndex, columnIndex)}
                  sx={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: place
                      ? `var(--joy-palette-primary-${
                          selectedPlaces.find((placeCoord) =>
                            findPlace(placeCoord, rowIndex, columnIndex)
                          ) ||
                          !availablePlaces.find((placeCoord) =>
                            findPlace(placeCoord, rowIndex, columnIndex)
                          )
                            ? 300
                            : 500
                        }, #D3232F)`
                      : "transparent",
                    margin: "10px",
                    borderRadius: "5px",
                    textAlign: "center",
                    lineHeight: "50px",
                    color: "white",
                    "&:hover": {
                      cursor: place ? "pointer" : "disabled",
                    },
                  }}
                >
                  {rowIndex}
                  {columnIndex}
                </Box>
              ))}
            </Stack>
          ))}
        </Box>
        <Box sx={{ position: "sticky", left: 0 }}>
          <Input
            label={t("models.attendee.attributes.email")}
            {...useFormField("email")}
          />
        </Box>
        <Box sx={{ position: "sticky", left: 0 }}>
          <Input
            label={t("models.attendee.attributes.phone")}
            {...useFormField("phone")}
          />
        </Box>
        {!readonly && (
          <Box sx={{ position: "sticky", left: 0 }}>
            <SubmitButton
              submitting={form.formState.isSubmitting}
              disabled={selectedPlaces.length === 0}
              onClick={() => {}}
              sx={{ width: "100%" }}
            >
              {t("scenes.attendees.events.eventScene.bookEvent")}
            </SubmitButton>
          </Box>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(SelectPlacesModal);
