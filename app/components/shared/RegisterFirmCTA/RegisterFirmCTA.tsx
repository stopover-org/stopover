import { AspectRatio, Box, Stack, useTheme } from "@mui/joy";
import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import Link from "components/v2/Link/Link";

export const RegisterFirmCTA = () => {
  const [isServer, setIsServer] = React.useState<boolean>(true);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  React.useEffect(() => {
    setIsServer(false);
  });

  return (
    <Box
      width={isMobileView ? "100%" : "500px"}
      height={isMobileView ? "unset" : "500px"}
      margin="0 auto"
      sx={{
        borderRadius: "3px",
        padding: "5px",
      }}
      position="relative"
    >
      <AspectRatio minHeight="100%" maxHeight="100%">
        <img
          src="https://s3.eu-north-1.amazonaws.com/stopoverx.production/portrait-flight-attendant-with-inflatable-jacket_23-2150282858.jpg"
          srcSet="https://s3.eu-north-1.amazonaws.com/stopoverx.production/portrait-flight-attendant-with-inflatable-jacket_23-2150282858.jpg 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      {!isServer && (
        <Link
          href="/firms/new"
          position="absolute"
          sx={{
            transform: "translate(-50%, -75%)",
            top: "75%",
            left: "50%",
            color: "white",
            opacity: 0.95,
            transition: "opacity 0.1s ease 0s",
            "&:hover": {
              opacity: 1,
            },
          }}
          underline={false}
          fontSize="18px"
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            width="250px"
            height="200px"
            sx={{
              background: `url(https://s3.eu-north-1.amazonaws.com/stopoverx.production/Group+1.svg) center center/cover no-repeat`,
            }}
          >
            {t("scenes.rootScene.becomePartner")}
          </Stack>
        </Link>
      )}
    </Box>
  );
};

export default React.memo(RegisterFirmCTA);
