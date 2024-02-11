"use client";

import React from "react";
import { Box, Grid, Stack, useTheme } from "@mui/joy";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import { graphql, useFragment, useMutation } from "react-relay";
import { useRouter } from "next/navigation";
import Menu from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import Link from "components/v2/Link";
import { Header_CurrentUserFragment$key } from "artifacts/Header_CurrentUserFragment.graphql";
import { Header_SignOutMutation } from "artifacts/Header_SignOutMutation.graphql";
import { GlobalSidebarContext } from "components/GlobalSidebarProvider";

interface HeaderProps {
  currentUserFragment: Header_CurrentUserFragment$key;
  showRegisterFirm: boolean;
}

const Header = ({ currentUserFragment, showRegisterFirm }: HeaderProps) => {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const { open } = React.useContext(GlobalSidebarContext);
  const isSmallDisplay = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumDisplay = useMediaQuery(theme.breakpoints.up("md"));
  const currentUser = useFragment(
    graphql`
      fragment Header_CurrentUserFragment on User {
        id
        status
        account {
          id
          firm {
            id
          }
        }
      }
    `,
    currentUserFragment
  );

  const [signOut] = useMutation<Header_SignOutMutation>(graphql`
    mutation Header_SignOutMutation($input: SignOutInput!) {
      signOut(input: $input) {
        signedOut
      }
    }
  `);

  const onSignOut = React.useCallback(() => {
    signOut({
      variables: { input: {} },
      onCompleted() {
        router.push("/events");
      },
    });
  }, [signOut, router]);

  const isAuthorized = React.useMemo(
    () => currentUser.status !== "temporary",
    [currentUser]
  );

  const isServer = React.useMemo(
    () => typeof window === typeof undefined,
    [typeof window]
  );

  const imageSize = React.useMemo(
    () => ({
      width: !isMediumDisplay && !isServer ? 150 : 250,
      height: !isMediumDisplay && !isServer ? 45 : 75,
    }),
    [isMediumDisplay]
  );

  return (
    <Grid
      container
      paddingLeft={{ sx: 0, md: 2 }}
      paddingRight={{ sx: 1, md: 2 }}
    >
      <Grid xs={6} sm={6}>
        <Stack
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          {!isMediumDisplay && (
            <Box sx={{ margin: "5px" }} onClick={open}>
              <Menu />
            </Box>
          )}
          <Link href="/">
            <Image
              src="https://s3.eu-north-1.amazonaws.com/stopoverx.production/stopoverx.svg"
              alt="logo"
              priority
              {...imageSize}
              suppressHydrationWarning
            />
          </Link>
        </Stack>
      </Grid>

      <Grid xs={6} sm={6}>
        <Stack flexDirection="row" justifyContent="flex-end">
          {isMediumDisplay && (
            <Link
              href="/trips"
              textAlign="right"
              level={isSmallDisplay ? "body-sm" : "body-md"}
              lineHeight={`${imageSize.height}px`}
              paddingRight={isSmallDisplay ? "3px" : "10px"}
            >
              {t("layout.header.myTrips")}
            </Link>
          )}
          {!isAuthorized && (
            <Link
              href="/auth/sign_in"
              textAlign="right"
              level={isSmallDisplay ? "body-sm" : "body-md"}
              fontSize="lg"
              lineHeight={`${imageSize.height}px`}
              paddingRight={isSmallDisplay ? "3px" : "10px"}
            >
              {t("layout.header.logIn")}
            </Link>
          )}
          {isAuthorized && showRegisterFirm && (
            <>
              {currentUser.account?.firm?.id && (
                <Link
                  href="/my-firm/dashboard"
                  textAlign="right"
                  level={isSmallDisplay ? "body-sm" : "body-md"}
                  lineHeight={`${imageSize.height}px`}
                  paddingRight={isSmallDisplay ? "3px" : "10px"}
                >
                  {t("layout.header.myFirm")}
                </Link>
              )}

              <Link
                href="?#sign-out"
                textAlign="right"
                level={isSmallDisplay ? "body-sm" : "body-md"}
                lineHeight={`${imageSize.height}px`}
                paddingRight={isSmallDisplay ? "5px" : "20px"}
                onClick={(e) => {
                  e.preventDefault();

                  onSignOut();
                }}
              >
                {t("layout.header.logOut")}
              </Link>
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default React.memo(Header);
