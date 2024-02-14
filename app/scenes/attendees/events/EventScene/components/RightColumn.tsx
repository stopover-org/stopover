import { graphql, useFragment } from "react-relay";
import { Box, Divider, Stack } from "@mui/joy";
import React from "react";
import { RightColumn_EventFragment$key } from "artifacts/RightColumn_EventFragment.graphql";
import Description from "components/v2/Description";
import GoogleMap from "components/shared/GoogleMap/GoogleMap";
import Typography from "components/v2/Typography";
import BookEvent from "./BookEvent";

interface RightColumnProps {
  eventFragmentRef: RightColumn_EventFragment$key;
}

const RightColumn = ({ eventFragmentRef }: RightColumnProps) => {
  const event = useFragment(
    graphql`
      fragment RightColumn_EventFragment on Event {
        title
        description
        address {
          fullAddress
          latitude
          longitude
        }
        ...BookEvent_EventFragment
      }
    `,
    eventFragmentRef
  );
  return (
    <Stack sx={{ position: "sticky", top: "0", right: "0" }}>
      <Box>
        <Description html={event.description} />
      </Box>
      <Box>
        {event.address && (
          <>
            <Typography fontSize="lg-title">
              {event.address?.fullAddress}
            </Typography>
            {event.address?.latitude && event.address?.longitude && (
              <>
                <Divider margin={2} />
                <GoogleMap
                  center={{
                    lat: event.address?.latitude!,
                    lng: event.address?.longitude!,
                  }}
                  markers={[
                    {
                      lat: event.address?.latitude!,
                      lng: event.address?.longitude!,
                    },
                  ]}
                />
              </>
            )}
          </>
        )}
      </Box>
      <Box>
        <BookEvent eventFragmentRef={event} />
      </Box>
    </Stack>
  );
};

export default React.memo(RightColumn);
