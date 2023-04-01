import React from "react";
import styled from "styled-components";
import { ComponentStory } from "@storybook/react";
import Accordion, { AccordionProps } from "../../components/v1/Accordion";
import Column from "../../components/Layout/Column";
import Row from "../../components/Layout/Row";
import { TypographyTags } from "../../components/StatesEnum";
import Typography from "../../components/v1/Typography";
import BookingForm from "../../components/Bookings/BookingForm";

const AccordionPadding = styled.div`
  padding: 10px 0 0 0;
`;

const AccordionWrapper = styled.div`
  padding: 0 10px;
`;

const Content = () => (
  <AccordionPadding>
    <Typography>
      SOME CONTENT
      <br />
      blablablabla
      <br />
      blablablablablablablabla
    </Typography>
  </AccordionPadding>
);
const Header = () => <Typography>Header H1</Typography>;
export default {
  title: "Components/V1/Accordion",
  component: Accordion,
};

const Preview = () => {
  const clickHandler = () => {};
  return (
    <Row>
      <Column>
        <AccordionWrapper>
          <Accordion
            opened={false}
            showChevron
            showDivider
            content={<Content />}
            header={<Header />}
            height={125}
            onOpen={clickHandler}
            onClose={clickHandler}
          />
        </AccordionWrapper>
      </Column>

      <Column>
        <AccordionWrapper>
          <Accordion
            opened
            showChevron
            showDivider
            content={<Content />}
            header={<Header />}
            height={125}
            onOpen={clickHandler}
            onClose={clickHandler}
          />
        </AccordionWrapper>
      </Column>

      <Column>
        <AccordionWrapper>
          <Accordion
            opened
            // showChevron={true}
            showDivider
            content={<Content />}
            header={<Header />}
            height={125}
            onOpen={clickHandler}
            onClose={clickHandler}
          />
        </AccordionWrapper>
      </Column>
    </Row>
  );
};

export const DesignPreview: ComponentStory<typeof Preview> = Preview.bind({});
DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};

const Template = ({
  onClose,
  onOpen,
  header,
  opened,
  content,
  ...args
}: AccordionProps) => (
  <AccordionPadding>
    <Accordion
      onClose={onClose}
      onOpen={onOpen}
      opened={opened}
      header={
        <Typography color="#FF8A00" size="22px" as={TypographyTags.LARGE}>
          Данные участников
        </Typography>
      }
      content={
        <BookingForm
          // date={moment(bookedFor)}
          // time={moment(bookedFor)}
          additionalOptions={[
            {
              text: "большой снегоход",
              price: "600",
              currency: "$",
            },
            {
              text: "камера",
              price: "100",
              currency: "$",
            },
          ]}
          alreadyInPrice={[
            {
              text: "Куратор",
              price: "100",
              currency: "$",
            },
            {
              text: "Кураторка",
              price: "100000",
              currency: "$",
            },
          ]}
        />
      }
      {...args}
    />
  </AccordionPadding>
);

export const Default: ComponentStory<typeof Accordion> = Template.bind({});

Default.args = {
  opened: false,
  showChevron: false,
  showDivider: true,
  content: <Content />,
  header: <Header />,
  height: 500,
};
