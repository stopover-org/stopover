import React from "react";
import { Card, CardContent, Grid, GridProps } from "@mui/joy";

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
  <Grid xs={12} {...props}>
    <Card sx={{ margin: "20px" }} variant="outlined">
      <CardContent>
        <Grid container>{children}</Grid>
      </CardContent>
    </Card>
  </Grid>
);

export default React.memo(Fieldset);
