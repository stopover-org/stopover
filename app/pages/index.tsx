import type { NextPage } from 'next';
import React from "react";
import Layout from "../components/MainPage/Layout";
import MetaBall from "../components/EventFilter/MetaBall/MetaBall";
import styled from "styled-components";

import EventsList from "../components/Events/List";

const Container = styled.div`
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  
`;


const Home: NextPage = () => {
  return (
    <Layout>
      <EventsList />
    </Layout>
  );
}

export const getServerSideProps = async () => ({ props: {} });

export default React.memo(Home);
