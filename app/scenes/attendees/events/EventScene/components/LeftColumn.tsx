import React from "react";
import { graphql, useFragment } from "react-relay";
import Gallery from "../../../../../components/v2/Gallery";
import { LeftColumn_EventFragment$key } from "../../../../../artifacts/LeftColumn_EventFragment.graphql";
import { useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";

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

  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'))
  return <Gallery images={images} width="100%" numberInRow={isMobileView || images.length <= 4 ? 1 : 2 } />;
};

export default React.memo(LeftColumn);
