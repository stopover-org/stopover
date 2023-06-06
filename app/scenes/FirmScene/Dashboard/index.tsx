import { Grid } from "@mui/joy";
import FirmBlock from "./components/FirmBlock";
import BookingsBlock from "./components/BookingsBlock";
import BalanceBlock from "./components/BalanceBlock";
import PaymentsBlock from "./components/PaymentsBlock";
import SchedulesBlock from "./components/SchedulesBlock";

const Index = () => (
  <Grid container spacing={2} md={10} sm={12}>
    <Grid xs={12}>
      <FirmBlock />
    </Grid>

    <Grid xs={8}>
      <BalanceBlock />
    </Grid>

    <Grid xs={4}>
      <PaymentsBlock />
    </Grid>

    <Grid xs={8}>
      <BookingsBlock />
    </Grid>

    <Grid xs={4}>
      <SchedulesBlock />
    </Grid>
  </Grid>
);

export default Index;
