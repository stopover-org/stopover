import React from "react";
import styled from "styled-components";
import NextLink from "next/link";

const SLink = styled.a<{ color: string }>`
  cursor: pointer;
  color: ${(props) => props.color};
  :hover {
    text-decoration: underline;
  }
`;

type Props = {
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

const Link = ({ href = "#", disabled, children, ...props }: Props) => (
  <NextLink href={disabled ? "" : href} passHref {...props}>
    <SLink color={disabled ? "grey" : "#FF8A00"}>{children}</SLink>
  </NextLink>
);

export default Link;
