import React from "react";
import styled from "styled-components";
import Image from "./Image";
import Description from "./Description";
import Function from "./Function";
import Rate from "./Rate";

const CardStyle = styled.div<{ height: string | number; width: number }>`
  position: relative;
  overflow: hidden;
  margin: 10px;
  width: calc(${(props) => props.width * 1440}px);
  height: ${(props) => props.height};

  @media (max-width: 1440px) {
    max-width: calc(${(props) => props.width}*100vw);
    width: calc(${(props) => props.width}*100vw);
    height: ${(props) => props.height};
  }
`;

type Props = {
  width: number;
  height?: number | string;
  description: string;
  image: string;
  price: string;
};

function Card(props: Props) {
  const { width, height, description, price, image } = props;
  return (
    <CardStyle width={width} height={height || `calc(${width}*100vw/ 1.6)`}>
      <Image image={image} />
      <Description description={description} price={price} />
      <Rate />
      <Function />
    </CardStyle>
  );
}
export default Card;
// scale метрики
// откуда знать размер экрана
// 1.6 Золотое сечение
// @media
