import React from "react";
import styled from "styled-components";
import Layout from "./Layout";
import CheckConnect from "./CheckConnect";
import Text from "./Text";
import Counter from "./Counter";
import Button from "./Button";

const Wrapper = styled.div`
  width: 100%;
`;

const Check = () => (
  <Wrapper>
    <Layout>
      <Text header="Дата проведения" description="10.08.2022" />
    </Layout>
    <CheckConnect height={50} width={550} />
    <Layout>
      <Counter description="Экшен камера" />
    </Layout>
    <CheckConnect height={50} width={550} />
    <Layout>
      <Text
        header="Место проведения"
        description="Podebradova 102/127, Ponava, Brno 612 00"
      />
    </Layout>
    <CheckConnect height={50} width={550} />
    <Layout>
      <Text header="Предворительная цена " description="62300 Kč" />
    </Layout>

    <CheckConnect height={50} width={550} />
    <Button description="Забронировать" />
  </Wrapper>
);
export default Check;
