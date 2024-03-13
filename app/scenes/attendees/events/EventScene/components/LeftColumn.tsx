import React from "react";
import { graphql, useFragment } from "react-relay";
import { Box, useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import Gallery from "components/v2/Gallery";
import { LeftColumn_EventFragment$key } from "artifacts/LeftColumn_EventFragment.graphql";

interface LeftColumnProps {
  eventFragmentRef: LeftColumn_EventFragment$key;
}

const LeftColumn = ({ eventFragmentRef }: LeftColumnProps) => {
  const event = useFragment(
    graphql`
      fragment LeftColumn_EventFragment on Event {
        images
      }
    `,
    eventFragmentRef
  );

  const images = React.useMemo(
    () => event.images.map((src: string) => ({ src })),
    [event]
  );
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <Gallery
        images={images}
        width="100%"
        numberInRow={isMobileView || images.length < 4 ? 1 : 2}
      />
    </Box>
  );
};

export default React.memo(LeftColumn);
