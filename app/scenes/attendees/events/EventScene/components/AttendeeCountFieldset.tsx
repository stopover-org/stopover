import {
  ButtonGroup,
  FormControl,
  FormLabel,
  IconButton,
  Tooltip,
} from "@mui/joy";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useTranslation } from "react-i18next";
import useFormContext from "lib/hooks/useFormContext";

interface AttendeeCountFieldsetProps {
  booked: boolean;
}

const AttendeeCountFieldset = ({ booked }: AttendeeCountFieldsetProps) => {
  const { useFormField } = useFormContext();
  const attendeesCountField = useFormField("attendeesCount");
  const { t } = useTranslation();
  return (
    <FormControl sx={{ margin: 0 }}>
      <FormLabel>{t("models.attendee.plural")}</FormLabel>
      <ButtonGroup>
        <Tooltip title={t("forms.removeAttendee.action")}>
          <IconButton
            disabled={attendeesCountField.value.length === 1 || booked}
            onClick={() =>
              attendeesCountField.onChange(attendeesCountField.value - 1)
            }
            size="sm"
          >
            <RemoveIcon />
          </IconButton>
        </Tooltip>
        <IconButton size="sm">{attendeesCountField.value}</IconButton>
        <Tooltip title={t("forms.addAttendee.action")}>
          <IconButton
            disabled={booked}
            onClick={() =>
              attendeesCountField.onChange(attendeesCountField.value + 1)
            }
            size="sm"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </FormControl>
  );
};

export default React.memo(AttendeeCountFieldset);
