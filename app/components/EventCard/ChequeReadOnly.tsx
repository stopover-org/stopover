import React from "react";
import styled from "styled-components";
import Layout from "./Layout";
import ChequeConnect from "./ChequeConnect";
import Text from "./Text";
import Button from "./Button";
import ReadOnly from "./ReadOnly";
import ChequeHead from "./ChequeHead";

const Wrapper = styled.div`
  padding: 6px 0px 6px 6px;
  width: 100%;
`;

const Underline = styled.div`
  border-bottom: 2px solid black;
`;

const ChequeReadOnly = () => {
  const color = "#82E297";
  return (
    <Wrapper>
      <ChequeHead color={color} />
      <ChequeConnect color={color} />
      <Layout color={color}>
        <ReadOnly
          eventOptions={[
            {
              column1: "10.08.2022",
              column2: "3:00-4:00",
            },
          ]}
        />
      </Layout>
      <ChequeConnect color={color} />
      <Layout color={color}>
        <>
          <ReadOnly
            eventOptions={[
              {
                column1: "1x лодка",
                column2: "5050$",
                builtIn: false,
              },
              {
                column1: "1x мотор",
                column2: "50$",
                builtIn: true,
              },
            ]}
          />
          <Underline />
          <ReadOnly
            eventOptions={[
              {
                column1: "Предварительная цена",
                column2: "62300 Kč",
              },
            ]}
          />
        </>
      </Layout>
      <ChequeConnect color={color} />
      <Layout color={color}>
        <Text header="Забронированно" />
      </Layout>
      <Button description="Изменить" color="#FF8A00" />
    </Wrapper>
  );
};
export default ChequeReadOnly;
