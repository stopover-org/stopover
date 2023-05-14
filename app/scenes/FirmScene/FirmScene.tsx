import React from "react";
import { graphql, useFragment } from "react-relay";
import { FirmScene_FirmFragment$key } from "./__generated__/FirmScene_FirmFragment.graphql";

interface FirmSceneProps {
  firmFragmentRef: FirmScene_FirmFragment$key;
}
const FirmScene = ({ firmFragmentRef }: FirmSceneProps) => {
  const firm = useFragment(
    graphql`
      fragment FirmScene_FirmFragment on Firm {
        title
      }
    `,
    firmFragmentRef
  );

  console.log(firm);
  return <div>{firm.title}</div>;
};

export default React.memo(FirmScene);
