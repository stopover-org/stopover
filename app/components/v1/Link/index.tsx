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
  color?: string;
};

const Link = ({
  href = "#",
  disabled,
  children,
  color = "#FF8A00",
  ...props
}: Props) => (
  <NextLink href={disabled ? "" : href} passHref {...props}>
    <SLink color={disabled ? "grey" : color}>{children}</SLink>
  </NextLink>
);

export default Link;
