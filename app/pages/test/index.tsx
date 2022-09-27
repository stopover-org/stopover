import React from "react";
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
  const onOpen = () => {};
  const onClose = () => {};

  return (
    <Layout>
      <>
        <AccordionStyle>
          <Accordion
            opened
            header={
              <Typography size={TypographySize.H1} as={TypographyTags.H1}>
                Header
              </Typography>
            }
            content={
              <Column justifyContent="start" alignItems="start">
                <Row justifyContent="start">
                  <Typography size={TypographySize.H6} as={TypographyTags.H1}>
                    some coads ddd2314n
                    ss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstent
                    coadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42134sssss4231ssssss231sdsafrebsssss14ss2314ssssweqrssssssssssssssewqrwesss2412ssssssssssss233sssssssssssssssssstentcoadsddd2314nss42
                  </Typography>
                </Row>
              </Column>
            }
            onOpen={onOpen}
            onClose={onClose}
          />
        </AccordionStyle>
        <AccordionStyle>
          <Accordion
            opened
            header={
              <Typography size={TypographySize.H1} as={TypographyTags.H1}>
                hi
              </Typography>
            }
            content={
              <Column justifyContent="start" alignItems="start">
                <Row justifyContent="start">
                  <Typography size={TypographySize.H6} as={TypographyTags.H1}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </Typography>
                </Row>
                <Row justifyContent="start">
                  <Typography size={TypographySize.H6} as={TypographyTags.H1}>
                    somdsfae content
                  </Typography>
                </Row>
              </Column>
            }
            onOpen={onOpen}
            onClose={onClose}
          />
        </AccordionStyle>
      </>
    </Layout>
  );
};
export default Test;
