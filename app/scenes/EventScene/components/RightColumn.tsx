import React from "react";
import { graphql, useFragment } from "react-relay";
import Gallery from "../../../components/v2/Gallery";
import { RightColumn_EventFragment$key } from "./__generated__/RightColumn_EventFragment.graphql";

interface RightColumnProps {
  eventFragmentRef: RightColumn_EventFragment$key;
}

const RightColumn = ({ eventFragmentRef }: RightColumnProps) => {
  const event = useFragment(
    graphql`
      fragment RightColumn_EventFragment on Event {
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

export default React.memo(RightColumn);
