import { Box, Stack } from "@mui/joy";
import React from "react";
import Typography from "../Typography";
import Link from "../Link";

interface IBreadcrumb {
  title: string;
  subtitle?: string;
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
          <React.Fragment key={item}>
            <Box>
              <Typography fontSize="lg">{item}</Typography>
            </Box>
            <Typography
              fontSize="20px"
              sx={{ paddingLeft: "10px", paddingRight: "10px" }}
            >
              {" "}
              /{" "}
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment key={item.title}>
            <Box>
              <Typography fontSize="lg">
                <Link level="body-lg" href={item.href} target="_blank">
                  {item.title}
                </Link>
              </Typography>
              {item.subtitle && (
                <Typography fontSize="12px">{item.subtitle}</Typography>
              )}
            </Box>
            <Typography
              fontSize="20px"
              sx={{ paddingLeft: "10px", paddingRight: "10px" }}
            >
              {" "}
              /{" "}
            </Typography>
          </React.Fragment>
        )
      )}
    </Stack>
  </Box>
);

export default React.memo(Breadcrumbs);
