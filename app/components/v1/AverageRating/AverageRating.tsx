import React from "react";
import styled from "styled-components";
import solidStar from "../../icons/Solid/Status/Star.svg";
import outlinedStar from "../../icons/Outline/Status/Star.svg";

const StarsWrapper = styled.div<{ width: number }>`
  position: relative;
  width: ${(props) => props.width}px;
`;

const SolidStarsStyle = styled.div<{ width: number }>`
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: ${(props) => props.width}%;
  z-index: 2;

  img {
    width: 25px;
    height: 25px;
    margin-right: 0.5px;
    margin-left: 0.5px;
  }
`;

const OutlineStarsStyle = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;

  img {
    width: 25px;
    height: 25px;
  }
`;

type Props = {
  averageRating?: number;
  countOfStars?: number;
};

const AverageRating = ({ averageRating = 0, countOfStars = 5 }: Props) => {
  const calculatePositon = (maxRate: number, averageRate: number) =>
    Math.round((averageRate / maxRate) * 100);

  return (
    <StarsWrapper width={countOfStars * 25}>
      <SolidStarsStyle width={calculatePositon(countOfStars, averageRating)}>
        {new Array(countOfStars).fill("").map((_, index) => (
          <img key={index} src={solidStar.src} alt="solidStar" />
        ))}
      </SolidStarsStyle>
      <OutlineStarsStyle>
        {new Array(countOfStars).fill("").map((_, index) => (
          <img key={index} src={outlinedStar.src} alt="outlinedStar" />
        ))}
      </OutlineStarsStyle>
    </StarsWrapper>
  );
};

export default AverageRating;
