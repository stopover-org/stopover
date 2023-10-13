import React from "react";
import { graphql, useFragment } from "react-relay";
import { Box, Chip, Divider, Grid, Stack, useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
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
import ImagesPreview from "../../../components/shared/ImagesPreview";

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
    danger: ["removed"],
    info: ["pending"],
    status: firm.status,
  });
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const textAlign = React.useMemo(
    () => (isMobileView ? "end" : "start"),
    [isMobileView]
  );

  return (
    <Box>
      <Breadcrumbs items={[t("layout.header.myFirm")]} />
      <Grid container spacing={2} xs={12} md={12} lg={8}>
        <Fieldset>
          <Grid xs={12}>
            <Typography level="h3" sx={{ display: "inline" }}>
              {firm.title}
            </Typography>
            <Tag link={false} color={tagColor}>
              {firm.status}
            </Tag>
            <Divider sx={{ margin: "5px" }} />
          </Grid>
          <Grid md={2} xs={12}>
            <Typography level="title-lg">
              {t("models.firm.attributes.contactPerson")}:&nbsp;
            </Typography>
          </Grid>
          <Grid md={4} xs={12}>
            <Typography>{firm.contactPerson}</Typography>
          </Grid>
          <Grid xs={12}>
            {firm.image && (
              <ImagesPreview images={[firm.image]} width={250} readonly />
            )}
          </Grid>
        </Fieldset>

        <Fieldset>
          <Grid xs={12}>
            <Typography level="h3">{t("address.title")}</Typography>
            <Divider sx={{ margin: "5px" }} />
          </Grid>
          <Grid md={2} xs={12}>
            <Typography level="title-lg">
              {t("address.country")}:&nbsp;
            </Typography>
          </Grid>
          <Grid md={4} xs={12}>
            <Typography textAlign={textAlign}>{firm.country}</Typography>
          </Grid>
          <Grid md={2} xs={12}>
            <Typography level="title-lg">
              {t("address.region")}:&nbsp;
            </Typography>
          </Grid>
          <Grid md={4} xs={12}>
            <Typography textAlign={textAlign}>{firm.region}</Typography>
          </Grid>
          <Grid md={2} xs={12}>
            <Typography level="title-lg">{t("address.city")}:&nbsp;</Typography>
          </Grid>
          <Grid md={4} xs={12}>
            <Typography textAlign={textAlign}>{firm.city}</Typography>
          </Grid>
          <Grid md={2} xs={12}>
            <Typography level="title-lg">
              {t("address.street")}:&nbsp;
            </Typography>
          </Grid>
          <Grid md={4} xs={12}>
            <Typography textAlign={textAlign}>{firm.street}</Typography>
          </Grid>
          <Grid md={2} xs={12}>
            <Typography level="title-lg">
              {t("address.houseNumber")}:&nbsp;
            </Typography>
          </Grid>
          <Grid md={4} xs={12}>
            <Typography textAlign={textAlign}>{firm.houseNumber}</Typography>
          </Grid>
          <Grid md={2} xs={12}>
            <Typography level="title-lg">
              {t("address.fullAddress")}:&nbsp;
            </Typography>
          </Grid>
          <Grid md={4} xs={12}>
            <Typography textAlign={textAlign}>{firm.fullAddress}</Typography>
          </Grid>
        </Fieldset>

        <Fieldset>
          <Grid xs={12}>
            <Typography level="h3">
              {t("forms.editFirm.paymentInformation")}
            </Typography>
            <Divider sx={{ margin: "5px" }} />
          </Grid>
          <Grid md={6} xs={12}>
            {firm.paymentTypes.map((type) => (
              <Chip sx={{ marginRight: "5px" }}>
                {capitalize(t(`models.firm.enums.paymentTypes.${type}`))}
              </Chip>
            ))}
          </Grid>
        </Fieldset>

        <Fieldset>
          <Grid xs={12}>
            <Typography level="h3">
              {t("forms.editFirm.contactInformation")}
            </Typography>
            <Divider sx={{ margin: "5px" }} />
          </Grid>
          <Grid md={2} xs={12}>
            <Typography level="title-lg">
              {t("models.firm.attributes.primaryEmail")}:&nbsp;
            </Typography>
          </Grid>
          <Grid md={4} xs={12}>
            <Typography textAlign={textAlign}>{firm.primaryEmail}</Typography>
          </Grid>
          <Grid md={2} xs={12}>
            <Typography level="title-lg">
              {t("models.firm.attributes.primaryPhone")}:&nbsp;
            </Typography>
          </Grid>
          <Grid md={4} xs={12}>
            <Typography textAlign={textAlign}>{firm.primaryPhone}</Typography>
          </Grid>
          <Grid md={2} xs={12}>
            <Typography level="title-lg">
              {t("models.firm.attributes.contacts")}:
            </Typography>
          </Grid>
          <Grid md={10} xs={12}>
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
          <Grid md={2} xs={12}>
            <Typography level="title-lg">
              {t("models.firm.attributes.website")}:&nbsp;
            </Typography>
          </Grid>
          <Grid md={4} xs={12}>
            <Typography textAlign={textAlign}>{firm.website}</Typography>
          </Grid>
        </Fieldset>
        <Fieldset>
          <Grid xs={12}>
            <Typography level="title-lg">
              {t("models.firm.attributes.description")}&nbsp;
            </Typography>
            <Divider sx={{ margin: "5px" }} />
          </Grid>
          <Grid xs={12}>
            <Typography>{firm.description}</Typography>
          </Grid>
        </Fieldset>

        <Fieldset>
          <Grid xs={12}>
            <Stack
              flexDirection={{ sm: "column", md: "row" }}
              justifyContent="flex-start"
              spacing={1}
              useFlexGap
            >
              {firm.status !== "removed" && (
                <Link href="/my-firm/edit" underline={false}>
                  <Button color="primary" size="sm" sx={{ marginRight: 1 }}>
                    {t("general.edit")}
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
