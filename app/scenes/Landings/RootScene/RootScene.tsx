import {
  AspectRatio,
  Avatar,
  Box,
  Grid,
  List,
  ListDivider,
  ListItem,
  ListItemDecorator,
  useTheme,
} from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import Typography from "components/v2/Typography";
import { RootScene_QueryFragment$key } from "artifacts/RootScene_QueryFragment.graphql";
import RegisterFirmCTA from "components/shared/RegisterFirmCTA";
import SearchBar from "scenes/attendees/events/EventsScene/components/SearchBar";
import useEdges from "lib/hooks/useEdges";
import EventCardCompact from "scenes/attendees/events/EventsScene/components/EventCardCompact";
import Link from "components/v2/Link";

interface Props {
  queryFragmentRef: any;
}

const RootScene = ({ queryFragmentRef }: Props) => {
  const data = useFragment<RootScene_QueryFragment$key>(
    graphql`
      fragment RootScene_QueryFragment on Query {
        interests {
          title
          slug
          preview
        }
        events(filters: { today: true }) {
          edges {
            node {
              id
              ...EventCardCompacts_EventFragment
            }
          }
        }
      }
    `,
    queryFragmentRef
  );
  const { interests } = data;
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const events = useEdges(data.events);

  return (
    <>
      <Grid container>
        <Grid xs={12} position="relative">
          <AspectRatio minHeight="600px" maxHeight="1000px">
            <img
              src="https://s3.eu-north-1.amazonaws.com/stopoverx.production/shallow-focused-shot-cap-wearing-man-s-back-during-sunset-golden-hour.jpg"
              srcSet="https://s3.eu-north-1.amazonaws.com/stopoverx.production/shallow-focused-shot-cap-wearing-man-s-back-during-sunset-golden-hour.jpg 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <Box
            maxWidth="1440px"
            minWidth="250px"
            margin="0 auto"
            position="absolute"
            top={isMobileView ? "50%" : "200px"}
            left={isMobileView ? "50%" : "25%"}
            width={isMobileView ? "100%" : "50%"}
            sx={{
              transform: isMobileView
                ? "translate(-50%, -50%)"
                : "translateX(-25%)",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderRadius: "3px",
              padding: isMobileView ? "5px 25px" : "5px",
            }}
          >
            <Typography fontSize="28px" level="title-lg">
              {t("scenes.rootScene.lookingFor")}
            </Typography>
            <SearchBar redirect />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ paddingLeft: "15px" }}>
        <Grid xs={12}>
          <Link
            href="/events"
            fontSize="28px"
            level="title-lg"
            sx={{ paddingTop: "20px" }}
          >
            {t("general.all")} {t("models.event.plural")} &gt;
          </Link>
        </Grid>
        {events.map((event) => (
          <EventCardCompact
            key={event!.id}
            eventFragmentRef={event!}
            includeInterests={false}
          />
        ))}
      </Grid>
      <Grid
        container
        spacing={isMobileView ? 0 : 2}
        padding={isMobileView ? 0 : 4}
        maxWidth="1440px"
        paddingTop="150px"
        margin="0 auto"
        sx={{ paddingLeft: "15px" }}
      >
        <Grid xs={12}>
          <Typography fontSize="32px" level="title-lg">
            {t("scenes.rootScene.whatAreYouLookingForm")}
          </Typography>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <List
            sx={{
              minWidth: 240,
              borderRadius: "sm",
            }}
          >
            {interests
              ? interests
                  .slice(0, interests.length / 3)
                  .map(({ title, slug, preview }) => (
                    <React.Fragment key={slug}>
                      <ListItem
                        component="a"
                        href={`/events?interests=${JSON.stringify([slug])}`}
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        <ListItemDecorator>
                          <Avatar size="sm" src={preview || undefined} />
                        </ListItemDecorator>
                        {title}
                      </ListItem>
                      <ListDivider inset="startContent" />
                    </React.Fragment>
                  ))
              : null}
          </List>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <List
            component="ol"
            sx={{
              minWidth: 240,
              borderRadius: "sm",
            }}
          >
            {interests
              ? interests
                  .slice(interests.length / 3, (interests.length / 3) * 2)
                  .map(({ title, slug, preview }) => (
                    <React.Fragment key={slug}>
                      <ListItem
                        component="a"
                        href={`/events?interests=${JSON.stringify([slug])}`}
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        <ListItemDecorator>
                          <Avatar size="sm" src={preview || undefined} />
                        </ListItemDecorator>
                        {title}
                      </ListItem>
                      <ListDivider inset="startContent" />
                    </React.Fragment>
                  ))
              : null}
          </List>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <List
            sx={{
              minWidth: 240,
              borderRadius: "sm",
            }}
          >
            {interests
              ? interests
                  .slice((interests.length / 3) * 2, interests.length)
                  .map(({ title, slug, preview }) => (
                    <React.Fragment key={slug}>
                      <ListItem
                        component="a"
                        href={`/events?interests=${JSON.stringify([slug])}`}
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        <ListItemDecorator>
                          <Avatar size="sm" src={preview || undefined} />
                        </ListItemDecorator>
                        {title}
                      </ListItem>
                      <ListDivider inset="startContent" />
                    </React.Fragment>
                  ))
              : null}
          </List>
        </Grid>
        <Grid xs={12} paddingTop={isMobileView ? "50px" : "350px"}>
          <RegisterFirmCTA />
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(RootScene);
