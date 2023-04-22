import React from "react";
import { graphql, useFragment } from "react-relay";
import Gallery from "../../../components/v2/Gallery";
import { LeftColumn_EventFragment$key } from "./__generated__/LeftColumn_EventFragment.graphql";

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
  return <Gallery images={images} width="100%" minHeight="600px" />;
};

export default React.memo(LeftColumn);
