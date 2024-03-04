import { Grid } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { DashboardScene_FirmFragment$key } from "artifacts/DashboardScene_FirmFragment.graphql";
import { DashboardScene_CurrentUserFragment$key } from "artifacts/DashboardScene_CurrentUserFragment.graphql";
import FirmSection from "./components/FirmSection";
import BookingsSection from "./components/BookingsSection";
import BalanceSection from "./components/BalanceSection";
import SchedulesSection from "./components/SchedulesSection";
import EventsSection from "./components/EventsSection";

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
      <Grid lg={8} md={8} sm={12} xs={12}>
        <FirmSection
          firmFragmentRef={firm}
          currentUserFragmentRef={currentUser}
        />
      </Grid>
      <Grid
        lg={4}
        md={4}
        display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
      />

      <Grid lg={8} md={8} sm={12} xs={12}>
        <BalanceSection
          firmFragmentRef={firm}
          currentUserFragmentRef={currentUser}
        />
      </Grid>
      <Grid
        lg={4}
        md={4}
        display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
      />

      <Grid lg={8} md={8} sm={12} xs={12}>
        <SchedulesSection firmFragmentRef={firm} />
      </Grid>
      <Grid
        lg={4}
        md={4}
        display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
      />

      <Grid lg={8} md={8} sm={12} xs={12}>
        <BookingsSection firmFragmentRef={firm} />
      </Grid>
      <Grid
        lg={4}
        md={4}
        display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
      />

      <Grid lg={8} md={8} sm={12} xs={12}>
        <EventsSection firmFragmentRef={firm} />
      </Grid>
      <Grid
        lg={4}
        md={4}
        display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
      />
    </Grid>
  );
};

export default DashboardScene;
