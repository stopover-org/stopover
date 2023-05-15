import React from "react";
import { Stack } from "@mui/joy";
import Typography from "../../../components/v2/Typography/Typography";

export const Breadcrumbs = () => (
  <Stack flexDirection="row">
    <Typography fontSize="20px">My Firm</Typography>
  </Stack>
);

export default React.memo(Breadcrumbs);
