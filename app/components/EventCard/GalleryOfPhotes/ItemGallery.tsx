import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ImageContainer = styled.img`
  cursor: pointer;
  width: 125px;
  height: 125px;
`;
const DescriptionContainer = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;

type Props = {
  image: string;
  description: string;
  id: string;
  onClickChoose: (id: string) => void;
};

function ItemGallery(props: Props) {
  return (
    <Wrapper onClick={() => props.onClickChoose(props.id)}>
      <ImageContainer src={props.image} alt="придумай название4" />
      <DescriptionContainer>{props.description}</DescriptionContainer>
    </Wrapper>
  );
}

export default ItemGallery;
