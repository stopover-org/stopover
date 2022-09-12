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
} from "../StatesEnum";

const Wrapper = styled.div``;

const Trips = () => (
  <Wrapper>
    <Button
      buttonVariant={ButtonVariants.COMMON}
      buttonIconPlace={ButtonIconPlace.WITH_RIGHT_ICON}
      disabled
      buttonSize={ButtonSizes.H3}
    >
      <Typography size={TypographySize.H5} as={TypographyTags.MEDIUM}>
        button
      </Typography>
    </Button>
  </Wrapper>
);

export default Trips;
