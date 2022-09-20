import React from "react";
import styled from "styled-components";
import solidStar from "../icons/Solid/Status/Star.svg";
import outlinedStar from "../icons/Outline/Status/Star.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AverageRatingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StarsWrapper = styled.div`
  background-color: transparent;
  padding: 0px 6px 0px 0px;
  overflow: hidden;
`;

const RateBackground = styled.div<{ position: number }>`
  position: relative;
  width: 124px;
  height: 25px;
  right: -${(props) => props.position}%;
  background-color: white;
  z-index: 1;
`;

const SolidStarsStyle = styled.div`
  position: absolute;
  z-index: 0;
  img {
    width: 25px;
    height: 25px;
  }
`;

const OutlineStarsStyle = styled.div`
  position: absolute;
  z-index: 2;
  img {
    width: 25px;
    height: 25px;
  }
`;

const NumbericValueWrapper = styled.div``;

const NumericValue = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;

type Props = {
  averageRating?: number;
};

const AverageRating = (props: Props) => {
  const { averageRating } = props;

  const calculatePositon = (maxRate: number, averageRate: number) =>
    Math.round((averageRate / maxRate) * 100);

  return (
    <Wrapper>
      <AverageRatingWrapper>
        <StarsWrapper>
          <SolidStarsStyle>
            {new Array(5).fill("").map((item, index) => (
              <img key={index} src={solidStar.src} alt="solidStar" />
            ))}
          </SolidStarsStyle>
          <OutlineStarsStyle>
            {new Array(5).fill("").map((item, index) => (
              <img key={index} src={outlinedStar.src} alt="outlinedStar" />
            ))}
          </OutlineStarsStyle>
          <RateBackground position={calculatePositon(5, averageRating || 0)} />
        </StarsWrapper>
        <NumbericValueWrapper>
          <NumericValue>{averageRating}</NumericValue>
        </NumbericValueWrapper>
      </AverageRatingWrapper>
    </Wrapper>
  );
};

export default AverageRating;
