import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ItemGallery from "./ItemGallery";
import ButtonGallery from "./ButtonGallery";
import {imageArray} from "../../PseudoServer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 1042px;
  width: 1042px;
  height: 200px;
`;
const CarouselContainer = styled.div`
  width: inherit;
  height: inherit;
  overflow: hidden;
  position: absolute;
`;
const Carousel = styled.div<{width: number, moveTo: number | string}>`
  height: inherit;
  width: ${props=>props.width}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: relative;
  left: ${props=>props.moveTo}px;
  transition: left 1s ease;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: inherit;
  width: inherit;
  justify-content: space-between;
  z-index: 1;
  position: absolute;
`;


function IntrestGallery() {
  
  const [slideDirection, setSlideDirection] = useState(0);
  const [rightSlideEndPoint, setRightSlideEndPoint] = useState(0);

  const [imageState, setImageState] = useState(new Array().fill(null));

  const imageWidth = 155;
  const carouselWidth = imageArray.length*imageWidth;
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(carouselRef.current){
      setRightSlideEndPoint((carouselRef.current.clientWidth)-carouselWidth);
    }else{
      console.log("не подгрузилось с сервера");
    }
  },[])

  const onClickSlide = (buttonDirection: string) => {
    slideDirection < 0 && buttonDirection === "left" && setSlideDirection(slideDirection+imageWidth);
    slideDirection >= rightSlideEndPoint && buttonDirection === "right" && setSlideDirection(slideDirection-imageWidth);
  }

  const onClickChoose = (id: string) => {
    
    if(!imageState.includes(id)){
      setImageState([...imageState, id]);
    }else{
      setImageState([
        ...imageState.slice(0, imageState.findIndex(item => item === id)),
        ...imageState.slice(imageState.findIndex(item => item === id)+1, imageState.length)
      ])
    }
  }

  return (
    <Wrapper>
      <ButtonGallery
          buttonDirection={"left"}
          onClick={onClickSlide}
        />
      <CarouselContainer
        ref={carouselRef}
      >
        <Carousel
          moveTo={slideDirection}
          width={carouselWidth}
        >
          {imageArray.map((item, index)=>{
            return(
              <ItemGallery 
                image={item.image}
                description={item.description}
                id={item.id}
                key={index}
                choosen={imageState.includes(item.id)}
                onClickChoose={onClickChoose}
              />
            )
          })}
        </Carousel>
      </CarouselContainer>  
      <ButtonGallery
          buttonDirection={"right"}
          onClick={onClickSlide}
        />
    </Wrapper>
  );
}

export default IntrestGallery;