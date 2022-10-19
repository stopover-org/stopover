import React from "react";
import styled from "styled-components";
import cross from "../../icons/Solid/Interface/Cross.svg";
import Typography from "../../Typography";
import { TypographySize } from "../../StatesEnum";
import Column from "../../Column";

const Wrapper = styled(Column)`
  width: 150px;
  height: 150px;
`;

const ImageContainer = styled.div<{ color: string; cross: string }>`
  cursor: pointer;
  width: 125px;
  height: 125px;
  background: ${(props) => props.color};
  border: 4px solid ${(props) => props.color};
  border-radius: 5px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  div {
    display: ${(props) => props.cross};
    bottom: 137px;
    left: 111px;
    position: relative;
    width: 24px;
    height: 24px;
    background: #ff8a00;
    border-radius: 50%;
  }
`;

type Props = {
  image: string;
  description: string;
  id: string;
  chosen: boolean;
  onClickChoose: (id: string) => void;
};

const ItemGallery = (props: Props) => {
  const borderColor = props.chosen ? "#FF8A00" : "transparent";
  const crossVisible = props.chosen ? "block" : "none";

  return (
    <Wrapper onClick={() => props.onClickChoose(props.id)}>
      <ImageContainer color={borderColor} cross={crossVisible}>
        <img alt={props.description} src={props.image} />
        <div>
          <img alt={props.description} src={cross.src} />
        </div>
      </ImageContainer>
      <Typography size={TypographySize.H4}>{props.description}</Typography>
    </Wrapper>
  );
};

export default ItemGallery;
