import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import RightLeftButton from "./RightLeftButton";
import CrossWhite from "../icons/Outline/Interface/CrossWhite.svg";

const Wrapper = styled.div`
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
const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
const MainImageWrapper = styled.div<{ carouselHeight: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-height: 100vh;
  min-height: ${(props) => props.carouselHeight}px;
  height: 100vh;
  overflow: hidden;
`;
const CarouselWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 35px 12px 35px;
`;
const MainImage = styled.img`
  min-height: 100px;
  min-width: 100px;
  max-height: 900px;
  max-width: 1300px;
`;
const Carousel = styled.div`
  overflow-x: scroll;
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
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
  cursor: pointer;
  width: 150px;
  height: 150px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
`;
const ItemGallery = styled.div<{ color: string }>`
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
type Images = {
  name?: string;
  image: string;
  description: string;
  id: string;
};

type Props = {
  isOpen: boolean;
  images: Images[];
  onClose?: () => void;
};

const PhotoGallery = ({ isOpen, images, onClose }: Props) => {
  const [indexOfCurrentImage, setIndexOfCurrentImage] = useState<number>(0);
  const [carouselHeight, setCarouselHeight] = useState<number | undefined>(0);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const portal = document.getElementById("galleryOfPhotoes") as HTMLElement;

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

  const onClickChoose = (id: string) => {
    setIndexOfCurrentImage(images.findIndex((item) => item.id === id));
  };
  const onClickSlide = (buttonDirection: string) => {
    if (buttonDirection === "left" && indexOfCurrentImage > 0)
      setIndexOfCurrentImage(indexOfCurrentImage - 1);
    if (buttonDirection === "right" && indexOfCurrentImage < images.length - 1)
      setIndexOfCurrentImage(indexOfCurrentImage + 1);
  };
  return ReactDom.createPortal(
    <Wrapper onKeyDown={() => keyDownHandler} tabIndex={0}>
      <Close src={CrossWhite.src} onClick={onClose} />
      <Gallery>
        <MainImageWrapper carouselHeight={carouselHeight as number}>
          <RightLeftButton
            buttonDirection="left"
            onClick={onClickSlide}
            active={!(indexOfCurrentImage === 0)}
          />
          <MainImage src={images[indexOfCurrentImage].image} />
          <RightLeftButton
            buttonDirection="right"
            onClick={onClickSlide}
            active={!(indexOfCurrentImage === images.length - 1)}
          />
        </MainImageWrapper>
        <CarouselWrapper>
          <Carousel>
            {images.map((item, index) => (
              <ItemGallery
                color={
                  images[indexOfCurrentImage].id === item.id
                    ? "#FF8A00"
                    : "transparent"
                }
                key={index}
                onClick={() => onClickChoose(item.id)}
              >
                <ImageContainer>
                  <Image src={item.image} alt={item.description} />
                </ImageContainer>
              </ItemGallery>
            ))}
          </Carousel>
        </CarouselWrapper>
      </Gallery>
    </Wrapper>,
    portal
  );
};

export default PhotoGallery;
/*
<MainImageWrapper carouselHeight={carouselHeight as number}>
          <RightLeftButton
            buttonDirection="left"
            onClick={onClickSlide}
            active={!(indexOfCurrentImage === 0)}
          />
          <MainImage src={images[indexOfCurrentImage].image} />
          <RightLeftButton
            buttonDirection="right"
            onClick={onClickSlide}
            active={!(indexOfCurrentImage === images.length - 1)}
          />
        </MainImageWrapper>
*/
