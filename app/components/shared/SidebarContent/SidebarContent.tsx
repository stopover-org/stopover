import { Grid, styled, useTheme } from "@mui/joy";
import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import { SidebarContent_AccountFragment$key } from "artifacts/SidebarContent_AccountFragment.graphql";
import { GlobalSidebarContext } from "components/GlobalSidebarProvider";
import Typography from "components/v2/Typography";
import Sidebar from "components/shared/Sidebar";
import SelectCurrentFirm from "../SelectCurrentFirm";

const ContentWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: "calc(100vw - 310px)",
    width: "100%",
  },
}));

interface SidebarContentProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
  sx?: any;
  accountFragmentRef: SidebarContent_AccountFragment$key;
}

const SidebarContent = ({
  children,
  sx,
  accountFragmentRef,
}: SidebarContentProps) => {
  const account = useFragment<SidebarContent_AccountFragment$key>(
    graphql`
      fragment SidebarContent_AccountFragment on Account {
        ...SelectCurrentFirm_AccountFragment
        firm {
          title
        }
        user {
          serviceUser
        }
      }
    `,
    accountFragmentRef
  );
  const theme = useTheme();
  const showSidebar = useMediaQuery(theme.breakpoints.up("md"));
  const { setContent } = React.useContext(GlobalSidebarContext);
  const { t } = useTranslation();
  const items = React.useMemo(() => {
    let array: Array<
      | { slot: JSX.Element }
      | { title: string; href: string; serviceUser?: boolean }
    > = account.user.serviceUser
      ? [{ slot: <SelectCurrentFirm accountFragmentRef={account} /> }]
      : [
          {
            slot: (
              <Typography pl="15px" level="h4">
                {account?.firm?.title}
              </Typography>
            ),
          },
        ];

    array = [
      ...array,
      { title: t("layout.header.myFirm"), href: "/my-firm/dashboard" },
      {
        title: t("layout.header.addNewEvent"),
        href: "/my-firm/events/new",
      },
      { title: t("models.event.plural"), href: "/my-firm/events" },
      { title: t("models.booking.plural"), href: "/my-firm/bookings" },
      {
        title: t("models.schedule.plural"),
        href: "/my-firm/schedules",
      },
      {
        title: t("models.payment.plural"),
        href: "/my-firm/payments",
      },
      {
        title: t("models.user.plural"),
        href: "/my-firm/users",
      },
    ];

    if (account.user.serviceUser) {
      array.push({
        title: t("layout.header.firmSettings"),
        href: "/my-firm/settings",
        serviceUser: true,
      });

      array.push({
        title: t("layout.header.registerFirm"),
        href: "/firms/new",
        serviceUser: true,
      });

      array.push({
        title: t("models.interest.plural"),
        href: "/interests",
        serviceUser: true,
      });

      array.push({
        title: t("models.article.plural"),
        href: "/articles",
        serviceUser: true,
      });
    }

    return array;
  }, [account]);

  React.useEffect(() => {
    setContent(<Sidebar items={items} />);
  }, [t]);
  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: "20px", paddingRight: "20px" }}
    >
      {showSidebar && <Sidebar items={items} />}
      <ContentWrapper
        container
        sx={{
          paddingTop: showSidebar ? "7px" : "20px",
          minWidth: "calc(100wv - 250px)",
          ...sx,
        }}
      >
        <Grid xs={12}>{children}</Grid>
      </ContentWrapper>
    </Grid>
  );
};

export default React.memo(SidebarContent);
