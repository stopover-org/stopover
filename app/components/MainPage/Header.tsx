import React from "react";
import { Grid, useTheme } from "@mui/joy";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import Typography from "../v2/Typography";
import Link from "../v1/Link";

const Header = () => {
  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Grid container>
      <Grid xs={9}>
        <Image src="https://placehold.co/250x75" width={250} height={75} />
      </Grid>

      {isSmallDisplay && (
        <>
          <Grid xs={2}>
            <Typography lineHeight="75px" textAlign="right">
              <Link href="/bookings">Путешествие</Link>
            </Typography>
          </Grid>
          <Grid
            sx={{
              paddingRight: "10px",
            }}
            xs={1}
          >
            <Typography lineHeight="75px" textAlign="right">
              <Link href="/auth/sign_in">Вход</Link>
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default React.memo(Header);
