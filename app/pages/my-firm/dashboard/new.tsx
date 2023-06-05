import { Grid, Stack } from "@mui/joy";
import Fieldset from "../../../components/v2/Fieldset";
import Typography from "../../../components/v2/Typography";

const New = () => (
  <Grid container spacing={2} md={10} sm={12}>
    <Fieldset>
      <Grid xs={6}>Firm name</Grid>
      <Grid xs={6}>date</Grid>
      <Grid xs={12}>contact person</Grid>
      <Grid xs={12}>address</Grid>
    </Fieldset>

    <Grid xs={8}>
      <Fieldset>
        <Grid>Balance</Grid>
      </Fieldset>
    </Grid>

    <Grid xs={4}>
      <Fieldset>
        <Stack>
          <Grid>payments</Grid>
          <Typography>100$</Typography>
          <Typography>100$</Typography>
          <Typography>100$</Typography>
          <Typography>100$</Typography>
          <Typography>100$</Typography>
        </Stack>
      </Fieldset>
    </Grid>

    <Grid xs={8}>
      <Fieldset>
        <Stack>
          <Grid xs={12}>Bookings</Grid>
          <Grid xs={4}>event title</Grid>
          <Grid xs={4}>300$</Grid>
          <Grid xs={4}>date</Grid>
        </Stack>
      </Fieldset>
    </Grid>

    <Grid xs={4}>
      <Fieldset>
        <Grid>schedules</Grid>
      </Fieldset>
    </Grid>
  </Grid>
);

export default New;
