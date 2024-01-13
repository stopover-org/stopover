import { useTranslation } from "react-i18next";
import React from "react";
import Typography from "components/v2/Typography";
import { Box, Divider, Grid, Stack, useTheme } from "@mui/joy";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import PaymentsIcon from "@mui/icons-material/Payments";
import RegisterFirmCTA from "components/shared/RegisterFirmCTA/RegisterFirmCTA";
import { useMediaQuery } from "@mui/material";

const FirmLandingScene = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  return (
    <Grid
      container
      pl="20px"
      spacing={isMobileView ? 0 : 2}
      padding={isMobileView ? 0 : 4}
      maxWidth="1440px"
      paddingTop="20px"
      margin="0 auto"
    >
      <Grid xs={12}>
        <Typography level="h2">
          {t("scenes.firms.firmLandingScene.title")}
        </Typography>
      </Grid>
      <Grid xs={12} paddingBottom="40px">
        <Typography level="h3">
          {t("scenes.firms.firmLandingScene.subtitle")}
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Divider />
      </Grid>
      <Grid xs={12}>
        <Stack
          direction={isMobileView ? "column" : "row"}
          spacing={2}
          useFlexGap
          alignItems="center"
        >
          <Box
            style={{
              background: `url(https://s3.eu-north-1.amazonaws.com/stopoverx.production/Group+1.svg) center center/cover no-repeat`,
              height: "225px",
              width: "250px",
              position: "relative",
            }}
          >
            <AccessAlarmIcon
              sx={{
                width: "70px",
                height: "70px",
                color: "white",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>
          <Box>
            <Typography fontSize="24px">
              {t("scenes.firms.firmLandingScene.points.0")}
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Stack
          direction={isMobileView ? "column" : "row"}
          spacing={2}
          useFlexGap
          alignItems="center"
        >
          <Box
            style={{
              background: `url(https://s3.eu-north-1.amazonaws.com/stopoverx.production/Group+1.svg) center center/cover no-repeat`,
              height: "225px",
              width: "250px",
              position: "relative",
            }}
          >
            <NotificationsActiveIcon
              sx={{
                width: "70px",
                height: "70px",
                color: "white",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>
          <Box>
            <Typography fontSize="24px">
              {t("scenes.firms.firmLandingScene.points.1")}
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Stack
          direction={isMobileView ? "column" : "row"}
          spacing={2}
          useFlexGap
          alignItems="center"
        >
          <Box
            style={{
              background: `url(https://s3.eu-north-1.amazonaws.com/stopoverx.production/Group+1.svg) center center/cover no-repeat`,
              height: "225px",
              width: "250px",
              position: "relative",
            }}
          >
            <EventAvailableIcon
              sx={{
                width: "70px",
                height: "70px",
                color: "white",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>
          <Box>
            <Typography fontSize="24px">
              {t("scenes.firms.firmLandingScene.points.2")}
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Stack
          direction={isMobileView ? "column" : "row"}
          spacing={2}
          useFlexGap
          alignItems="center"
        >
          <Box
            style={{
              background: `url(https://s3.eu-north-1.amazonaws.com/stopoverx.production/Group+1.svg) center center/cover no-repeat`,
              height: "225px",
              width: "250px",
              position: "relative",
            }}
          >
            <AutoGraphIcon
              sx={{
                width: "70px",
                height: "70px",
                color: "white",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>
          <Box>
            <Typography fontSize="24px">
              {t("scenes.firms.firmLandingScene.points.3")}
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Stack
          direction={isMobileView ? "column" : "row"}
          spacing={2}
          useFlexGap
          alignItems="center"
        >
          <Box
            style={{
              background: `url(https://s3.eu-north-1.amazonaws.com/stopoverx.production/Group+1.svg) center center/cover no-repeat`,
              height: "225px",
              width: "250px",
              position: "relative",
            }}
          >
            <PaymentsIcon
              sx={{
                width: "70px",
                height: "70px",
                color: "white",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>
          <Box>
            <Typography fontSize="24px">
              {t("scenes.firms.firmLandingScene.points.4")}
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid xs={12} paddingTop="50px">
        <RegisterFirmCTA />
      </Grid>
    </Grid>
  );
};

export default React.memo(FirmLandingScene);
