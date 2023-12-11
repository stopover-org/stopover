import { graphql, useFragment } from "react-relay";
import React from "react";
import { Grid } from "@mui/joy";
import { FirmScene_CurrentFirmFragment$key } from "../../../../artifacts/FirmScene_CurrentFirmFragment.graphql";
import Typography from "../../../../components/v2/Typography/Typography";
import Description from "../../../../components/v2/Description/Description";

interface Props {
  firmFragmentRef: FirmScene_CurrentFirmFragment$key;
}

export const FirmScene = ({ firmFragmentRef }: Props) => {
  const firm = useFragment<FirmScene_CurrentFirmFragment$key>(
    graphql`
      fragment FirmScene_CurrentFirmFragment on Firm {
        id
        title
        description
        image
        fullAddress
        country
        city
        street
        houseNumber
        events {
          edges {
            node {
              id
              title
              images
              attendeePricePerUom {
                cents
                currency {
                  name
                }
              }
            }
          }
        }
      }
    `,
    firmFragmentRef
  );

  return (
    <Grid container padding={2} spacing={2} sm={12} md={12}>
      <Grid lg={12} sm={12}>
        <Typography level="h3">{firm.title}</Typography>
        <Typography>{firm.fullAddress}</Typography>
      </Grid>
      <Grid lg={3} md={3} sm={12} xs={12}>
        {firm.image && (
          <img width="100%" src={firm.image} alt={`${firm.title}-logo`} />
        )}
      </Grid>
      <Grid lg={9} md={9} sm={12} xs={12}>
        {firm.description && <Description html={firm.description} />}
      </Grid>
    </Grid>
  );
};

export default React.memo(FirmScene);
