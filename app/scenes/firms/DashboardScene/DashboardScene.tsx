import { Grid, useTheme } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { useMediaQuery } from "@mui/material";
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
  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid container>
      <Grid lg={6} md={8} sm={12} xs={12}>
        <FirmSection
          firmFragmentRef={firm}
          currentUserFragmentRef={currentUser}
        />
      </Grid>
      <Grid
        lg={6}
        md={4}
        display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
      />

      <Grid lg={6} md={8} sm={12} xs={12}>
        <BalanceSection
          firmFragmentRef={firm}
          currentUserFragmentRef={currentUser}
        />
      </Grid>
      <Grid
        lg={6}
        md={4}
        display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
      />

      <Grid lg={6} md={8} sm={12} xs={12}>
        <SchedulesSection firmFragmentRef={firm} />
      </Grid>
      <Grid
        lg={6}
        md={4}
        display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
      />

      <Grid lg={6} md={8} sm={12} xs={12}>
        <PaymentsSection firmFragmentRef={firm} />
      </Grid>
      <Grid
        lg={6}
        md={4}
        display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
      />

      <Grid lg={6} md={8} sm={12} xs={12}>
        <BookingsSection firmFragmentRef={firm} />
      </Grid>
      <Grid
        lg={6}
        md={4}
        display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
      />

      <Grid lg={6} md={8} sm={12} xs={12}>
        <EventsSection firmFragmentRef={firm} />
      </Grid>
      <Grid
        lg={6}
        md={4}
        display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
      />
    </Grid>
  );
};

export default DashboardScene;
