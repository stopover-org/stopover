import { Grid } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import Typography from "components/v2/Typography/Typography";

const NotFound = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  return (
    <Grid container p={2} spacing={2}>
      <Grid xs={12}>
        <Typography level="h2">
          {pathname}
          <br />
          {t("general.404")}
        </Typography>
      </Grid>
      <Grid xs={12} maxWidth="1024px" margin="0 auto">
        <img src="/404.svg" alt="Not Found 404" />
      </Grid>
    </Grid>
  );
};

export default React.memo(NotFound);
