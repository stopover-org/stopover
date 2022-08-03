import React from "react";
import StarUnchecked from "../../../icons/Outline/Status/Star.svg";
import StarChecked from "../../../icons/Solid/Status/Star.svg";

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
        <img alt="Unchecked star" src={StarUnchecked.src} />
      ) : (
        <img alt="Checked star" src={StarChecked.src} />
      )}
    </div>
  );
}
export default RateStar;
