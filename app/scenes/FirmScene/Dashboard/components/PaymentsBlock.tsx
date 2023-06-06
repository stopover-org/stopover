import { Grid, Stack } from "@mui/joy";
import Typography from "../../../../components/v2/Typography/Typography";
import Fieldset from "../../../../components/v2/Fieldset/Fieldset";

const PaymentsBlock = () => (
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
);

export default PaymentsBlock;
