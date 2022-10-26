import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import BookingForm from "../BookingForm";
import Accordion from "../../Accordion";
import Typography from "../../Typography";
import BookingCard from "../../BookingCard";
import CaretUp from "../../icons/Outline/Interface/Caret_up.svg";
import Row from "../../Row";
import { TypographySize, TypographyTags } from "../../StatesEnum";

const Collapse = styled(Row)`
  cursor: pointer;
`;

const Caret = styled(Image)<{ rotate: string }>`
  rotate: ${(props) => props.rotate};
  transition: rotate 0.5s ease-in-out;
`;

const AccordionPadding = styled.div`
  padding: 18px 30px;
`;

export const Booking = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BookingCard
        image="https://i.ytimg.com/vi/TG60ElhAYCk/maxresdefault.jpg"
        title="Ultramarine"
        text=" Жизнь свою отдаю Императору. Молюсь, дабы Он принял ее.Силу свою отдаю Императору. Молюсь, дабы ее не лишил меня Он. Кровь свою отдаю Императору. Молюсь, дабы утолила она жажду Его. Тело свое кладу на алтарь битвы, Молюсь, дабы Он даровал мне благородную смерть. Молю Его о защите, всё отдавая взамен."
        units="1"
        time="3:00-4:00"
      />
      <AccordionPadding>
        <Accordion
          height={500}
          showCollapse
          opened={isOpen}
          showChevron={!isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          header={
            <Typography color="#FF8A00" size="22px" as={TypographyTags.LARGE}>
              Данные участников
            </Typography>
          }
          content={
            <BookingForm
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
        />
        {isOpen && (
          <Collapse alignItems="center" onClick={() => setIsOpen(false)}>
            <Typography size={TypographySize.SMALL} as={TypographyTags.SMALL}>
              Свернуть
            </Typography>
            <Caret
              height="25px"
              width="25px"
              alt="caret"
              src={CaretUp.src}
              rotate="0deg"
            />
          </Collapse>
        )}
      </AccordionPadding>
    </>
  );
};
export default React.memo(Booking);
