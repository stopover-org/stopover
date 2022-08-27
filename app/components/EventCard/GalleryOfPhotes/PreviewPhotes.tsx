import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const Cards = styled.div`
  display: flex;
  flex-direction: row;
  .big-card-wrapper {
    padding-right: 6px;
  }
  .small-card-wrapper-top {
    padding-left: 6px;
    padding-bottom: 6px;
  }
  .small-card-wrapper-bottom {
    padding-top: 6px;
    padding-left: 6px;
  }
`;
const CardWrapper = styled.div<{ height: string }>`
  height: ${(props) => props.height};
`;
const RatioWidth = styled.div<{ width: string }>`
  max-width: ${(props) => props.width};
  width: ${(props) => props.width};
`;
const Card = styled.div<{ height: string }>`
  position: relative;
  height: ${(props) => props.height};
  cursor: pointer;
  overflow: hidden;
`;
const Image = styled.img`
  display: block;
  position: absolute;
  width: 100%;
  min-width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function PreviewPhotes() {
  const bigCardRatio = 0.6;
  const smallCardRatio = 0.4;
  const smallCardHeight = "50%";
  const image =
    "https://i.pinimg.com/564x/eb/a1/38/eba138faec79b8bd2629e99ad2612047.jpg";

  return (
    <Wrapper>
      <Cards>
        <RatioWidth width={`calc(${bigCardRatio}*100vw)`}>
          <CardWrapper height="100%" className="big-card-wrapper">
            <Card height={`calc(${bigCardRatio}*100vw / 1.6)`}>
              <Image src={image} />
            </Card>
          </CardWrapper>
        </RatioWidth>

        <RatioWidth width={`calc(${smallCardRatio}*100vw)`}>
          <CardWrapper
            height={smallCardHeight}
            className="small-card-wrapper-top"
          >
            <Card height="100%">
              <Image src={image} />
            </Card>
          </CardWrapper>

          <CardWrapper
            height={smallCardHeight}
            className="small-card-wrapper-bottom"
          >
            <Card height="100%">
              <Image src={image} />
            </Card>
          </CardWrapper>
        </RatioWidth>
      </Cards>
    </Wrapper>
  );
}

export default PreviewPhotes;
