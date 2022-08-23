import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const Cards = styled.div`
  display: flex;
  flex-direction: row;
`;
const RatioWidth = styled.div<{ width: string }>`
  max-width: ${(props) => props.width};
  width: ${(props) => props.width};
`;
const Card = styled.div<{ height: string }>`
  position: relative;
  height: ${(props) => props.height};
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

function GalleryOfPhotoes() {
  const bigCardRatio = 0.6;
  const smallCardRatio = 0.4;
  const smallCardHeight = "50%";
  const image =
    "https://i.pinimg.com/564x/eb/a1/38/eba138faec79b8bd2629e99ad2612047.jpg";

  return (
    <Wrapper>
      <Cards>
        <RatioWidth width={`calc(${bigCardRatio}*100vw)`}>
          <Card height={`calc(${bigCardRatio}*100vw / 1.6)`}>
            <Image src={image} />
          </Card>
        </RatioWidth>

        <RatioWidth width={`calc(${smallCardRatio}*100vw)`}>
          <Card height={smallCardHeight}>
            <Image src={image} />
          </Card>
          <Card height={smallCardHeight}>
            <Image src={image} />
          </Card>
        </RatioWidth>
      </Cards>
    </Wrapper>
  );
}

export default GalleryOfPhotoes;
