import React from "react";
import StarUnchecked from "../../icons/Outline/Status/Star.svg";
import StarChecked from "../../icons/Solid/Status/Star.svg";

type Props = {
  index: number;
  selectedRate: number;
  shownRate: number | null;
  onClick: (index: number) => void;
  showRate: (index: number | null) => void;
};

function RateStar(props: Props) {
  const showStar = () => {
    if (props.shownRate === null || props.shownRate === undefined) {
      return props.selectedRate < props.index + 1 ? (
        <img alt="Unchecked star" src={StarUnchecked.src} />
      ) : (
        <img alt="Checked star" src={StarChecked.src} />
      );
    }
    return props.shownRate < props.index + 1 ? (
      <img alt="Unchecked star" src={StarUnchecked.src} />
    ) : (
      <img alt="Checked star" src={StarChecked.src} />
    );
  };
  return (
    <div
      onClick={() => {
        props.onClick(props.index + 1);
      }}
      onMouseOver={() => {
        props.showRate(props.index + 1);
      }}
      onMouseLeave={() => {
        props.showRate(null);
      }}
      onFocus={() => {
        props.showRate(null);
      }}
    >
      {showStar()}
    </div>
  );
}
export default RateStar;
