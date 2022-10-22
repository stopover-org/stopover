import React, { useState } from "react";
<<<<<<< HEAD
import styled from "styled-components";
import { TypographyTags } from "../../StatesEnum";
import Accardion from "../../Accordion";
import Typography from "../../Typography";
import Form from "../../Form";

const Wrapper = styled.div``;
const ItemCard = () => {
  const [click, setClick] = useState(false);
  return (
    <Wrapper>
      <Accardion
        header={
          <Typography
            color="#FF8A00"
            underline
            size="22px"
            as={TypographyTags.H3}
          >
            Данные участников
          </Typography>
        }
        content={<Form />}
        opened={click}
        onClose={() => setClick(false)}
        onOpen={() => setClick(true)}
      />
    </Wrapper>
  );
};

export default React.memo(ItemCard);
=======
import Forma from "../Forma";
import Accordion from "../../Accordion";
import Typography from "../../Typography";
import { TypographySize, TypographyTags } from "../../StatesEnum";

export const ItemCrad = () => {
  const [accordion, setAccordion] = useState(false);

  return (
    <Accordion
      height={500}
      header={
        <Typography
          color="#FF8A00"
          size={TypographySize.MEDIUM}
          as={TypographyTags.MEDIUM}
        >
          Данные участников
        </Typography>
      }
      content={
        <Forma
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
>>>>>>> forma started
