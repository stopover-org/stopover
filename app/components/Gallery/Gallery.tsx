import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import RightLeftButton from "../EventCard/RightLeftButton";
import CrossWhite from "../icons/Outline/Interface/CrossWhite.svg";
import Column from "../Column";
import Row from "../Row";

const Fade = styled.div`
  padding-top: 12px;
  position: fixed;
  bottom: 0px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #000000bd;
  z-index: 99999;
  .right-left-button-wrapper {
    padding-left: 35px;
    padding-right: 35px;
  }
`;
const Wrapper = styled(Column)``;
const MainImageWrapper = styled(Row)<{ carouselHeight: number }>`
  justify-content: space-between;
  max-height: 100vh;
  min-height: ${(props) => props.carouselHeight}px;
  height: 100vh;
  overflow: hidden;
`;

const CarouselWrapper = styled(Row)`
  padding: 12px 35px 12px 35px;
`;

const MainImage = styled.img`
  min-height: 100px;
  min-width: 100px;
  max-height: 900px;
  max-width: 1300px;
`;

const Carousel = styled(Row)`
  overflow-x: scroll;
  width: auto;
  position: relative;
  transition: left 1s ease;
  width: 100%;
  padding: 6px;
`;

const Close = styled.img`
  width: 45px;
  height: 45px;
  position: absolute;
  right: 0px;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
`;

const ItemGallery = styled(Row)<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border: 5px solid ${(props) => props.color};
  background-color: ${(props) => props.color};
`;

const Image = styled.img`
  display: block;
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type Props = {
  isOpen: boolean;
  images: string[];
  onClose?: () => void;
};

const Gallery = ({ isOpen, images, onClose }: Props) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [carouselHeight, setCarouselHeight] = useState<number | undefined>(0);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const portal = document.getElementById("gallery-portal") as HTMLElement;
  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (onClose instanceof Function) {
        onClose();
      }
    }
  };

  useEffect(() => {
    setCarouselHeight(mainImageRef.current?.offsetHeight);

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  if (!isOpen) return null;

  const onClickChoose = (id: number) => {
    setCurrentImage(images.findIndex((item, index) => index === id));
  };

  const onClickSlide = (buttonDirection: string) => {
    if (buttonDirection === "left" && currentImage > 0) {
      setCurrentImage(currentImage - 1);
      return;
    }
    if (buttonDirection === "right" && currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  return ReactDom.createPortal(
    <Fade onKeyDown={() => keyDownHandler} tabIndex={0}>
      <Close src={CrossWhite.src} onClick={onClose} />
      <Wrapper>
        <MainImageWrapper carouselHeight={carouselHeight as number}>
          <RightLeftButton
            buttonDirection="left"
            onClick={onClickSlide}
            active={!(currentImage === 0)}
          />
          <MainImage src={images[currentImage]} />
          <RightLeftButton
            buttonDirection="right"
            onClick={onClickSlide}
            active={!(currentImage === images.length - 1)}
          />
        </MainImageWrapper>
        <CarouselWrapper>
          <Carousel>
            {images.map((item, index) => (
              <ItemGallery
                color={
                  images[currentImage] === item ? "#FF8A00" : "transparent"
                }
                key={index}
                onClick={() => onClickChoose(index)}
              >
                <ImageContainer>
                  <Image src={item} alt="" />
                </ImageContainer>
              </ItemGallery>
            ))}
          </Carousel>
        </CarouselWrapper>
      </Wrapper>
    </Fade>,
    portal
  );
};

export default Gallery;
