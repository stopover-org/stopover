import { Box, Divider, Grid, Stack } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import Section from "components/v2/Section";
import Typography from "components/v2/Typography";
import { FirmSection_FirmFragment$key } from "artifacts/FirmSection_FirmFragment.graphql";
import Button from "components/v2/Button";
import Link from "components/v2/Link";
import Tag from "components/v2/Tag";
import VerifyFirm from "components/shared/forms/firm/VerifyFirm";
import { FirmSection_CurrentUserFragment$key } from "artifacts/FirmSection_CurrentUserFragment.graphql";
import useStatusColor from "lib/hooks/useStatusColor";
import EditFirmAddress from "components/shared/EditFirmAddress";
import GoogleMap from "components/shared/GoogleMap";
import ResetOnboardingFirm from "components/shared/forms/firm/ResetOnboardingFirm";
import EditSeoMetadataFirm from "components/shared/forms/EditSeoMetadata";

interface FirmSectionProps {
  firmFragmentRef: FirmSection_FirmFragment$key;
  currentUserFragmentRef: FirmSection_CurrentUserFragment$key;
}

const FirmSection = ({
  firmFragmentRef,
  currentUserFragmentRef,
}: FirmSectionProps) => {
  const { t } = useTranslation();
  const firm = useFragment<FirmSection_FirmFragment$key>(
    graphql`
      fragment FirmSection_FirmFragment on Firm {
        id
        title
        contactPerson
        status
        firmType
        ...ResetOnboardingFirm_FirmFragment
        address {
          ...EditFirmAddress_AddressFragment
          fullAddress
          country
          region
          city
          street
          houseNumber
          latitude
          longitude
        }
        seoMetadatum {
          ...EditSeoMetadata_MetadataFragment
        }
      }
    `,
    firmFragmentRef
  );

  const currentUser = useFragment<FirmSection_CurrentUserFragment$key>(
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
    status: firm.status!,
  });

  return (
    <Section>
      <Grid xs={12} sm={12} md={12} lg={10} paddingBottom={2}>
        {firm.status === "active" ? (
          <Link
            level="h3"
            sx={{ display: "inline" }}
            target="_blank"
            href={`/firms/${firm.id}`}
            color="primary"
          >
            {firm.title.toUpperCase()}
          </Link>
        ) : (
          <Typography level="h3" color="primary">
            {firm.title.toUpperCase()}
          </Typography>
        )}
        <Tag link={false} color={tagColor}>
          {t(`statuses.${firm.status?.toLowerCase()}`)}
        </Tag>
        {currentUser.serviceUser && (
          <Tag link={false} color="neutral">
            {t(`models.firm.enums.firmTypes.${firm.firmType?.toLowerCase()}`)}
          </Tag>
        )}
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={2}>
        <Stack
          direction={{ sm: "row", md: "row" }}
          justifyContent={{
            lg: "flex-end",
            sm: "flex-start",
            sx: "flex-start",
            md: "flex-start",
          }}
          spacing={1}
          useFlexGap
        >
          <Link href="/my-firm" underline={false} sx={{ paddingBottom: "5px" }}>
            <Button size="sm">{t("scenes.firms.dashboardScene.view")}</Button>
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
          {currentUser.serviceUser && (
            <EditSeoMetadataFirm
              seoMetadatumFragmentRef={firm.seoMetadatum!}
              menuItem={false}
            />
          )}
          {currentUser.serviceUser && firm.firmType === "onboarding" && (
            <ResetOnboardingFirm firmFragmentRef={firm} />
          )}
        </Stack>
      </Grid>
      <Grid xs={12}>{firm.contactPerson}</Grid>
      <Grid xs={12} padding={0} margin={0}>
        <Section variant="soft" color="primary" margin={0} padding={0}>
          {t(`models.firm.statusExplanations.${firm.status}`, {
            returnObjects: true,
            email: "mikhail@stopoverx.com",
          }).map((translation: string) => (
            <Typography
              fontSize="sm"
              level="body-sm"
              sx={{ width: "100%" }}
              key={translation}
            >
              {translation}{" "}
            </Typography>
          ))}
        </Section>
      </Grid>

      <Grid xs={12}>
        <Divider sx={{ margin: 2 }} />
      </Grid>

      <Grid xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography level="h4">Address</Typography>
          <Box>
            <EditFirmAddress addressFragmentRef={firm.address!} />
          </Box>
        </Stack>
      </Grid>
      <Grid xs={12}>{firm.address?.fullAddress || t("general.noData")}</Grid>
      <Grid xs={12}>
        {firm.address?.country} {firm.address?.region} {firm.address?.city}{" "}
        {firm.address?.street} {firm.address?.houseNumber}
      </Grid>
      {firm.address?.latitude && firm.address?.longitude && (
        <Grid xs={12}>
          <GoogleMap
            center={{
              lat: firm.address?.latitude!,
              lng: firm.address?.longitude!,
            }}
            markers={[
              {
                lat: firm.address?.latitude!,
                lng: firm.address?.longitude!,
              },
            ]}
          />
        </Grid>
      )}
    </Section>
  );
};

export default React.memo(FirmSection);
