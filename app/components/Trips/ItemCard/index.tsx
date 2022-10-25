import React, { useState } from "react";
import BookingForm from "../BookingForm";
import Accordion from "../../Accordion";
import Typography from "../../Typography";
import BookingCard from "../../BookingCard";
import { TypographyTags } from "../../StatesEnum";

export const ItemCrad = () => {
  const [accordion, setAccordion] = useState(false);

  return (
    <>
      <BookingCard
        image="https://i.ytimg.com/vi/TG60ElhAYCk/maxresdefault.jpg"
        title="Ultramarine"
        text=" Жизнь свою отдаю Императору. Молюсь, дабы Он принял ее.Силу свою отдаю Императору. Молюсь, дабы ее не лишил меня Он. Кровь свою отдаю Императору. Молюсь, дабы утолила она жажду Его. Тело свое кладу на алтарь битвы, Молюсь, дабы Он даровал мне благородную смерть. Молю Его о защите, всё отдавая взамен."
        units="1"
        time="3:00-4:00"
      />
      <Accordion
        height={500}
        showCollapse
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
        opened={accordion}
        onClose={() => setAccordion(false)}
        onOpen={() => setAccordion(true)}
      />
    </>
  );
};
export default React.memo(ItemCrad);
