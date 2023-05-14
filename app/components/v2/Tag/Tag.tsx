import React from "react";
import Link from "../Link";
import { LinkProps } from "../Link/Link";
import Typography from "../Typography";

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
      return (
        <Link
          ref={ref}
          variant="solid"
          {...props}
          href={href!}
          sx={{ margin: "0 4px" }}
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
        {...props}
        sx={{ margin: "0 4px" }}
        underline={underline}
      >
        {children}
      </Typography>
    );
  }
);

export default React.memo(Tag);
