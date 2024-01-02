import React from "react";
import NextLink from "next/link";
import { styled, Tooltip } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Typography from "../Typography";
import { TypographyProps } from "../Typography/Typography";

interface BaseLinkProps {
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
  primary?: boolean;
  underline?: boolean;
  target?: string;
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
      target,
      ...props
    }: LinkProps,
    ref: React.ForwardedRef<HTMLParagraphElement>
  ) => {
    const { t } = useTranslation();
    if (target === "_blank" && typeof href === "string") {
      return (
        <Tooltip title={t("components.link._blank")}>
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
            <NextLink href={href} target={target}>
              {children}
            </NextLink>
          </TypographyLink>
        </Tooltip>
      );
    }

    return (
      <TypographyLink
        {...props}
        ref={ref}
        color={primary ? "primary" : color}
        level={level || "body-md"}
        sx={{
          textDecoration: underline ? "underline" : "unset",
          cursor: "pointer",
          color: primary ? "primary" : color,
          ...sx,
        }}
      >
        {href ? <NextLink href={href}>{children}</NextLink> : children}
      </TypographyLink>
    );
  }
);

export default React.memo(Link);
