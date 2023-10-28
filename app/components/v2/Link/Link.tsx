import React from "react";
import NextLink from "next/link";
import { Tooltip, styled } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Typography from "../Typography";
import { TypographyProps } from "../Typography/Typography";

interface BaseLinkProps {
  children: React.ReactNode;
  href: string;
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
    if (target === "_blank") {
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
            <a href={href} target={target}>
              {children}
            </a>
          </TypographyLink>
        </Tooltip>
      );
    }

    return (
      <NextLink href={href}>
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
          {children}
        </TypographyLink>
      </NextLink>
    );
  }
);

export default React.memo(Link);
