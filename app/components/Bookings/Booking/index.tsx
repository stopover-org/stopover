import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import moment from "moment";
import { graphql, useFragment } from "react-relay";
import BookingForm from "../BookingForm";
import Accordion from "../../Accordion";
import Typography from "../../Typography";
import BookingCard from "../BookingCard";
import CaretUp from "../../icons/Outline/Interface/Caret_up.svg";
import Row from "../../Row";
import { TypographySize, TypographyTags } from "../../StatesEnum";
import {
  calculateDate,
  getTime,
  isDifferentDayMonth,
} from "../../../lib/utils/dates";
import { Booking_BookingsFragment$key } from "./__generated__/Booking_BookingsFragment.graphql";

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

export const Booking = ({
  bookingReference,
}: {
  bookingReference: Booking_BookingsFragment$key;
}) => {
  const data = useFragment(
    graphql`
      fragment Booking_BookingsFragment on Booking {
        bookedFor
        id
        event {
          description
          durationTime
          images
          title
        }
      }
    `,
    bookingReference
  );
  const { bookedFor, event } = data;
  const [isOpen, setIsOpen] = useState(false);
  const startDate = moment(bookedFor);
  const endDate = calculateDate(moment(bookedFor), event.durationTime, "add");
  return (
    <>
      <BookingCard
        image={event.images[0]}
        title={event.title}
        text={event.description}
        units="1"
        time={`${getTime(moment(startDate))} ${getTime(moment(endDate))}`}
        date={
          (isDifferentDayMonth(startDate, endDate) &&
            `${startDate.format("DD.M")} ${endDate.format("DD.M")}`) || // TODO: conflic in format. neede 3.11 ive got 3 November. space is problem
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
              date={moment(bookedFor)}
              time={moment(bookedFor)}
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
