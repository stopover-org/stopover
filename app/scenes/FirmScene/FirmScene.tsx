import React from "react";
import { graphql, useFragment } from "react-relay";
import { Chip, Grid, Stack } from "@mui/joy";

import Typography from "../../components/v2/Typography";
import Button from "../../components/v2/Button";
import { Breadcrumbs } from "./components/Breadcrumbs";
import RemoveFirm from "./components/RemoveFirm";
import Tag from "../../components/v2/Tag";
import { FirmScene_FirmFragment$key } from "./__generated__/FirmScene_FirmFragment.graphql";

interface FirmSceneProps {
  firmFragmentRef: FirmScene_FirmFragment$key;
}
const FirmScene = ({ firmFragmentRef }: FirmSceneProps) => {
  const firm = useFragment(
    graphql`
      fragment FirmScene_FirmFragment on Firm {
        title
        contactPerson
        country
        region
        street
        fullAddress
        primaryEmail
        primaryPhone
        contacts
        website
        description
        city
        houseNumber
        status
      }
    `,
    firmFragmentRef
  );

  const chips = React.useMemo(
    () => (firm.contacts ? firm.contacts.split(/\s*,\s*/) : []).filter(Boolean),
    [firm.contacts]
  );
  let tagColor = "";
  if (firm.status === "active") tagColor = "primary";
  if (firm.status === "deleted") tagColor = "secondary";
  if (firm.status === "pending") tagColor = "tercial";
  return (
    <Grid container spacing={2} padding={4}>
      <Grid xs={12}>
        <Breadcrumbs />
      </Grid>
      <Grid xs={12} container>
        <Typography level="h3">Firm Title</Typography>
        <Grid xs={2}>
          <Tag href="#" color={tagColor}>
            {firm.status}
          </Tag>
        </Grid>
      </Grid>
      <Grid xs={6} container>
        <Grid xs={4}>
          <Typography>Title:</Typography>
        </Grid>
        <Grid xs={8}>
          <Typography>{firm.title}</Typography>
        </Grid>
      </Grid>
      <Grid xs={6} container>
        <Grid xs={4}>
          <Typography>Contact Person:</Typography>
        </Grid>
        <Grid xs={8}>
          <Typography>{firm.contactPerson}</Typography>
        </Grid>
      </Grid>

      <Grid xs={12} pt={5}>
        <Typography level="h3">Address</Typography>
      </Grid>
      <Grid xs={6} container>
        <Grid xs={4}>
          <Typography>Country:</Typography>
        </Grid>
        <Grid xs={8}>
          <Typography>{firm.country}</Typography>
        </Grid>
      </Grid>
      <Grid xs={6} container>
        <Grid xs={4}>
          <Typography>Region:</Typography>
        </Grid>
        <Grid xs={8}>
          <Typography>{firm.region}</Typography>
        </Grid>
      </Grid>
      <Grid xs={6} container>
        <Grid xs={4}>
          <Typography>City:</Typography>
        </Grid>
        <Grid xs={8}>
          <Typography>{firm.city}</Typography>
        </Grid>
      </Grid>
      <Grid xs={6} container>
        <Grid xs={4}>
          <Typography>Street:</Typography>
        </Grid>
        <Grid xs={8}>
          <Typography>{firm.street}</Typography>
        </Grid>
      </Grid>
      <Grid xs={12} container>
        <Grid xs={4}>
          <Typography>House Number:</Typography>
        </Grid>
        <Grid xs={8}>
          <Typography>{firm.houseNumber}</Typography>
        </Grid>
      </Grid>
      <Grid xs={12} container>
        <Grid xs={4}>
          <Typography>Full Address:</Typography>
        </Grid>
        <Grid xs={8}>
          <Typography>{firm.fullAddress}</Typography>
        </Grid>
      </Grid>

      <Grid xs={12} pt={5}>
        <Typography level="h3">Contact Information</Typography>
      </Grid>
      <Grid xs={6} container>
        <Grid xs={4}>
          <Typography>Primary Email:</Typography>
        </Grid>
        <Grid xs={8}>
          <Typography>{firm.primaryEmail}</Typography>
        </Grid>
      </Grid>
      <Grid xs={6} container>
        <Grid xs={4}>
          <Typography>Primary Phone:</Typography>
        </Grid>
        <Grid xs={8}>
          <Typography>{firm.primaryPhone}</Typography>
        </Grid>
      </Grid>

      <Grid xs={6} container>
        <Grid xs={4}>
          <Typography>Contacts:</Typography>
        </Grid>
        <Grid xs={8}>
          <Stack flexDirection="row" flexWrap="wrap">
            {chips.map((chip: string, index: number) => (
              <Chip
                sx={{ marginRight: 1, marginBottom: 1 }}
                color="primary"
                key={index}
                size="sm"
              >
                {chip}
              </Chip>
            ))}
          </Stack>
        </Grid>
      </Grid>

      <Grid xs={6} container>
        <Grid xs={4}>
          <Typography>Website:</Typography>
        </Grid>
        <Grid xs={8}>
          <Typography>{firm.website}</Typography>
        </Grid>
      </Grid>

      <Grid xs={12}>
        <Typography level="h3">Description</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography>{firm.description}</Typography>
      </Grid>

      <Grid xs={2}>
        <Stack flexDirection="row" justifyContent="flex-start">
          {firm.status != "deleted" && (
            <Button color="primary" size="sm" sx={{ marginRight: 1 }}>
              Edit
            </Button>
          )}
          <RemoveFirm>Delete</RemoveFirm>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default React.memo(FirmScene);
