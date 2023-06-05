import React from "react";
import { Card, Grid, Sheet, TabPanel } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { GeneralInformation_EventFragment$key } from "./__generated__/GeneralInformation_EventFragment.graphql";

interface GeneralInformationProps {
  eventFragmentRef: GeneralInformation_EventFragment$key;
  index: number;
}
const GeneralInformation = ({
  eventFragmentRef,
  index,
}: GeneralInformationProps) => {
  const event = useFragment(
    graphql`
      fragment GeneralInformation_EventFragment on Event {
        id
      }
    `,
    eventFragmentRef
  );
  return (
    <TabPanel value={index} size="sm" sx={{ p: 2 }}>
      <Sheet>
        <Card sx={{ width: "100%" }}>
          <Grid container xs={12}>
            <Grid xs={6}>Column 1</Grid>
            <Grid xs={6}>Column 2</Grid>
          </Grid>
        </Card>
      </Sheet>
    </TabPanel>
  );
};
export default React.memo(GeneralInformation);
