import React from "react";
import styled from "styled-components";
import Typography from "../Typography";
import Button from "../Button";
import {
  ButtonVariants,
  ButtonIconPlace,
  ButtonSizes,
  TypographySize,
  TypographyTags,
} from "../Typography/StatesEnum";

const Wrapper = styled.div``;

const Trips = () => (
  <Wrapper>
    <Button
      variant={ButtonVariants.COMMON}
      iconPosition={ButtonIconPlace.WITH_RIGHT_ICON}
      disabled
      size={ButtonSizes.H3}
    >
      <Typography size={TypographySize.H5} as={TypographyTags.MEDIUM}>
        button
      </Typography>
    </Button>
  </Wrapper>
);

export default Trips;
