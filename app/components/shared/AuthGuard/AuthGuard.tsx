import React from "react";
import { notFound, useRouter } from "next/navigation";
import { Grid, Sheet } from "@mui/joy";
import Typography from "components/v2/Typography";

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
    return <React.Suspense>{children}</React.Suspense>;
  }

  if (redirectTo) {
    if (!noAccess) {
      noAccess = "Redirecting...";
    }

    if (typeof window !== typeof undefined) {
      router.push(redirectTo);
    }
  }

  if (!noAccess) {
    notFound();
    return null;
  }

  if (typeof noAccess === "string") {
    noAccess = (
      <Typography textAlign="center" fontSize="32px">
        {noAccess}
      </Typography>
    );
  }

  return (
    <React.Suspense>
      <Grid container xs={12}>
        <Grid xs={12}>
          <Sheet sx={{ padding: "60px 20px" }}>{noAccess}</Sheet>
        </Grid>
      </Grid>
    </React.Suspense>
  );
};

export default React.memo(AuthGuard);
