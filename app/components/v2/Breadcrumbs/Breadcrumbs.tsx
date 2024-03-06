import { Box, Stack, useTheme } from "@mui/joy";
import React from "react";
import { useMediaQuery } from "@mui/material";
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

const Breadcrumbs = ({ items, padding = 2 }: BreadcrumbsProps) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box padding={padding}>
      <Stack flexDirection="row" flexWrap="wrap">
        {items.map((item) =>
          typeof item === "string" ? (
            <React.Fragment key={item}>
              <Box>
                <Typography fontSize={isMobileView ? "sm" : "lg"}>
                  {item}
                </Typography>
              </Box>
              &nbsp;
              <Typography
                fontSize={isMobileView ? "12px" : "20px"}
                sx={{ paddingLeft: "10px", paddingRight: "10px" }}
              >
                /
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment key={item.title}>
              <Box>
                <Link
                  level={isMobileView ? "body-sm" : "body-lg"}
                  href={item.href}
                  target="_blank"
                >
                  {item.title}
                </Link>
                {item.subtitle && (
                  <Typography fontSize="12px">{item.subtitle}</Typography>
                )}
              </Box>
              &nbsp;
              <Typography
                fontSize={isMobileView ? "12px" : "20px"}
                sx={{
                  paddingLeft: isMobileView ? "4px" : "10px",
                  paddingRight: isMobileView ? "4px" : "10px",
                }}
              >
                /
              </Typography>
            </React.Fragment>
          )
        )}
      </Stack>
    </Box>
  );
};

export default React.memo(Breadcrumbs);
