import React from "react";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";
import Switch from "../../components/Animated/Switch";
import CardImageLeftSkeleton from "../../components/EventListCard/CardImageLeftSkeleton";

const Wrapper = styled.div`
  width: 200px;
`;

const Test = () => (
  <Layout>
    <Wrapper>
      <CardImageLeftSkeleton />
      <Switch />
    </Wrapper>
  </Layout>
);

export default Test;
