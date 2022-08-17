import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 6px 0px 6px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const RatingSystemWrapper = styled.div`
  padding: 0px 6px 0px 0px;
`;
const RatingSystem = styled.div`
  background-color: green;
  width: 147px;
  height: 25px;
  overflow: hidden;
`;
const RateBackground = styled.div<{ position: number }>`
  position: relative;
  top: 0px;
  left: -${(props) => props.position}%;
  background-color: orange;
  width: inherit;
  height: inherit;
`;
const TagsWrapper = styled.div`
  padding: 0px 6px 0px 6px;
`;
const Tags = styled.div`
  background-color: #c2e0fe;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  padding: 6px;
`;
const Description = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
`;
const Image = styled.img`
  background-color: blue;
  width: 25px;
  height: 25px;
`;

function Rating() {
  const calculatePositon = (maxRate: number, averageRate: number) =>
    Math.round(100 - (averageRate / maxRate) * 100);
  return (
    <Wrapper>
      <RatingSystemWrapper>
        <RatingSystem>
          <RateBackground position={calculatePositon(5, 4.5)} />
        </RatingSystem>
      </RatingSystemWrapper>
      <TagsWrapper>
        <Tags>
          <Image />
          <Description>Great for two traveles</Description>
        </Tags>
      </TagsWrapper>
      <TagsWrapper>
        <Tags>
          <Image />
          <Description>Great for vegans</Description>
        </Tags>
      </TagsWrapper>
    </Wrapper>
  );
}

export default Rating;
