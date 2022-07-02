import React from "react";
import styled from "styled-components";
import Image from "./Image";
import Description from "./Description";
import Function from "./Function";
import Rate from "./Rate";


const CardStyle = styled.div<{ height: string | number, width: string }>`
  position: relative;
  max-width: ${props => props.width};
  width: ${props => props.width};
  height: ${props => props.height};
  overflow: hidden;
  margin: 10px;
`;

type Props = {
  width: number,
  height?: number | string,
  description: string,
  image: string,
  price: string,
  layoutWidth: number,
}

function Card(props: Props) {
  const { width, height, description, price, image, layoutWidth } = props;
  console.log(props.layoutWidth)
  return (
    <CardStyle
      width = { `calc(${width}*${layoutWidth}px)` }
      height = { height ? height : `calc(${width}*${layoutWidth}px / 1.6)` }
    >
      <Image 
        image = { image }
      />
      <Description 
        description = { description }
        price = { price }
      />
      <Rate />
      <Function />
    </CardStyle>
  );

}
export default Card;
// scale метрики
// откуда знать размер экрана
// 1.6 Золотое сечение
//@media