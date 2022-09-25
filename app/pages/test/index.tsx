import React from "react";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";
import Input from "../../components/Input";
import Typography from "../../components/Typography";
import {
  InputSizes,
  InputVariants,
  IconPosition,
} from "../../components/StatesEnum";
import MagnifineGlass from "../../components/icons/Outline/Interface/Zoom-in.svg";

const SInput = styled.div`
  width: 180px;
`;

const Test = () => (
  <Layout>
    <SInput>
      <Input
        size={InputSizes.MEDIUM}
        icon={MagnifineGlass.src}
        iconPosition={IconPosition.RIGHT}
        inputVariants={InputVariants.COMMON}
        placeholder="Placeholder"
        errorMessage={
          <Typography fontWeight="400" color="#BE0000">
            You have some error
          </Typography>
        }
        hint={
          <Typography fontWeight="400">
            this is message to you, idiot. its is big. really really big. o my
            god i does not work as intendeed
          </Typography>
        }
        label={<Typography fontWeight="400">The best input</Typography>}
      />
    </SInput>
  </Layout>
);
export default Test;
/*
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
                  coadsdddnsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssstent
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



*/
