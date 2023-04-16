import React from "react";
import Link from "../Link";
import { LinkProps } from "../Link/Link";

const Tag = React.forwardRef(
  ({ children, ...props }: LinkProps, ref: React.Ref<any>) => (
    <Link ref={ref} variant="solid" {...props}>
      {children}
    </Link>
  )
);

export default React.memo(Tag);
