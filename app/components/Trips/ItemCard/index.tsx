import React, { useState } from "react";
import Form from "../Form";
import Accordion from "../../Accordion";
import Typography from "../../Typography";
import { TypographyTags } from "../../StatesEnum";

export const ItemCrad = () => {
  const [accordion, setAccordion] = useState(false);

  return (
    <Accordion
      height={500}
      showCollapse
      header={
        <Typography color="#FF8A00" size="22px" as={TypographyTags.LARGE}>
          Данные участников
        </Typography>
      }
      content={
        <Form
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
  );
};
export default React.memo(ItemCrad);
