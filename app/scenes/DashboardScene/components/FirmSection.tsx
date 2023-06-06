import { Grid, Stack } from "@mui/joy";
import Fieldset from "../../../components/v2/Fieldset";
import Typography from "../../../components/v2/Typography";

const FirmSection = () => (
  <Fieldset>
    <Grid container spacing={2} md={10} sm={12}>
      <Grid xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Firm name</Typography>
          <Typography>Date</Typography>
        </Stack>
      </Grid>
      <Grid xs={12}>contact person</Grid>
      <Grid xs={12}>address</Grid>
    </Grid>
  </Fieldset>
);

export default FirmSection;
