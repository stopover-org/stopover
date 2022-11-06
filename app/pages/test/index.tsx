import React from "react";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";
import Switch from "../../components/Animated/Switch";
import CompactCardSkeleton from "../../components/EventListCard/CompactCardSkeleton";
import WideCardSkeleton from "../../components/EventListCard/WideCardSkeleton";

const Wrapper = styled.div`
  width: 200px;
`;

const Test = () => (
  <Layout>
    <Wrapper>
      <CompactCardSkeleton />
      <WideCardSkeleton />
      <Switch />
    </Wrapper>
  </Layout>
);

export default Test;
