import { Grid } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import FirmSection from "./components/FirmSection";
import BookingsSection from "./components/BookingsSection";
import BalanceSection from "./components/BalanceSection";
import PaymentsSection from "./components/PaymentsSection";
import SchedulesSection from "./components/SchedulesSection";
import { DashboardScene_FirmFragment$key } from "../../../artifacts/DashboardScene_FirmFragment.graphql";
import EventsSection from "./components/EventsSection";
import { DashboardScene_CurrentUserFragment$key } from "../../../artifacts/DashboardScene_CurrentUserFragment.graphql";

interface DashboardSceneProps {
  firmFragmentRef: DashboardScene_FirmFragment$key;
  currentUserFragmentRef: DashboardScene_CurrentUserFragment$key;
}
const DashboardScene = ({
  firmFragmentRef,
  currentUserFragmentRef,
}: DashboardSceneProps) => {
  const firm = useFragment(
    graphql`
      fragment DashboardScene_FirmFragment on Firm {
        ...BookingsSection_FirmFragment
        ...SchedulesSection_FirmFragment
        ...BalanceSection_FirmFragment
        ...PaymentsSection_FirmFragment
        ...FirmSection_FirmFragment
        ...EventsSection_FirmFragment
      }
    `,
    firmFragmentRef
  );

  const currentUser = useFragment(
    graphql`
      fragment DashboardScene_CurrentUserFragment on User {
        ...FirmSection_CurrentUserFragment
        ...BalanceSection_CurrentUserFragment
      }
    `,
    currentUserFragmentRef
  );

  return (
    <Grid container>
      <Grid lg={12} md={12}>
        <FirmSection
          firmFragmentRef={firm}
          currentUserFragmentRef={currentUser}
        />
      </Grid>

      <Grid lg={12} md={12}>
        <BalanceSection
          firmFragmentRef={firm}
          currentUserFragmentRef={currentUser}
        />
      </Grid>

      <Grid lg={12} md={12}>
        <SchedulesSection firmFragmentRef={firm} />
      </Grid>

      <Grid lg={12} md={12}>
        <PaymentsSection firmFragmentRef={firm} />
      </Grid>

      <Grid lg={12} md={12}>
        <BookingsSection firmFragmentRef={firm} />
      </Grid>

      <Grid lg={12} md={12}>
        <EventsSection firmFragmentRef={firm} />
      </Grid>
    </Grid>
  );
};

export default DashboardScene;
