import { Box, Stack } from "@mui/joy";
import React from "react";
import Link from "../Link";
import Typography from "../Typography";

interface IBreadcrumb {
  title: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Array<string | IBreadcrumb>;
}
const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <Box padding={2}>
    <Stack flexDirection="row">
      {items.map((item) =>
        typeof item === "string" ? (
          <Typography>&nbsp;/&nbsp;{item}</Typography>
        ) : (
          <Typography>
            &nbsp;/&nbsp;
            <Link level="body1" href={item.href}>
              {item.title}
            </Link>
          </Typography>
        )
      )}
      <Typography>&nbsp;/&nbsp;</Typography>
    </Stack>
  </Box>
);

export default React.memo(Breadcrumbs);
