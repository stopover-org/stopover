import React, { useState } from "react";
import styled from "styled-components";
import Accordion from "../components/Accordion";
import Column from "../components/Column";
import Row from "../components/Row";
import { TypographyTags } from "../components/StatesEnum";
import Typography from "../components/Typography";
import BookingForm from "../components/Bookings/BookingForm";


const Content = () => {
    return (<AccordionPadding><Typography>SOME CONTENT<br/>blablablabla<br/>blablablablablablablabla</Typography></AccordionPadding>)
};

const Header = () => {
    return (<Typography>Header H1</Typography>)
};

const AccordionPadding = styled.div`
  padding: 10px 0 0 0;
`;
const AccordionWrapper = styled.div`
    padding: 0 10px;
`;

export default {
    title: "Components/Accordion",
    component: Accordion,
    argTypes: {
        // opened: { control: "boolean"},
        // showChevron: { control: "boolean" },
        // showDivider: { control: "boolean" },
        // content: { control: "React.ReactElement" },
        // header: { control: "React.ReactElement" },
        // height: { control: "number" },
        // onOpen: { control: "boolean" },
        // onClose: { control: "boolean"}
    },
};

const Preview = () => {   
    const clickHandler =() => {}
    return (
        
            <Row>
                <Column>
                    <AccordionWrapper>
                        <Accordion 
                            opened={false}
                            showChevron={true}
                            showDivider={true}
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
                            opened={true}
                            showChevron={true}
                            showDivider={true}
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
                            opened={true}
                            //showChevron={true}
                            showDivider={true}
                            content={<Content />}
                            header={<Header />}
                            height={125}
                            onOpen={clickHandler}
                            onClose={clickHandler}
                        />
                    </AccordionWrapper>
                </Column>
            </Row>
       

    
    )
};

export const DesignPreview = Preview.bind({});
DesignPreview.parameters = {
    controls: { hideNoControlsWarning: true },
  };

  //const Template = (args: Props) => <Accordion {...args} />;


  const Template = ({onClose, onOpen, header, opened, content,...args}: Props) => {
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
                    //date={moment(bookedFor)}
                    //time={moment(bookedFor)}
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
    )
  }

  export const Default = Template.bind({});

  Default.args = {
    opened: false,
    showChevron: false,
    showDivider: true,
    content: <Content />,    
    header: <Header />,
    height: "500px",
  }

  