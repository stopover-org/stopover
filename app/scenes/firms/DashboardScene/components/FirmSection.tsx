import { Grid, Stack } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Section from "../../../../components/v2/Section";
import Typography from "../../../../components/v2/Typography";
import { FirmSection_FirmFragment$key } from "../../../../artifacts/FirmSection_FirmFragment.graphql";
import Button from "../../../../components/v2/Button";
import Link from "../../../../components/v2/Link";
import Tag from "../../../../components/v2/Tag/Tag";
import VerifyFirm from "../../../../components/shared/VerifyFirm";
import { FirmSection_CurrentUserFragment$key } from "../../../../artifacts/FirmSection_CurrentUserFragment.graphql";
import useStatusColor from "../../../../lib/hooks/useStatusColor";

interface FirmSectionProps {
  firmFragmentRef: FirmSection_FirmFragment$key;
  currentUserFragmentRef: FirmSection_CurrentUserFragment$key;
}

const FirmSection = ({
  firmFragmentRef,
  currentUserFragmentRef,
}: FirmSectionProps) => {
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

  const currentUser = useFragment(
    graphql`
      fragment FirmSection_CurrentUserFragment on User {
        serviceUser
      }
    `,
    currentUserFragmentRef
  );

  const tagColor = useStatusColor({
    primary: ["active"],
    danger: ["removed"],
    info: ["pending"],
    status: firm.status,
  });

  return (
    <Section>
      <Grid xs={10}>
        <Typography level="h3" sx={{ display: "inline" }}>
          {firm.title.toUpperCase()}
        </Typography>
        <Tag href="#" color={tagColor}>
          {firm.status}
        </Tag>
      </Grid>
      <Grid xs={2}>
        <Stack direction="row" justifyContent="flex-end">
          <Link href="/my-firm" underline={false} sx={{ marginRight: "10px" }}>
            <Button size="sm" variant="outlined">
              View
            </Button>
          </Link>
          <Link
            href="/my-firm/edit"
            underline={false}
            sx={{ marginRight: "10px" }}
          >
            <Button size="sm">Edit</Button>
          </Link>
          {currentUser.serviceUser && firm.status === "pending" && (
            <VerifyFirm />
          )}
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
