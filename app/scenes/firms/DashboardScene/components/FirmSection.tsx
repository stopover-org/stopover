import { Grid, Stack } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Section from "../../../../components/v2/Section";
import Typography from "../../../../components/v2/Typography";
import { FirmSection_FirmFragment$key } from "./__generated__/FirmSection_FirmFragment.graphql";
import Button from "../../../../components/v2/Button";
import Link from "../../../../components/v2/Link";

interface FirmSectionProps {
  firmFragmentRef: FirmSection_FirmFragment$key;
}

const FirmSection = ({ firmFragmentRef }: FirmSectionProps) => {
  const firm = useFragment(
    graphql`
      fragment FirmSection_FirmFragment on Firm {
        title
        contactPerson
        fullAddress
        country
        region
        city
        street
        houseNumber
        status
      }
    `,
    firmFragmentRef
  );

  return (
    <Section>
      <Grid xs={10}>
        <Typography level="h3">{firm.title.toUpperCase()}</Typography>
      </Grid>
      <Grid xs={2}>
        <Stack direction="row" justifyContent="flex-end">
          <Link href="/my-firm" underline={false} sx={{ marginRight: "10px" }}>
            <Button size="sm" variant="outlined">
              View
            </Button>
          </Link>
          <Link href="/my-firm/edit" underline={false}>
            <Button size="sm">Edit</Button>
          </Link>
        </Stack>
      </Grid>
      <Grid xs={12}>{firm.contactPerson}</Grid>
      <Grid xs={12}>{firm.fullAddress}</Grid>
      <Grid xs={12}>
        {firm.country} {firm.region} {firm.city} {firm.street}{" "}
        {firm.houseNumber}
      </Grid>
    </Section>
  );
};

export default React.memo(FirmSection);
