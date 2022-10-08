import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Row from "../Row";
import { TagType, TagSizes } from "../StatesEnum";

const Wrapper = styled.a`
  cursor: pointer;
`;

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
  border-radius: 3px;
`;

const Content = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

type Props = {
  image?: string;
  children: React.ReactElement;
  variant?: TagType;
  size?: TagSizes;
  href?: string;
  imageSize?: string;
};

const Tag = ({
  image,
  imageSize = "25px",
  children,
  size = TagSizes.NONE,
  variant = TagType.FULLFILLED,
  href,
}: Props) => (
  <Wrapper href={href}>
    <STag
      justifyContent="space-around"
      border={variant === TagType.OUTLINED ? "1px solid #FF8A00" : "auto"}
      background={variant === TagType.FULLFILLED ? "#FF8A00" : "auto"}
      color={variant === TagType.FULLFILLED ? "white" : "black"}
      padding={size}
    >
      {image && (
        <Image src={image} width={imageSize} height={imageSize} alt="icon" />
      )}
      <Content>{children}</Content>
    </STag>
  </Wrapper>
);

export default Tag;
