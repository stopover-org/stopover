import React from "react";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";
import Checkbox from "../../components/Checkbox";
import Typography from "../../components/Typography";

const Wrapper = styled.div`
  border: 1px solid red;
  width: 210px;
`;

const Test = () => (
  <Layout>
    <Wrapper>
      <Checkbox type="radio">
        <Typography>
          this is label. It is better then yoursdsafsdfsadfdsaf
        </Typography>
      </Checkbox>
      <Checkbox>
        <Typography>this is label. It is better then yours</Typography>
      </Checkbox>
    </Wrapper>
  </Layout>
);

export default Test;
