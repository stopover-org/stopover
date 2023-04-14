import React from "react";
import NextLink from "next/link";
import Typography from "../Typography";
import { TypographyProps } from "../Typography/Typography";

interface BaseLinkProps {
  children: React.ReactNode;
  href: string;
  disabled?: boolean;
  primary?: boolean;
}

interface LinkProps
  extends Omit<TypographyProps, keyof BaseLinkProps>,
    BaseLinkProps {}

const Link = ({ children, href, primary, color, ...props }: LinkProps) => (
  <NextLink passHref href={href}>
    <Typography {...props} color={primary ? "primary" : color}>
      <a href={href}>{children}</a>
    </Typography>
  </NextLink>
);

export default React.memo(Link);
