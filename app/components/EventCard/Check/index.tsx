import React from "react";
import styled from "styled-components";
import Layout from "./Layout";
import CheckConnect from "./CheckConnect";
import Text from "./Text";
import Counter from "./Counter";
import Button from "./Button";
import RadioButtonList from "./RadioButtonList";

const Wrapper = styled.div``;

const Check = () => (
  <Wrapper>
    <Layout>
      <Text header="Дата проведения" description="10.08.2022" />
    </Layout>
    <CheckConnect height={50} />
    <Layout>
      <Counter description="Экшен камера" />
    </Layout>
    <CheckConnect height={50} />
    <Layout>
      <Text header="Время проведения" />
      <RadioButtonList
        list={[
          {
            description: "1:00Pm - 2:00Pm",
          },
          {
            description: "3:00Pm - 4:00Pm",
          },
          {
            description: "5:00Pm - 6:00Pm",
          },
        ]}
      />
    </Layout>
    <CheckConnect height={50} />
    <Layout>
      <Text
        header="Место проведения"
        description="Podebradova 102/127, Ponava, Brno 612 00"
      />
    </Layout>
    <CheckConnect height={50} />
    <Layout>
      <Text header="Выбор опций" />
      <RadioButtonList
        list={[
          {
            description: "Мотоцикл",
          },
          {
            description: "Экшен камера",
            price: 151661,
            free: true,
          },
          {
            description: "собака спасака",
            price: 18511,
          },
          {
            description: "собака спасака",
            price: 18511,
          },
          {
            description: "собака спасака",
            price: 18511,
          },
          {
            description: "собака спасака",
            price: 18511,
          },
          {
            description: "собака спасака",
            price: 18511,
          },
          {
            description: "собака спасака",
            price: 18511,
          },
        ]}
      />
      <Counter description="Экшен камера" />
    </Layout>
    <CheckConnect height={50} />
    <Layout>
      <Text header="Предворительная цена " description="62300 Kč" />
    </Layout>

    <CheckConnect height={50} />
    <Button description="Забронировать" />
  </Wrapper>
);
export default Check;
