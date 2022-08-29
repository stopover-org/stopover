import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import ItemGallery from "./ItemGallery";
import RightLeftButton from "./RightLeftButton";

const Wrapper = styled.div`
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
`;
const Close = styled.div`
  width: 45px;
  height: 45px;
  background-color: red;
  position: absolute;
  right: 0px;
`;
type Image = {
  name?: string;
  image: string;
  description: string;
  id: string;
};

type Props = {
  isOpen: boolean;
  images: Image[];
  onClose?: () => void;
};

function GalleryOfPhotoes({ isOpen, images, onClose }: Props) {
  const [indexOfCurrentImage, setIndexOfCurrentImage] = useState<number>(0);
  const [carouselHeight, setCarouselHeight] = useState<number | undefined>(0);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const portal = document.getElementById("galleryOfPhotoes") as HTMLElement;
  useEffect(() => {
    setCarouselHeight(mainImageRef.current?.offsetHeight);
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
    <Wrapper>
      <Close onClick={onClose} />
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
                image={item.image}
                description={item.description}
                id={item.id}
                key={index}
                chosen={!!(images[indexOfCurrentImage].id === item.id)}
                onClickChoose={onClickChoose}
              />
            ))}
          </Carousel>
        </CarouselWrapper>
      </Gallery>
    </Wrapper>,
    portal
  );
}

export default GalleryOfPhotoes;
