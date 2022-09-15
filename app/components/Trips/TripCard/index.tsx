import React from "react";
import styled from "styled-components";
import Card from "../../Card";
import Row from "../../Row";
import Column from "../../Column";
import Typography from "../../Typography";
import BaseImage from "../../BaseImage";
import { TypographySize, TypographyTags } from "../../Typography/StatesEnum";

const Content = styled(Column)`
  padding: 10px;
`;

export const TripCard = () => (
  <Card
    width="400px"
    content={
      <Content
        justifyContent="center"
        alignItems="center"
        width="60%"
        height="130px"
      >
        <>
          <Row justifyContent="start" alignItems="start">
            <Typography size={TypographySize.H3} as={TypographyTags.H3}>
              USTI NAD LABEM
            </Typography>
          </Row>
          <Row justifyContent="start" alignItems="center">
            <Typography size={TypographySize.H6} as={TypographyTags.H6} bold>
              12 september - 22 september
            </Typography>
          </Row>
          <Row justifyContent="space-between" alignItems="end">
            <>
              <Typography size={TypographySize.H6} as={TypographyTags.H6}>
                2 people
              </Typography>
              <Typography size={TypographySize.H6} as={TypographyTags.H6}>
                usti nad labem
              </Typography>
            </>
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
  />
);
export default React.memo(TripCard);
