import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import moment from "moment";
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

type Props = {
  eventsReference: {
    bookedFor: string;
    id: string;
    event: {
      description: string;
      durationTime: string;
      images: string[];
      title: string;
    };
  };
};

export const Booking = ({ eventReference }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const deltaTime = {
    days: "0",
    hours: "0",
    minutes: "0",
  };
  const time = eventsReference.event.durationTime.split(/\s/);

  new Array(time.length).forEach((item) => {
    deltaTime.days =
      (item[item.length - 1] === "d" && item.slice(0, item.length - 1)) ||
      deltaTime.days;

    deltaTime.hours =
      (item[item.length - 1] === "h" && item.slice(0, item.length - 1)) ||
      deltaTime.hours;

    deltaTime.minutes =
      (item[item.length - 1] === "m" && item.slice(0, item.length - 1)) ||
      deltaTime.minutes;
  });
  const endDate = moment(eventsReference.bookedFor);
  const startDate = moment(eventsReference.bookedFor)
    .subtract(deltaTime.days, "d")
    .subtract(deltaTime.hours, "h")
    .subtract(deltaTime.minutes, "m");
  return (
    <>
      <BookingCard
        image={eventsReference.event.images[0]}
        title={eventsReference.event.title}
        text={eventsReference.event.description}
        units="1"
        time={`${startDate.format("hh:mm")} ${endDate.format("hh:mm")}`}
        date={
          (startDate.format("DD.M") !== endDate.format("DD.M") &&
            `${startDate.format("DD.M")} ${endDate.format("DD.M")}`) ||
          ""
        }
      />
      <AccordionPadding>
        <Accordion
          height={500}
          opened={isOpen}
          showChevron
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          header={
            <Typography color="#FF8A00" size="22px" as={TypographyTags.LARGE}>
              Данные участников
            </Typography>
          }
          content={
            <BookingForm
              date={moment(eventsReference.bookedFor)}
              time={moment(eventsReference.bookedFor)}
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
