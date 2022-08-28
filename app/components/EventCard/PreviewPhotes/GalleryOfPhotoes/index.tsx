import React, { useRef, useState } from "react";
import styled from "styled-components";
import ItemGallery from "./ItemGallery";
import { imageArray } from "../../../constants";
import RightLeftButton from "./RightLeftButton";

const Wrapper = styled.div`
  position: absolute;
  bottom: 0px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #000000bd;
  height: 100%;
  z-index: 99999;
  .right-left-button-wrapper {
    padding-left: 35px;
    padding-right: 35px;
  }
`;
const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
const MainImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  align-items: center;
`;
const CarouselWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 35px 12px 35px;
`;
const MainImage = styled.img`
  max-width: 1200px;
  min-width: 500px;
  max-height: 678px;
  min-height: 100px;
`;
const Carousel = styled.div<{ width: number }>`
  overflow-x: scroll;
  width: ${(props) => props.width}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: relative;
  transition: left 1s ease;
`;
const Close = styled.div`
  width: 25px;
  height: 25px;
  background-color: red;
  position: absolute;
  right: 0px;
`;

type Props = {
  onClick?: () => void;
};

function GalleryOfPhotoes({ onClick }: Props) {
  const [indexOfCurrentImage, setIndexOfCurrentImage] = useState<number>(0);

  const imageWidth = 155;
  const carouselWidth = imageArray.length * imageWidth;
  const carouselRef = useRef<HTMLDivElement>(null);
  const onClickChoose = (id: string) => {
    setIndexOfCurrentImage(imageArray.findIndex((item) => item.id === id));
  };
  const onClickSlide = (buttonDirection: string) => {
    if (buttonDirection === "left" && indexOfCurrentImage > 0)
      setIndexOfCurrentImage(indexOfCurrentImage - 1);
    if (
      buttonDirection === "right" &&
      indexOfCurrentImage < imageArray.length - 1
    )
      setIndexOfCurrentImage(indexOfCurrentImage + 1);
  };
  return (
    <Wrapper>
      <Close onClick={onClick} />
      <Gallery>
        <MainImageWrapper>
          <RightLeftButton
            buttonDirection="left"
            onClick={onClickSlide}
            active={!(indexOfCurrentImage === 0)}
          />
          <MainImage src={imageArray[indexOfCurrentImage].image} />
          <RightLeftButton
            buttonDirection="right"
            onClick={onClickSlide}
            active={!(indexOfCurrentImage === imageArray.length - 1)}
          />
        </MainImageWrapper>
        <CarouselWrapper ref={carouselRef}>
          <Carousel width={carouselWidth}>
            {imageArray.map((item, index) => (
              <ItemGallery
                image={item.image}
                description={item.description}
                id={item.id}
                key={index}
                chosen={!!(imageArray[indexOfCurrentImage].id === item.id)}
                onClickChoose={onClickChoose}
              />
            ))}
          </Carousel>
        </CarouselWrapper>
      </Gallery>
    </Wrapper>
  );
}

export default GalleryOfPhotoes;
