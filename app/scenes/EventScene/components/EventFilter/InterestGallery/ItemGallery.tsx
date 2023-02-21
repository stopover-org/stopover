import React, { Suspense } from "react";
import styled from "styled-components";
import { graphql, useFragment } from "react-relay";
import cross from "../../../../../components/icons/Solid/Interface/Cross.svg";
import Typography from "../../../../../components/Typography";
import { TypographySize } from "../../../../../components/StatesEnum";
import Column from "../../../../../components/Column";
import { ItemGallery_InterestFragment$key } from "./__generated__/ItemGallery_InterestFragment.graphql";

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
  overflow: hidden;

  img {
    height: 100%;
    display: block;
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
  chosen: boolean;
  onClick: (id: string) => void;
  interestRef: ItemGallery_InterestFragment$key;
};

const InterestTitle = styled(Typography)`
  height: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  width: 125px;
`;

const ItemGallery = ({ interestRef, ...props }: Props) => {
  const interest = useFragment(
    graphql`
      fragment ItemGallery_InterestFragment on Interest {
        id
        title
        preview
      }
    `,
    interestRef
  );
  const borderColor = props.chosen ? "#FF8A00" : "transparent";
  const crossVisible = props.chosen ? "block" : "none";

  return (
    <Suspense>
      <Wrapper onClick={() => props.onClick(interest.id)}>
        <ImageContainer color={borderColor} cross={crossVisible}>
          <img alt={interest.title} src={interest.preview || "#"} />
          <div>
            <img alt="preview" src={cross.src} />
          </div>
        </ImageContainer>
        <InterestTitle size={TypographySize.H4}>{interest.title}</InterestTitle>
      </Wrapper>
    </Suspense>
  );
};

export default ItemGallery;
