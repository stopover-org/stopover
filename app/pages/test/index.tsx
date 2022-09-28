import React from "react";
import styled from "styled-components";
import moment from "moment";
import Layout from "../../components/MainPage/Layout";
import InputDate from "../../components/InputDate";
import icon from "../../components/icons/Outline/General/Calendar.svg";
import { IconPosition, InputVariants } from "../../components/StatesEnum";
import Input from "../../components/Input";

const Wrapper = styled.div``;
const Test = () => (
  <Layout>
    <Wrapper>
      <InputDate
        value={moment("09/02/2022")}
        icon={icon.src}
        iconPosition={IconPosition.RIGHT}
        hint="hi my name is"
        label="it worksfsdfa dfasdf dsaf adsf sdaf sadf sa"
        inputVariants={InputVariants.COMMON}
      />
      <Input
        icon={icon.src}
        iconPosition={IconPosition.RIGHT}
        hint="hi my name is"
        label="it worksfsdfa dfasdf dsaf adsf sdaf sadf sa"
      />
    </Wrapper>
  </Layout>
);
export default Test;
