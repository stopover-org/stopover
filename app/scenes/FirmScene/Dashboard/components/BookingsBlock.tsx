import { Grid, Stack } from "@mui/joy";
import Fieldset from "../../../../components/v2/Fieldset";

const BookingsBlock = () => (
  <Fieldset>
    <Stack>
      <Grid xs={12}>Bookings</Grid>
      <Grid xs={4}>event title</Grid>
      <Grid xs={4}>300$</Grid>
      <Grid xs={4}>date</Grid>
    </Stack>
  </Fieldset>
);
export default BookingsBlock;
