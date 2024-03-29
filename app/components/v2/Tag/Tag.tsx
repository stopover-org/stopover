import React from "react";
import Link from "components/v2/Link";
import { LinkProps } from "components/v2/Link/Link";
import Typography from "components/v2/Typography";

interface BaseTagProps {
  underline?: boolean;
  link?: boolean;
  href?: string;
}

interface TagProps extends Omit<LinkProps, keyof BaseTagProps>, BaseTagProps {}

const Tag = React.forwardRef(
  (
    { children, link = true, underline = false, href, ...props }: TagProps,
    ref: React.Ref<any>
  ) => {
    if (link) {
      if (!href) throw new Error("Href is required for Tag when it's link");
      return (
        <Link
          ref={ref}
          variant="solid"
          level="body-xs"
          fontSize="body-xs"
          {...props}
          href={href!}
          sx={{
            margin: "0 4px",
            display: "inline-block",
            ...props.sx,
          }}
          underline={underline}
        >
          {children}
        </Link>
      );
    }
    return (
      <Typography
        ref={ref}
        variant="solid"
        level="body-xs"
        fontSize="body-xs"
        {...props}
        sx={{
          margin: "0 4px",
          display: "inline-block",
          ...props.sx,
        }}
        underline={underline}
      >
        {children}
      </Typography>
    );
  }
);

export default React.memo(Tag);
