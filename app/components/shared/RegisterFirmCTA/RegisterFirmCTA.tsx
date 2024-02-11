import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  useTheme,
} from "@mui/joy";
import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import Link from "components/v2/Link";

export const RegisterFirmCTA = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  return (
    <Box
      width={isMobileView ? "100%" : "400px"}
      height={isMobileView ? "unset" : "400px"}
      margin="0 auto"
      sx={{
        borderRadius: "3px",
        padding: "5px",
      }}
      position="relative"
    >
      <Card variant="outlined">
        <CardOverflow>
          <AspectRatio minHeight="100%" maxHeight="100%">
            <img
              src="https://s3.eu-north-1.amazonaws.com/stopoverx.production/lifebelt-4152728_1280.jpg"
              srcSet="https://s3.eu-north-1.amazonaws.com/stopoverx.production/lifebelt-4152728_1280.jpg 2x"
              loading="lazy"
              alt={t("scenes.rootScene.becomePartner")}
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent orientation="horizontal">
          <Link href="/firms/new" fontSize="lg" primary>
            {t("scenes.rootScene.becomePartner")}
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default React.memo(RegisterFirmCTA);
