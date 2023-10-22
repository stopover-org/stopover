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
  underline?: boolean;
  prefetch?: boolean;
  replace?: boolean;
}

export interface LinkProps
  extends Omit<TypographyProps, keyof BaseLinkProps>,
    BaseLinkProps {}

const TypographyLink = styled(Typography)(() => ({
  display: "inline-block",
}));

const Link = React.forwardRef(
  (
    {
      children,
      href,
      primary,
      color,
      underline = true,
      sx,
      level,
      prefetch = true,
      replace = false,
      ...props
    }: LinkProps,
    ref: React.ForwardedRef<HTMLParagraphElement>
  ) => (
    <NextLink passHref href={href} prefetch={prefetch} replace={replace}>
      <TypographyLink
        {...props}
        ref={ref}
        color={primary ? "primary" : color}
        level={level || "body-md"}
        sx={{
          textDecoration: underline ? "underline" : "unset",
          ...sx,
        }}
      >
        <a href={href}>{children}</a>
      </TypographyLink>
    </NextLink>
  )
);

export default React.memo(Link);
