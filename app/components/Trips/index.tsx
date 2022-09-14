import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Typography from "../Typography";
import Button from "../Button";
import Card from "../Card";
import shoppingCart from "../icons/Solid/General/Shopping-cart.svg";
import BaseImage from "../BaseImage";
import {
  ButtonVariants,
  ButtonIconPlace,
  ButtonSizes,
  TypographySize,
  TypographyTags,
} from "../Typography/StatesEnum";

const Wrapper = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 60%;
`;

const Trips = () => (
  <Wrapper>
    <Card
      width="850px"
      content={
        <Content>
          <Typography size={TypographySize.H2} as={TypographyTags.H2}>
            TRUE HELL
          </Typography>
          <Typography size={TypographySize.MEDIUM} as={TypographyTags.MEDIUM}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industrys standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </Typography>
          <Button
            variant={ButtonVariants.COMMON}
            iconPosition={ButtonIconPlace.WITH_RIGHT_ICON}
            color="#9e0e0e"
            icon={
              <Image
                src={shoppingCart.src}
                alt="shopping cart"
                width="25px"
                height="25px"
              />
            }
            size={ButtonSizes.H4}
          >
            <Typography
              size={TypographySize.H4}
              as={TypographyTags.H4}
              color="white"
            >
              Buy me. I demand it!
            </Typography>
          </Button>
        </Content>
      }
      image={
        <BaseImage width="40%" height="330px">
          <img
            src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d"
            alt="boss darksouls"
            width="100%"
            height="100%"
          />
        </BaseImage>
      }
      rightToLeft
    />
  </Wrapper>
);

export default Trips;
