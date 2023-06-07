import { Grid } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import FirmSection from "./components/FirmSection";
import BookingsSection from "./components/BookingsSection";
import BalanceSection from "./components/BalanceSection";
import PaymentsSection from "./components/PaymentsSection";
import SchedulesSection from "./components/SchedulesSection";
import { DashboardScene_FirmFragment$key } from "./__generated__/DashboardScene_FirmFragment.graphql";

interface DashboardSceneProps {
  firmFragmentRef: DashboardScene_FirmFragment$key;
}
const DashboardScene = ({ firmFragmentRef }: DashboardSceneProps) => {
  const firm = useFragment(
    graphql`
      fragment DashboardScene_FirmFragment on Firm {
        ...BookingsSection_FirmFragment
        ...SchedulesSection_FirmFragment
        ...BalanceSection_FirmFragment
        ...PaymentsSection_FirmFragment
        ...FirmSection_FirmFragment
      }
    `,
    firmFragmentRef
  );

  return (
    <Grid container spacing={2} md={10} sm={12}>
      <Grid xs={12}>
        <FirmSection firmFragmentRef={firm} />
      </Grid>

      <Grid xs={8}>
        <BalanceSection firmFragmentRef={firm} />
      </Grid>

      <Grid xs={4}>
        <PaymentsSection firmFragmentRef={firm} />
      </Grid>

      <Grid xs={8}>
        <BookingsSection firmFragmentRef={firm} />
      </Grid>

      <Grid xs={4}>
        <SchedulesSection firmFragmentRef={firm} />
      </Grid>
    </Grid>
  );
};

export default DashboardScene;
