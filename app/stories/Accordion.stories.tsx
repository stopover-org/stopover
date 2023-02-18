import React, { useState } from "react";
import styled from "styled-components";
import { ComponentStory } from "@storybook/react";
import Accordion, { AccordionProps } from "../components/Accordion";
import Column from "../components/Column";
import Row from "../components/Row";
import { TypographyTags } from "../components/StatesEnum";
import Typography from "../components/Typography";
import BookingForm from "../components/Bookings/BookingForm";

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
  title: "Components/Accordion",
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

// const Template = (args: Props) => <Accordion {...args} />;

const Template = ({
  onClose,
  onOpen,
  header,
  opened,
  content,
  ...args
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionPadding>
      <Accordion
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        opened={isOpen}
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
            allreadyInPrice={[
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
};

export const Default: ComponentStory<typeof Accordion> = Template.bind({});

Default.args = {
  opened: false,
  showChevron: false,
  showDivider: true,
  content: <Content />,
  header: <Header />,
  height: 500,
};
