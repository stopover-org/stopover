import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ImageContainer = styled.img<{ color: string }>`
  cursor: pointer;
  width: 110px;
  height: 110px;
  border: 5px solid ${(props) => props.color};
  background-color: ${(props) => props.color};
`;

type Props = {
  image: string;
  description: string;
  id: string;
  chosen: boolean;
  onClickChoose: (id: string) => void;
};

const ItemGallery = ({
  image,
  description,
  id,
  chosen,
  onClickChoose,
}: Props) => {
  const borderColor = chosen ? "#FF8A00" : "transparent";
  return (
    <Wrapper onClick={() => onClickChoose(id)}>
      <ImageContainer color={borderColor} src={image} alt={description} />
    </Wrapper>
  );
};

export default ItemGallery;