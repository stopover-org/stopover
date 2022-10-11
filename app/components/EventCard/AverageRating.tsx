import React from "react";
import styled from "styled-components";
import solidStar from "../icons/Solid/Status/Star.svg";
import outlinedStar from "../icons/Outline/Status/Star.svg";
import Typography from "../Typography";
import { TypographySize, TypographyTags } from "../StatesEnum";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

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

const NumbericValueWrapper = styled.div`
  padding-left: 12px;
`;

type Props = {
  averageRating?: number;
  countOfStars?: number;
};

const AverageRating = ({ averageRating = 0, countOfStars = 5 }: Props) => {
  const calculatePositon = (maxRate: number, averageRate: number) =>
    Math.round((averageRate / maxRate) * 100);

  return (
    <Wrapper>
      <StarsWrapper width={countOfStars * 25 + 2}>
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
      <NumbericValueWrapper>
        <Typography
          size={TypographySize.H5}
          as={TypographyTags.H5}
          fontWeight="400"
        >
          {averageRating}
        </Typography>
      </NumbericValueWrapper>
    </Wrapper>
  );
};

export default AverageRating;
/*
<StarsWrapper>
          <SolidStarsStyle>
            {new Array(5).fill("").map((_, index) => (
              <img key={index} src={solidStar.src} alt="solidStar" />
            ))}
          </SolidStarsStyle>
          <OutlineStarsStyle>
            {new Array(5).fill("").map((_, index) => (
              <img key={index} src={outlinedStar.src} alt="outlinedStar" />
            ))}
          </OutlineStarsStyle>
          <RateBackground position={calculatePositon(5, averageRating || 0)} />
        </StarsWrapper>
        
        <NumbericValueWrapper>
          <NumericValue>{averageRating}</NumericValue>
        </NumbericValueWrapper>

*/
