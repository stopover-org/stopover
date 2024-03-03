import { Stack } from "@mui/joy";
import React from "react";
import Typography from "components/v2/Typography/Typography";

interface DataRowProps {
  label: string | React.ReactElement;
  value: string | React.ReactElement;
}

const DataRow = ({ label, value }: DataRowProps) => (
  <Stack direction="row" spacing={1} useFlexGap alignItems="flex-end">
    <Typography level="title-sm">{label}:</Typography>
    <Typography component="span" level="body-md">
      {value}
    </Typography>
  </Stack>
);

export default React.memo(DataRow);
