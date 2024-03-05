import React from "react";
import { Card, CardContent, Grid, GridProps } from "@mui/joy";

// component allows to divide content in forms
interface IBaseFieldsetProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
  variant?: "outlined" | "solid" | "plain" | "soft";
  margin?: string | number;
}

interface IFieldsetProps
  extends Omit<GridProps, keyof IBaseFieldsetProps>,
    IBaseFieldsetProps {}

const Fieldset = ({
  children,
  variant = "outlined",
  margin = "20px",
  ...props
}: IFieldsetProps) => (
  <Grid xs={12} sx={{ zIndex: "unset" }} {...props}>
    <Card sx={{ margin }} variant={variant}>
      <CardContent sx={{ zIndex: "unset" }}>
        <Grid container spacing={1} xs={12}>
          {children}
        </Grid>
      </CardContent>
    </Card>
  </Grid>
);

export default React.memo(Fieldset);
