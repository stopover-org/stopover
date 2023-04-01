import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Typography from "../../v1/Typography";
import Button from "../../v1/Button";
import Card from "../../v1/Card";
import shoppingCart from "../../icons/Solid/General/Shopping-cart.svg";
import BaseImage from "../../v1/BaseImage";
import Row from "../../Layout/Row";
import Column from "../../Layout/Column";
import {
  ButtonIconPlace,
  ButtonSizes,
  ButtonVariants,
  TypographySize,
  TypographyTags,
} from "../../StatesEnum";

const Wrapper = styled.div``;
const Content = styled(Column)`
  padding: 10px;
`;

const FirstTripCard = () => (
  <Wrapper>
    <Card
      width="850px"
      content={
        <Content
          justifyContent="center"
          alignItems="center"
          width="60%"
          height="333px"
        >
          <>
            <Row justifyContent="start" alignItems="flex-start">
              <Typography size={TypographySize.H2} as={TypographyTags.H2}>
                TRUE HELL
              </Typography>
            </Row>
            <Row>
              <Typography
                size={TypographySize.MEDIUM}
                as={TypographyTags.MEDIUM}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industrys
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </Typography>
            </Row>
            <Row justifyContent="end" alignItems="flex-end">
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
            </Row>
          </>
        </Content>
      }
      image={
        <BaseImage width="40%">
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

export default React.memo(FirstTripCard);
