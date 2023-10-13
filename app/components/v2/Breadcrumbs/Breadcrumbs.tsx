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
  padding?: number;
}

const Breadcrumbs = ({ items, padding = 2 }: BreadcrumbsProps) => (
  <Box padding={padding}>
    <Stack flexDirection="row" flexWrap="wrap">
      {items.map((item) =>
        typeof item === "string" ? (
          <Typography fontSize="sm" key={item}>
            &nbsp;/&nbsp;{item}
          </Typography>
        ) : (
          <Typography key={item.title} fontSize="sm">
            &nbsp;/&nbsp;
            <Link level="body-sm" href={item.href}>
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
