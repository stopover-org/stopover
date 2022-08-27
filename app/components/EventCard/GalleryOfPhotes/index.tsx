import React, { useRef, useState } from "react";
import styled from "styled-components";
import ItemGallery from "./ItemGallery";
import { imageArray } from "../../constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 3px solid red;
`;
const CarouselContainer = styled.div`
  border: 1px solid black;
  overflow: scroll;
`;
const MainImage = styled.img`
  width: 500px;
  height: 500px;
`;
const Carousel = styled.div<{ width: number }>`
  border: 4px solid green;
  width: ${(props) => props.width}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: relative;
  transition: left 1s ease;
`;

function GalleryOfPhotes() {
  const [imageState, setImageState] = useState<number>(0);

  const imageWidth = 155;
  const carouselWidth = imageArray.length * imageWidth;
  const carouselRef = useRef<HTMLDivElement>(null);
  const onClickChoose = (id: string) => {
    setImageState(imageArray.findIndex((item) => item.id === id));
  };
  return (
    <Wrapper>
      <MainImage src={imageArray[imageState].image} />
      <CarouselContainer ref={carouselRef}>
        <Carousel width={carouselWidth}>
          {imageArray.map((item, index) => (
            <ItemGallery
              image={item.image}
              description={item.description}
              id={item.id}
              key={index}
              onClickChoose={onClickChoose}
            />
          ))}
        </Carousel>
      </CarouselContainer>
    </Wrapper>
  );
}

export default GalleryOfPhotes;
