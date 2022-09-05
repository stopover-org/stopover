import React from "react";
import styled from "styled-components";
import Layout from "./Layout";
import CheckConnect from "./CheckConnect";
import Text from "./Text";
import Counter from "./Counter";
import Button from "./Button";
import CheckboxList from "./CheckboxList";
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
      <>
        <Text header="Время проведения" />
        <RadioButtonList
          list={["1:00-2:00PM", "3:00-4:00PM", "5:00-6:00PM", "7:00-8:00PM"]}
        />
      </>
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
      <>
        <Text header="Выбор опций" />
        <CheckboxList
          list={[
            {
              description: "Мотоцикл",
              id: "MY_uniq_id",
            },
            {
              description: "Экшен камера",
              price: 151661,
              builtIn: true,
              id: "wtf",
            },
            {
              description: "собака спасака",
              price: 578,
              id: "good_stuff",
            },
            {
              description: "Скажи круто",
              price: 51,
              id: "yeah",
            },
            {
              description:
                "Стресс проверка как много текста он адекватно вместит или будет прям плохо",
              price: 63,
              id: "dont mind",
            },
            {
              description: "собака",
              price: 8423,
              id: "only i know about this",
            },
            {
              description:
                "а ты заметил что собака стоит дороже чем собака спасака",
              price: 6545,
              id: "wow",
            },
            {
              description: "спасака",
              price: 5498,
              id: "ji",
            },
          ]}
        />
        <Counter description="Экшен камера" />
      </>
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
// #84bdf7
