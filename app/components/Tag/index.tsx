import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Row from "../Row";
import { TagType, TagSizes } from "../StatesEnum";

const Wrapper = styled.a``;
const STag = styled(Row)<{
  border: string;
  padding: string;
  background: string;
  color: string;
}>`
  border: ${(props) => props.border};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
`;

type Props = {
  image?: string;
  content: React.ReactElement;
  variant?: TagType;
  size?: TagSizes;
  href?: string;
};

const imageExist = (image: string | undefined) =>
  typeof image === "string" && image !== "";

const Tag = ({
  image,
  content,
  size = TagSizes.NONE,
  variant = TagType.FULLFILLED,
  href,
}: Props) => (
  <Wrapper href={href}>
    <STag
      border={
        variant === TagType.OUTLINED ? "1px solid #FF8A00" : "transparent"
      }
      background={variant === TagType.FULLFILLED ? "#FF8A00" : "transparent"}
      color={variant === TagType.FULLFILLED ? "white" : "transparent"}
      padding={size}
    >
      {imageExist(image) && (
        <Image src={image} width="25px" height="25px" alt="icon" />
      )}
      {content}
    </STag>
  </Wrapper>
);

export default Tag;
