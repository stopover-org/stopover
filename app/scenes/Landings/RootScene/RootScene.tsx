import { AspectRatio, Avatar, Box, Grid, List, ListDivider, ListItem, ListItemDecorator, useTheme } from "@mui/joy"
import React from "react"
import { graphql, useFragment } from "react-relay"
import Typography from "../../../components/v2/Typography"
import { RootScene_QueryFragment$key } from "../../../artifacts/RootScene_QueryFragment.graphql";
import SearchBar from "../../attendees/events/EventsScene/components/SearchBar";
import { useMediaQuery } from "@mui/material";
import Button from "../../../components/v2/Button";
import Link from "../../../components/v2/Link";

interface Props {
  queryFragmentRef: any
}

const RootScene = ({ queryFragmentRef }: Props) => {
  const { interests } = useFragment<RootScene_QueryFragment$key>(graphql`
    fragment RootScene_QueryFragment on Query {
      interests {
        title
        slug
        preview
      }
    }
  `, queryFragmentRef)

  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Grid container>
        <Grid xs={12} position={'relative'}>
          <AspectRatio minHeight="600px" maxHeight="1000px">
            <img
              src="https://s3.eu-north-1.amazonaws.com/stopoverx.production/shallow-focused-shot-cap-wearing-man-s-back-during-sunset-golden-hour.jpg"
              srcSet="https://s3.eu-north-1.amazonaws.com/stopoverx.production/shallow-focused-shot-cap-wearing-man-s-back-during-sunset-golden-hour.jpg 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <Box 
            maxWidth='1440px'
            minWidth='250px'
            margin='0 auto'
            position={'absolute'}
            top={isMobileView ? '30px' : '200px'}
            left={isMobileView ? '0' : '25%'}
            width={isMobileView ? '100%' : "50%"}
            sx={{ 
              transfform: 'translateX(-25%)',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '3px',
              padding: '5px',
             }}
          >
            <Typography fontSize={'28px'} level='title-lg' sx={{  }}>Я ищу:</Typography>
            <SearchBar redirect />
          </Box>
        </Grid>
      </Grid>
      <Grid 
        container
        spacing={isMobileView ? 0 : 2}
        padding={isMobileView ? 0 : 4}
        maxWidth='1440px'
        paddingTop='150px'
        margin='0 auto'
      >
        <Grid xs={12}>
          <Typography fontSize="32px" level='title-lg'>Что вам интересно?</Typography>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <List
            sx={{
              minWidth: 240,
              borderRadius: 'sm',
            }}
          >
            {interests ? interests.slice(0, (interests.length / 3)).map(({ title, slug, preview }) => (
              <React.Fragment key={slug}>
                <ListItem component='a' href={`/events?interests=${slug}`} sx={{ '&:hover': { cursor: 'pointer', textDecoration: 'underline' }}}>
                  <ListItemDecorator>
                    <Avatar size="sm" src={preview || undefined} />
                  </ListItemDecorator>
                  {title}
                </ListItem>
                <ListDivider inset='startContent' />
              </React.Fragment>
            )) : null}
          </List>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <List
            component='ol'
            sx={{
              minWidth: 240,
              borderRadius: 'sm',
            }}
          >
            {interests ? interests.slice(interests.length / 3, (interests.length / 3) * 2).map(({ title, slug, preview }) => (
              <React.Fragment key={slug}>
                <ListItem component='a' href={`/events?interests=${slug}`} sx={{ '&:hover': { cursor: 'pointer', textDecoration: 'underline' }}}>
                  <ListItemDecorator>
                    <Avatar size="sm" src={preview || undefined} />
                  </ListItemDecorator>
                  {title}
                </ListItem>
                <ListDivider inset='startContent' />
              </React.Fragment>
            )) : null}
          </List>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <List
            sx={{
              minWidth: 240,
              borderRadius: 'sm',
            }}
          >
            {interests ? interests.slice((interests.length / 3) * 2, interests.length).map(({ title, slug, preview }) => (
              <React.Fragment key={slug}>
                <ListItem component='a' href={`/events?interests=${slug}`} sx={{ '&:hover': { cursor: 'pointer', textDecoration: 'underline' }}}>
                  <ListItemDecorator>
                    <Avatar size="sm" src={preview || undefined} />
                  </ListItemDecorator>
                  {title}
                </ListItem>
                <ListDivider inset='startContent' />
              </React.Fragment>
            )) : null}
          </List>
        </Grid>
        <Grid xs={12} paddingTop={isMobileView ? '50px' : '350px'}>
          <Box
            width={isMobileView ? '100%' : '500px'}
            height={isMobileView ? 'unset' : '500px'}
            margin='0 auto'
            sx={{
              borderRadius: '3px',
              padding: '5px',
            }}
            position={'relative'}
          >
            <AspectRatio minHeight="100%" maxHeight="100%">
              <img
                src="https://s3.eu-north-1.amazonaws.com/stopoverx.production/portrait-flight-attendant-with-inflatable-jacket_23-2150282858.jpg"
                srcSet="https://s3.eu-north-1.amazonaws.com/stopoverx.production/portrait-flight-attendant-with-inflatable-jacket_23-2150282858.jpg 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
            <Link
              href='/firms/new'
              position={'absolute'}
              sx={{ 
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%'
               }}
             >
              <Button size='lg' sx={{ boxShadow: '0 0 2px white;' }}>
                Стать партнером
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default React.memo(RootScene)