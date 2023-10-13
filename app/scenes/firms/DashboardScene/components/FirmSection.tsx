import { Grid, Stack, useTheme } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import Section from "../../../../components/v2/Section";
import Typography from "../../../../components/v2/Typography";
import { FirmSection_FirmFragment$key } from "../../../../artifacts/FirmSection_FirmFragment.graphql";
import Button from "../../../../components/v2/Button";
import Link from "../../../../components/v2/Link";
import Tag from "../../../../components/v2/Tag";
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
  const { t } = useTranslation();
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
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
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
      <Grid md={10} sm={12}>
        <Typography level="h3" sx={{ display: "inline" }}>
          {firm.title.toUpperCase()}
        </Typography>
        <Tag link={false} color={tagColor}>
          {t(`statuses.${firm.status?.toLowerCase()}`)}
        </Tag>
      </Grid>
      <Grid md={2} sm={12}>
        <Stack
          direction={{ sm: "column", md: "row" }}
          justifyContent="flex-end"
          spacing={1}
          useFlexGap
        >
          <Link href="/my-firm" underline={false} sx={{ paddingBottom: "5px" }}>
            <Button size="sm" variant="outlined">
              {t("scenes.firms.dashboardScene.view")}
            </Button>
          </Link>
          <Link
            href="/my-firm/edit"
            underline={false}
            sx={{ paddingBottom: "5px" }}
          >
            <Button size="sm">{t("general.edit")}</Button>
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
