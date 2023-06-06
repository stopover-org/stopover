import { Grid } from "@mui/joy";
import Fieldset from "../../../../components/v2/Fieldset";

const FirmBlock = () => (
  <Fieldset>
    <Grid container spacing={2} md={10} sm={12}>
      <Grid xs={6}>Firm name</Grid>
      <Grid xs={6}>date</Grid>
      <Grid xs={12}>contact person</Grid>
      <Grid xs={12}>address</Grid>
    </Grid>
  </Fieldset>
);

export default FirmBlock;
