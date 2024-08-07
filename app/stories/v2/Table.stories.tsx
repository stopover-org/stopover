import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider, Grid, Stack } from "@mui/joy";
import { faker } from "@faker-js/faker";
import { theme } from "lib/theme";
import Table from "components/v2/Table";

const Preview = () => {
  const headersWPreviews = React.useMemo(
    () =>
      [
        "Product",
        "Price",
        "Qty",
        "Company",
        "Manager",
        "Margin",
        "Previews",
        "Recurrent",
      ].map((val) => ({
        label: val,
        width: val === "Previews" ? 320 : 200,
        key: val.toLowerCase(),
      })),
    []
  );

  const headers = React.useMemo(
    () =>
      [
        "Product",
        "Price",
        "Qty",
        "Company",
        "Manager",
        "Margin",
        "Recurrent",
      ].map((val) => ({
        label: val,
        width: 200,
        key: val.toLowerCase(),
      })),
    []
  );

  const data = React.useMemo(() => {
    const product = faker.commerce.product();
    const company = faker.company.name();
    const manager = faker.person.fullName();
    return Array.from(Array(10).keys()).map((value) => ({
      product,
      price: `$${value + 100}`,
      company,
      qty: 10,
      manager,
      margin: "20%",
      recurrent: "false",
    }));
  }, []);

  const dataWPreviews = React.useMemo(() => {
    const product = faker.commerce.product();
    const company = faker.company.name();
    const manager = faker.person.fullName();
    return Array.from(Array(10).keys()).map((value) => ({
      product,
      price: `$${value + 100}`,
      company,
      qty: 10,
      manager,
      margin: "20%",
      previews: (
        <Stack flexDirection="row">
          <img
            alt="1"
            style={{ margin: "2px" }}
            src={faker.image.abstract(100, 100)}
          />
          <img
            alt="1"
            style={{ margin: "2px" }}
            src={faker.image.abstract(100, 100)}
          />
          <img
            alt="1"
            style={{ margin: "2px" }}
            src={faker.image.abstract(100, 100)}
          />
        </Stack>
      ),
      recurrent: "false",
    }));
  }, []);
  return (
    <CssVarsProvider theme={theme}>
      <Grid container xs={12}>
        <Grid xs={6}>
          <Table size="sm" headers={headersWPreviews} data={dataWPreviews} />
        </Grid>
        <Grid xs={6} />
        <Grid xs={8}>
          <Table size="sm" headers={headers} data={data} />
        </Grid>
        <Grid xs={8}>
          <Table
            size="sm"
            headers={headers}
            data={data}
            withPagination
            paginationProps={{
              page: 3,
              setPage: () => {},
              rowsPerPageOptions: [5, 10, 15, 35],
              rowsPerPage: 10,
              colSpan: headers.length,
              onNextPage: () => {},
              onPrevPage: () => {},
              hasNext: false,
              hasPrevious: false,
            }}
          />
        </Grid>
      </Grid>
    </CssVarsProvider>
  );
};

export default {
  title: "Components/V2/Table",
  component: Preview,
} as Meta<typeof Table>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
