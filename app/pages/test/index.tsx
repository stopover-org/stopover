import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";
import Accordion from "../../components/Accordion";
import Typography from "../../components/Typography";
import { TypographySize, TypographyTags } from "../../components/StatesEnum";
import Column from "../../components/Column";
import Row from "../../components/Row";

const AccordionStyle = styled.div`
  width: 400px;
  padding-top: 15px;
`;

const Test = () => {
  const [contentHeightState, setContentHeightState] = useState<number>();
  const onOpen = () => {};
  const onClose = () => {};
  const contentHeight = useCallback((contentHeightNode: Element) => {
    console.log(contentHeightNode?.getBoundingClientRect().height);

    setContentHeightState(contentHeightNode?.getBoundingClientRect().height);
  }, []);

  return (
    <Layout>
      <AccordionStyle>
        <Accordion
          opened
          height={contentHeightState}
          header={
            <Typography size={TypographySize.H1} as={TypographyTags.H1}>
              Header
            </Typography>
          }
          content={
            <Column
              justifyContent="start"
              alignItems="start"
              ref={contentHeight}
            >
              <Row justifyContent="start">
                <Typography size={TypographySize.H6} as={TypographyTags.H1}>
                  some coads ddd2314n ss42134sssss4231sssss2314ssssweqrssss
                  weqrssss weqrssss weqrssss weqrssss weqrssss
                  weqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd231sss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42
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
