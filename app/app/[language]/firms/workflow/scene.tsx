import React from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { useTranslation } from "react-i18next";
import { scene_WorkflowQuery } from "artifacts/scene_WorkflowQuery.graphql";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Sheet,
  Stack,
  useTheme,
} from "@mui/joy";
import Typography from "components/v2/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useMediaQuery } from "@mui/material";
import Button from "components/v2/Button";
import Link from "components/v2/Link";

const Workflow = () => {
  const [server, setServer] = React.useState(true);
  const data = useLazyLoadQuery<scene_WorkflowQuery>(
    graphql`
      query scene_WorkflowQuery {
        currentUser {
          ...Layout_CurrentUserFragment
        }
      }
    `,
    {}
  );
  const { t } = useTranslation();

  useDocumentTitle(t("seo.firms.workflow.title"));

  const thme = useTheme();
  const isMobileView = useMediaQuery(thme.breakpoints.down("md"));

  React.useEffect(() => {
    setServer(false);
  }, []);

  if (server) return null;

  return (
    <Layout currentUserFragment={data.currentUser}>
      <AuthGuard accessible>
        <Sheet sx={{ margin: "0 auto", maxWidth: "1024px" }}>
          <Grid container>
            <Grid xs={12} padding={1}>
              <Typography level="h1" component="h1">
                {t("scenes.firms.firmWorkflowScene.header")}
              </Typography>
            </Grid>
            <Grid xs={12} padding={1}>
              <Card
                variant="solid"
                color="primary"
                invertedColors
                sx={{ maxWidth: "768px", width: "100%", marginLeft: 0 }}
              >
                <CardContent
                  orientation={isMobileView ? "vertical" : "horizontal"}
                  sx={{ alignItems: isMobileView ? "center" : "flex-start" }}
                >
                  <CircularProgress size="lg" determinate value={20}>
                    <AddBusinessIcon />
                  </CircularProgress>
                  <CardContent orientation="horizontal">
                    <Stack alignItems={isMobileView ? "center" : "flex-start"}>
                      <Typography level="h3" component="h2">
                        {t(
                          "scenes.firms.firmWorkflowScene.createCompany.header"
                        )}
                      </Typography>
                      <Typography level="body-md">
                        {t(
                          "scenes.firms.firmWorkflowScene.createCompany.subheader"
                        )}
                      </Typography>
                    </Stack>
                  </CardContent>
                  <CardActions />
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} padding={2} paddingLeft={4}>
              <Stack
                direction="row"
                justifyContent={isMobileView ? "center" : "flex-start"}
                spacing={2}
                useFlexGap
              >
                <IconButton>
                  <ArrowDownwardIcon />
                </IconButton>
                <Link href="/firms/new">
                  <Button>
                    {t("scenes.firms.firmWorkflowScene.createCompany.action")}
                  </Button>
                </Link>
              </Stack>
            </Grid>
            <Grid xs={12} padding={1}>
              <Card
                variant="solid"
                color="primary"
                invertedColors
                sx={{ maxWidth: "768px", width: "100%", marginLeft: 0 }}
              >
                <CardContent
                  orientation={isMobileView ? "vertical" : "horizontal"}
                  sx={{ alignItems: isMobileView ? "center" : "flex-start" }}
                >
                  <CircularProgress size="lg" determinate value={40}>
                    <CalendarMonthIcon />
                  </CircularProgress>
                  <CardContent orientation="horizontal">
                    <Stack alignItems={isMobileView ? "center" : "flex-start"}>
                      <Typography level="h3" component="h2">
                        {t(
                          "scenes.firms.firmWorkflowScene.createEvents.header"
                        )}
                      </Typography>
                      <Typography level="body-md">
                        {t(
                          "scenes.firms.firmWorkflowScene.createEvents.subheader"
                        )}
                      </Typography>
                      <Typography level="body-md">
                        {t(
                          "scenes.firms.firmWorkflowScene.createEvents.description"
                        )}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} padding={2} paddingLeft={4}>
              <Stack
                direction="row"
                justifyContent={isMobileView ? "center" : "flex-start"}
                spacing={2}
                useFlexGap
              >
                <IconButton>
                  <ArrowDownwardIcon />
                </IconButton>
                <Link href="/my-firm/events/new">
                  <Button>
                    {t("scenes.firms.firmWorkflowScene.createEvents.action")}
                  </Button>
                </Link>
              </Stack>
            </Grid>
            <Grid xs={12} padding={1}>
              <Card
                variant="solid"
                color="primary"
                invertedColors
                sx={{ maxWidth: "768px", width: "100%", marginLeft: 0 }}
              >
                <CardContent
                  orientation={isMobileView ? "vertical" : "horizontal"}
                  sx={{ alignItems: isMobileView ? "center" : "flex-start" }}
                >
                  <CircularProgress size="lg" determinate value={60}>
                    <ConfirmationNumberIcon />
                  </CircularProgress>
                  <CardContent orientation="horizontal">
                    <Stack alignItems={isMobileView ? "center" : "flex-start"}>
                      <Typography level="h3" component="h2">
                        {t(
                          "scenes.firms.firmWorkflowScene.allowBookings.header"
                        )}
                      </Typography>
                      <Typography level="body-md">
                        {t(
                          "scenes.firms.firmWorkflowScene.allowBookings.subheader"
                        )}
                      </Typography>
                      <Typography level="body-md">
                        {t(
                          "scenes.firms.firmWorkflowScene.allowBookings.description"
                        )}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} padding={2} paddingLeft={4}>
              <Stack alignItems={isMobileView ? "center" : "flex-start"}>
                <IconButton>
                  <ArrowDownwardIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid xs={12} padding={1}>
              <Card
                variant="solid"
                color="primary"
                invertedColors
                sx={{ maxWidth: "768px", width: "100%", marginLeft: 0 }}
              >
                <CardContent
                  orientation={isMobileView ? "vertical" : "horizontal"}
                  sx={{ alignItems: isMobileView ? "center" : "flex-start" }}
                >
                  <CircularProgress size="lg" determinate value={80}>
                    <ManageAccountsIcon />
                  </CircularProgress>
                  <CardContent orientation="horizontal">
                    <Stack alignItems={isMobileView ? "center" : "flex-start"}>
                      <Typography level="h3" component="h2">
                        {t(
                          "scenes.firms.firmWorkflowScene.manageBookings.header"
                        )}
                      </Typography>
                      <Typography level="body-md">
                        {t(
                          "scenes.firms.firmWorkflowScene.manageBookings.subheader"
                        )}
                      </Typography>
                      <Typography level="body-md">
                        {t(
                          "scenes.firms.firmWorkflowScene.manageBookings.description"
                        )}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} padding={2} paddingLeft={4}>
              <Stack alignItems={isMobileView ? "center" : "flex-start"}>
                <IconButton>
                  <ArrowDownwardIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid xs={12} padding={1}>
              <Card
                variant="solid"
                color="primary"
                invertedColors
                sx={{ maxWidth: "768px", width: "100%", marginLeft: 0 }}
              >
                <CardContent
                  orientation={isMobileView ? "vertical" : "horizontal"}
                  sx={{ alignItems: isMobileView ? "center" : "flex-start" }}
                >
                  <CircularProgress size="lg" determinate value={100}>
                    <CurrencyExchangeIcon />
                  </CircularProgress>
                  <CardContent orientation="horizontal">
                    <Stack alignItems={isMobileView ? "center" : "flex-start"}>
                      <Typography level="h3" component="h2">
                        {t("scenes.firms.firmWorkflowScene.payouts.header")}
                      </Typography>
                      <Typography level="body-md">
                        {t("scenes.firms.firmWorkflowScene.payouts.subheader")}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Sheet>
      </AuthGuard>
    </Layout>
  );
};

export default React.memo(Workflow);
