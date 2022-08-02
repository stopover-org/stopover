import React from "react";
import { StarUnchecked, StarChecked } from "./StarsIcons";

type Props = {
  index: number;
  rate: number;
  clickHandler: (index: number) => void;
};

function RateStar(props: Props) {
  return (
    <div
      onClick={() => {
        props.clickHandler(props.index + 1);
      }}
    >
      {props.rate < props.index + 1 ? (
        <StarUnchecked color="black" />
      ) : (
        <StarChecked color="#ff8a00" />
      )}
    </div>
  );
}
export default RateStar;
