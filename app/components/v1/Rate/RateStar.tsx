import React from "react";
import StarUnchecked from "../../icons/Outline/Status/Star.svg";
import StarChecked from "../../icons/Solid/Status/Star.svg";

type Props = {
  selected: boolean;
  onClick: () => void;
};

const RateStar = ({ selected, onClick }: Props) => {
  const showStar = () =>
    selected ? (
      <img alt="Checked star" src={StarChecked.src} />
    ) : (
      <img alt="Unchecked star" src={StarUnchecked.src} />
    );

  return <div onClick={onClick}>{showStar()}</div>;
};

export default RateStar;
