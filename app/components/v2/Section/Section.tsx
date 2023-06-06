import React from "react";
import { Card, CardContent, Grid, GridProps } from "@mui/joy";
// component allows to divide content (fo forms use <Fieldset/>)
interface IBaseSectionProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
}

interface ISectionProps
  extends Omit<GridProps, keyof IBaseSectionProps>,
    IBaseSectionProps {}

const Section = ({ children, ...props }: ISectionProps) => (
  <Grid xs={12} {...props}>
    <Card sx={{ margin: "20px" }} variant="outlined">
      <CardContent>
        <Grid container>{children}</Grid>
      </CardContent>
    </Card>
  </Grid>
);

export default React.memo(Section);
