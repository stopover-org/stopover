import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ItemGallery from "./ItemGallery";
import ButtonGallery from "./ButtonGallery";
import { imageArray } from "../../constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 1000px;
  height: 180px;
`;

const CarouselContainer = styled.div`
  width: inherit;
  height: inherit;
  overflow: hidden;
  position: absolute;
`;

const Carousel = styled.div<{ width: number; moveTo: number | string }>`
  height: inherit;
  width: ${(props) => props.width}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: relative;
  left: ${(props) => props.moveTo}px;
  transition: left 1s ease;
`;

type Props = {
  onChange: (interests: string[]) => void;
};

const InterestGallery = ({ onChange }: Props) => {
  const [slideDirection, setSlideDirection] = useState(0);
  const [rightSlideEndPoint, setRightSlideEndPoint] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const imageWidth = 155;
  const carouselWidth = imageArray.length * imageWidth;
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      setRightSlideEndPoint(carouselRef.current.clientWidth - carouselWidth);
    }
  }, []);

  const onClickSlide = (buttonDirection: string) => {
    if (slideDirection < 0 && buttonDirection === "left") {
      setSlideDirection(slideDirection + imageWidth);

      return;
    }
    if (slideDirection >= rightSlideEndPoint && buttonDirection === "right") {
      setSlideDirection(slideDirection - imageWidth);
    }
  };

  const onClickChoose = (id: string) => {
    let _selectedInterests: string[] = [];
    if (!selectedInterests.includes(id)) {
      _selectedInterests = [...selectedInterests, id];
    } else {
      _selectedInterests = [
        ...selectedInterests.slice(
          0,
          selectedInterests.findIndex((item) => item === id)
        ),
        ...selectedInterests.slice(
          selectedInterests.findIndex((item) => item === id) + 1,
          selectedInterests.length
        ),
      ];
    }
    setSelectedInterests(_selectedInterests);

    onChange(selectedInterests);
  };

  return (
    <Wrapper>
      <ButtonGallery buttonDirection="left" onClick={onClickSlide} />
      <CarouselContainer ref={carouselRef}>
        <Carousel moveTo={slideDirection} width={carouselWidth}>
          {imageArray.map((item, index) => (
            <ItemGallery
              image={item.image}
              description={item.description}
              id={item.id}
              key={index}
              chosen={selectedInterests.includes(item.id)}
              onClickChoose={onClickChoose}
            />
          ))}
        </Carousel>
      </CarouselContainer>
      <ButtonGallery buttonDirection="right" onClick={onClickSlide} />
    </Wrapper>
  );
};

export default React.memo(InterestGallery);
