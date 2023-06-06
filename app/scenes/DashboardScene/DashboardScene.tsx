import { Grid } from "@mui/joy";
import FirmSection from "./components/FirmSection";
import BookingsSection from "./components/BookingsSection";
import BalanceSection from "./components/BalanceSection";
import PaymentsSection from "./components/PaymentsSection";
import SchedulesSection from "./components/SchedulesSection";

const DashboardScene = () => (
  <Grid container spacing={2} md={10} sm={12}>
    <Grid xs={12}>
      <FirmSection />
    </Grid>

    <Grid xs={8}>
      <BalanceSection />
    </Grid>

    <Grid xs={4}>
      <PaymentsSection />
    </Grid>

    <Grid xs={8}>
      <BookingsSection />
    </Grid>

    <Grid xs={4}>
      <SchedulesSection />
    </Grid>
  </Grid>
);

export default DashboardScene;
