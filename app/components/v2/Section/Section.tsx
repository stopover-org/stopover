import React from "react";
import {
  Card,
  CardContent,
  ColorPaletteProp,
  Grid,
  GridProps,
  VariantProp,
} from "@mui/joy";

// component allows to divide content (fo forms use <Fieldset/>)
interface IBaseSectionProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
  variant?: VariantProp;
  color?: ColorPaletteProp;
}

interface ISectionProps
  extends Omit<GridProps, keyof IBaseSectionProps>,
    IBaseSectionProps {}

const Section = ({ children, color, variant, ...props }: ISectionProps) => (
  <Grid xs={12} {...props}>
    <Card variant={variant || "outlined"} color={color}>
      <CardContent>
        <Grid container spacing={0}>
          {children}
        </Grid>
      </CardContent>
    </Card>
  </Grid>
);

export default React.memo(Section);
