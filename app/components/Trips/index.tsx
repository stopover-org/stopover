import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Typography from "../Typography";
import Button from "../Button";
import shoppingCart from "../icons/Solid/General/Shopping-cart.svg";
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
      icon={
        <Image
          src={shoppingCart.src}
          alt="shopping cart"
          width="25px"
          height="25px"
        />
      }
      size={ButtonSizes.H1}
    >
      <Typography size={TypographySize.H1} as={TypographyTags.MEDIUM}>
        button
      </Typography>
    </Button>
  </Wrapper>
);

export default Trips;
