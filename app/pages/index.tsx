import React from "react";
import styled from "styled-components";
import Layout from "../components/MainPage/Layout";
import EventsList from "../components/Events/List";

const Container = styled.div``;

function Home() {
  return (
    <Container>
      <Layout>
        <EventsList />
      </Layout>
    </Container>
  );
}

export default React.memo(Home);
