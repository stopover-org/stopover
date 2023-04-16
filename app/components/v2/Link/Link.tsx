import React from "react";
import NextLink from "next/link";
import { styled } from "@mui/joy";
import Typography from "../Typography";
import { TypographyProps } from "../Typography/Typography";

interface BaseLinkProps {
  children: React.ReactNode;
  href: string;
  disabled?: boolean;
  primary?: boolean;
}

export interface LinkProps
  extends Omit<TypographyProps, keyof BaseLinkProps>,
    BaseLinkProps {}

const TypographyLink = styled(Typography)(() => ({
  textDecoration: "underline",
  display: "inline-block",
}));

const Link = React.forwardRef(
  (
    { children, href, primary, color, ...props }: LinkProps,
    ref: React.ForwardedRef<HTMLParagraphElement>
  ) => (
    <NextLink passHref href={href}>
      <TypographyLink
        {...props}
        ref={ref}
        color={primary ? "primary" : color}
        level="body3"
      >
        <a href={href}>{children}</a>
      </TypographyLink>
    </NextLink>
  )
);

export default React.memo(Link);
