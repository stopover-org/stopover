import React from "react";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";
import Selector from "../../components/Selector";
import Typography from "../../components/Typography";

const Wrapper = styled.div``;
const Test = () => (
  <Layout>
    <Wrapper>
      <Selector
        label="hi"
        content={<Typography>hi my name is ...</Typography>}
        items={[
          {
            value: "option 1",
            key: "dogue",
          },
          {
            value: "option 2",
            key: "catue",
          },
          {
            value: "option 3",
            key: "parrotue",
          },
          {
            value: "option 4",
            key: "humanue",
          },
        ]}
      />
    </Wrapper>
  </Layout>
);

export default Test;
