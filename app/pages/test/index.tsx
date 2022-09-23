import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";
import Accordion from "../../components/Accordion";
import Typography from "../../components/Typography";
import { TypographySize, TypographyTags } from "../../components/StatesEnum";
import Column from "../../components/Column";
import Row from "../../components/Row";

const AccordionStyle = styled.div`
  width: 500px;
`;

const Test = () => {
  const [contentHeightState, setContentHeightState] = useState(0);
  const onOpen = () => {};
  const onClose = () => {};
  const contentHeight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentHeight.current) {
      setContentHeightState(contentHeight.current!.offsetHeight);
    }
  }, []);

  return (
    <Layout>
      <AccordionStyle>
        <Accordion
          contentHeight={contentHeightState}
          opened
          header={
            <Typography size={TypographySize.H1} as={TypographyTags.H1}>
              hi
            </Typography>
          }
          content={
            <Column
              ref={contentHeight}
              justifyContent="start"
              alignItems="start"
            >
              <Row justifyContent="start">
                <Typography size={TypographySize.H6} as={TypographyTags.H1}>
                  some
                  coadsdddnssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssstent
                </Typography>
              </Row>
              <Row justifyContent="start">
                <Typography size={TypographySize.H6} as={TypographyTags.H1}>
                  somdsfae content
                </Typography>
              </Row>
              <Row justifyContent="start">
                <Typography size={TypographySize.H6} as={TypographyTags.H1}>
                  somdsafdsfasde content
                </Typography>
              </Row>
              <Row justifyContent="start">
                <Typography size={TypographySize.H6} as={TypographyTags.H1}>
                  somedsafasdfsda content
                </Typography>
              </Row>
              <Row justifyContent="start">
                <Typography size={TypographySize.H6} as={TypographyTags.H1}>
                  somefdsafsd content
                </Typography>
              </Row>
            </Column>
          }
          onOpen={onOpen}
          onClose={onClose}
        />
      </AccordionStyle>
    </Layout>
  );
};
export default Test;
