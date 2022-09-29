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
      />
    </Wrapper>
  </Layout>
);

export default Test;