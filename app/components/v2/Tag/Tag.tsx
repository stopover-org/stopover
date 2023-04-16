import React from "react";
import Link from "../Link";
import { LinkProps } from "../Link/Link";

const Tag = React.forwardRef(
  (
    { children, ...props }: Omit<LinkProps, "underline">,
    ref: React.Ref<any>
  ) => (
    <Link
      ref={ref}
      variant="solid"
      {...props}
      sx={{ margin: "0 4px" }}
      underline={false}
    >
      {children}
    </Link>
  )
);

export default React.memo(Tag);
