import React from "react";
import styled from "styled-components";
import Input from "../Input";

const Wrapper = styled.div``;
const SInput = styled(Input)``;
const Form = () => (
  <Wrapper>
    <SInput label="Имя" placeholder="Введите свое имя" />
  </Wrapper>
);

export default React.memo(Form);
