import React from "react";
import { Grid, Stack, useTheme } from "@mui/joy";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import { graphql, useFragment, useMutation } from "react-relay";
import { useRouter } from "next/router";
import { Header_CurrentUserFragment$key } from "./__generated__/Header_CurrentUserFragment.graphql";
import { Header_SignOutMutation } from "./__generated__/Header_SignOutMutation.graphql";
import Link from "../v2/Link";

interface HeaderProps {
  currentUserFragment: Header_CurrentUserFragment$key;
  showRegisterFirm: boolean;
}

const Header = ({ currentUserFragment, showRegisterFirm }: HeaderProps) => {
  const router = useRouter();
  const theme = useTheme();
  const isMediumDisplay = useMediaQuery(theme.breakpoints.up("sm"));
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
    () => currentUser && currentUser?.status !== "temporary",
    [currentUser]
  );
  return (
    <Grid container>
      <Grid xs={9} sm={6}>
        <Image src="https://placehold.co/250x75" width={250} height={75} />
      </Grid>

      <Grid xs={3} sm={6}>
        <Stack flexDirection="row" justifyContent="flex-end">
          {isMediumDisplay && (
            <Link
              href="/trips"
              textAlign="right"
              level="body1"
              fontSize="lg"
              lineHeight="75px"
              paddingRight="10px"
            >
              My Trips
            </Link>
          )}
          {!isAuthorized && (
            <Link
              href="/auth/sign_in"
              textAlign="right"
              level="body1"
              fontSize="lg"
              lineHeight="75px"
              paddingRight="10px"
            >
              Log In
            </Link>
          )}
          {isAuthorized && showRegisterFirm && (
            <>
              {currentUser.account?.firm?.id ? (
                <Link
                  href="/firms/my-firm"
                  textAlign="right"
                  level="body1"
                  fontSize="lg"
                  lineHeight="75px"
                  paddingRight="10px"
                >
                  My Firm
                </Link>
              ) : (
                <Link
                  href="/firms/new"
                  textAlign="right"
                  level="body1"
                  fontSize="lg"
                  lineHeight="75px"
                  paddingRight="10px"
                >
                  Register Firm
                </Link>
              )}

              <Link
                href="?#sign-out"
                textAlign="right"
                level="body1"
                fontSize="lg"
                lineHeight="75px"
                paddingRight="20px"
                onClick={(e) => {
                  e.preventDefault();

                  onSignOut();
                }}
              >
                Log out
              </Link>
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default React.memo(Header);
