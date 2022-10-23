import React, { useState } from "react";
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
