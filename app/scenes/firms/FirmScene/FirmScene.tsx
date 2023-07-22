import React from "react";
import { graphql, useFragment } from "react-relay";
import { AspectRatio, Box, Chip, Grid, Stack } from "@mui/joy";
import Typography from "../../../components/v2/Typography";
import Button from "../../../components/v2/Button";
import Breadcrumbs from "../../../components/v2/Breadcrumbs";
import RemoveFirm from "./components/RemoveFirm";
import Tag from "../../../components/v2/Tag";
import Link from "../../../components/v2/Link";
import { FirmScene_FirmFragment$key } from "../../../artifacts/FirmScene_FirmFragment.graphql";
import Fieldset from "../../../components/v2/Fieldset";
import useStatusColor from "../../../lib/hooks/useStatusColor";
import { capitalize } from "../../../lib/utils/capitalize";

interface FirmSceneProps {
  firmFragmentRef: FirmScene_FirmFragment$key;
}
const FirmScene = ({ firmFragmentRef }: FirmSceneProps) => {
  const firm = useFragment<FirmScene_FirmFragment$key>(
    graphql`
      fragment FirmScene_FirmFragment on Firm {
        city
        contactPerson
        contacts
        country
        description
        fullAddress
        houseNumber
        image
        paymentTypes
        primaryEmail
        primaryPhone
        region
        status
        street
        title
        website
      }
    `,
    firmFragmentRef
  );

  const chips = React.useMemo(
    () => (firm.contacts ? firm.contacts.split(/\s*,\s*/) : []).filter(Boolean),
    [firm.contacts]
  );

  const tagColor = useStatusColor({
    primary: ["active"],
    danger: ["deleted"],
    info: ["pending"],
    status: firm.status,
  });

  return (
    <Box>
      <Breadcrumbs items={["My Firm"]} />
      <Grid container spacing={2} sm={12} md={8}>
        <Fieldset>
          <Grid xs={12}>
            <Typography level="h3" sx={{ display: "inline" }}>
              {firm.title}
            </Typography>
            <Tag href="#" color={tagColor}>
              {firm.status}
            </Tag>
          </Grid>
          <Grid xs={2}>
            <Typography>Contact Person:</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>{firm.contactPerson}</Typography>
          </Grid>
          <Grid xs={6}>
            {firm.image && (
              <AspectRatio
                variant="outlined"
                ratio="4/3"
                sx={{
                  bgcolor: "background.level2",
                  borderRadius: "md",
                  position: "relative",
                }}
              >
                <img alt="Logo Preview" src={firm.image} />
              </AspectRatio>
            )}
          </Grid>
        </Fieldset>

        <Fieldset>
          <Grid xs={12}>
            <Typography level="h3">Address</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>Country:</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>{firm.country}</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>Region:</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>{firm.region}</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>City:</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>{firm.city}</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>Street:</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>{firm.street}</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>House Number:</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>{firm.houseNumber}</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>Full Address:</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>{firm.fullAddress}</Typography>
          </Grid>
        </Fieldset>

        <Fieldset>
          <Grid xs={12}>
            <Typography level="h4">Payment Information</Typography>
          </Grid>
          <Grid xs={6}>
            {firm.paymentTypes.map((type) => (
              <Chip sx={{ marginRight: "5px" }}>{capitalize(type)}</Chip>
            ))}
          </Grid>
        </Fieldset>

        <Fieldset>
          <Grid xs={12}>
            <Typography level="h3">Contact Information</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>Primary Email:</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>{firm.primaryEmail}</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>Primary Phone:</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>{firm.primaryPhone}</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography>Contacts:</Typography>
          </Grid>
          <Grid xs={10}>
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
          <Grid xs={2}>
            <Typography>Website:</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>{firm.website}</Typography>
          </Grid>
        </Fieldset>
        <Fieldset>
          <Grid xs={12}>
            <Typography level="h3">Description</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography>{firm.description}</Typography>
          </Grid>
        </Fieldset>

        <Fieldset>
          <Grid xs={12}>
            <Stack flexDirection="row" justifyContent="flex-start">
              {firm.status !== "deleted" && (
                <Link href="/my-firm/edit" underline={false}>
                  <Button color="primary" size="sm" sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                </Link>
              )}
              <RemoveFirm />
            </Stack>
          </Grid>
        </Fieldset>
      </Grid>
    </Box>
  );
};

export default React.memo(FirmScene);
