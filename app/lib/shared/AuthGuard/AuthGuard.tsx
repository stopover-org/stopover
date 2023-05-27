import React from "react";
import { useRouter } from "next/router";
import { Grid, Sheet } from "@mui/joy";
import Typography from "../../../components/v2/Typography";

interface AuthGuardProps {
  children: any;
  redirectTo?: string;
  noAccess?:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
  accessible: boolean;
}

const AuthGuard = ({
  children,
  redirectTo,
  noAccess,
  accessible,
}: AuthGuardProps): React.ReactElement | null => {
  const router = useRouter();
  if (accessible) {
    return children;
  }

  if (redirectTo) {
    if (!noAccess) {
      noAccess = "Redirecting...";
    }

    if (typeof window !== "undefined") {
      router.push(redirectTo);
    }
  }

  if (!noAccess) {
    noAccess = "You don't have access to this page";
  }

  if (typeof noAccess === "string") {
    noAccess = (
      <Typography textAlign="center" fontSize="32px">
        {noAccess}
      </Typography>
    );
  }

  return (
    <Grid container xs={12}>
      <Grid xs={12}>
        <Sheet sx={{ padding: "60px 20px" }}>{noAccess}</Sheet>
      </Grid>
    </Grid>
  );
};

export default React.memo(AuthGuard);
