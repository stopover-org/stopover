import React from "react";
import { Card, CardContent, Grid, GridProps } from "@mui/joy";
// component allows to divide content in forms
interface IBaseFieldsetProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
}

interface IFieldsetProps
  extends Omit<GridProps, keyof IBaseFieldsetProps>,
    IBaseFieldsetProps {}

const Fieldset = ({ children, ...props }: IFieldsetProps) => (
  <Grid xs={12} sx={{ zIndex: "unset" }} {...props}>
    <Card sx={{ margin: "20px" }} variant="outlined">
      <CardContent sx={{ zIndex: "unset" }}>
        <Grid container spacing={1}>
          {children}
        </Grid>
      </CardContent>
    </Card>
  </Grid>
);

export default React.memo(Fieldset);
